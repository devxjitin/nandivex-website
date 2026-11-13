# Plan: adding the Decisions API to ULTRON

Based on how the website describes ULTRON (Kotlin, Gemini Live, MCP tools, accessibility control, ObjectBox, AWS Lambda). ULTRON's app code is not in this repo, so file names and how tools reach Gemini are unverified. Phase 0 settles that before any build work starts.

Reference: https://aistudio.google.com/docs/decisions-api

## What the Decisions API does

It does not write text. You send one input (text, image, audio, PDF or video) plus up to 1,000 questions. It returns a probability and a confidence score for each. Question types:

- **Yes/no** (`noul`): chance the answer is yes.
- **Choice:** picks one option from a fixed list.
- **Score:** rates the input against a scale you define.

All questions run in one pass, so adding more barely slows it down. Only input tokens are billed; output is always 0.

Facts to design around:

- Endpoint: `POST https://generativelanguage.googleapis.com/v1beta/decisions`, model `gemini-decision-1`.
- SDKs exist for Python and JavaScript only. There is no Kotlin SDK, so use REST from Android or go through AWS Lambda.
- It is v1beta. No context caching and no Batch API.
- Limits: 1–1,000 questions per request, 262,144-token context, 2–255 options per choice or score question, question keys `[A-Za-z0-9_-]+` up to 64 characters.
- ULTRON uses the user's own Gemini key, so these calls count toward their limits and bill.

---

## Phase 0: Groundwork (2–3 days)

**Goal:** confirm the API works for ULTRON before building on it.

1. **Test the API by hand** with a test key. Record:
   - latency from an Indian network, for text and for a screenshot;
   - the token count for one screenshot at low resolution;
   - free-tier rate limits, since users bring their own keys.
2. **Find out how tools reach Gemini Live.** In the Live API the tool list is normally fixed when the session starts. If that is how ULTRON works, choosing tools per request needs a different design (see Phase 2).
3. **Build a test set** of about 200 real examples with the right answer marked:
   - spoken requests with the correct connector;
   - risky and safe accessibility actions;
   - screenshots after an action, marked success or failure;
   - pairs of memory notes, marked duplicate or not.

   Phases 2–6 use this set to set and check confidence thresholds.

**Done when:** we have latency and token numbers, we know which tool design applies, and the test set is ready.

---

## Phase 1: Shared base (3–4 days)

New package `decisions/`:

| Piece | What it does |
|---|---|
| `DecisionsClient` | REST calls using OkHttp or Ktor with kotlinx.serialization. The key comes from where ULTRON already stores the user's key. |
| `Models` | Question types (`Noul`, `Choice`, `Score`) and the matching answer types. |
| `QuestionBuilder` | A small Kotlin DSL that checks the limits up front. |
| `DecisionPolicy` | Confidence thresholds per feature, set from remote config or settings so they can change without a release. |
| `Fallback` | A time limit per call (for example 700 ms for routing, 1.5 s for checks), plus handling for timeouts, 429s and 5xx errors. |
| Cache | In-memory store of recent answers keyed by input, so the same question is not paid for twice in a session. |
| Feature flags | An on/off switch per feature, plus one switch that turns them all off. |
| Local log | Question, answer, confidence, delay and outcome, so thresholds can be tuned later. |

**Rule:** every feature must work exactly as it does today if a Decisions call fails.

**Done when:** the client passes unit tests against mocked responses and real calls against a test key.

---

## Phase 2: Choosing which tools to send (1 week, biggest payoff)

**Steps**

1. Sort the 80+ tools into groups by connector (19 connectors, plus "core" and "just talking").
2. For each request, use the text of what the user said as the input. Ask one yes/no question per connector ("does this need X?") and one choice question for the main connector.
3. Send:
   - the main connector;
   - any connector the model rates above 0.5;
   - the core tools, always.

   If confidence is below the threshold, send everything, which is today's behaviour.

**How to apply it, depending on Phase 0**

- **If tools can change per request** (a text path, or a fresh session per turn): pass only the selected tools.
- **If Live tools are fixed at session start:** give Live a few dispatcher tools, one per connector group. When Live calls one, ULTRON uses the Decisions result to pick the actual tool, or runs a quick text-model call with only that group's tools. Or start with the text and background paths only.

**Done when:**

- the right connector is in the sent set at least 97% of the time on the test set;
- prompt tokens drop noticeably;
- voice does not get slower.

---

## Phase 3: Safety check before accessibility actions (1 week)

**Where it hooks in:** the accessibility code that carries out an action, just before a click or typed text on another app.

**Input:** JSON describing the step (app name, visible text on the button or field, planned action, what the user asked for), plus a small screenshot if available.

**Questions:**

- `is_irreversible`
- `sends_to_other_person`
- `involves_money`
- `deletes_data`
- `matches_user_request`

**What to do with the answers**

| Situation | Action |
|---|---|
| Any risk question above 0.4 and the user has not confirmed yet | Ask the user by voice to confirm |
| `matches_user_request` below 0.5 | Stop and tell the user |
| Decisions call fails | Ask to confirm; when in doubt, ask (fail closed) |

**Fixed rules on top of the model**

- Banking, payment and UPI apps always need confirmation.
- Never send a screenshot while a password field is focused.

**Done when:** no risky action in the test set gets through without confirmation, and fewer than 10% of safe actions ask for it.

---

## Phase 4: Checking the screen after each step (1 week)

1. After each accessibility step, capture the screen:
   - `AccessibilityService.takeScreenshot` on Android 11 and later;
   - on Android 8–10, the accessibility node tree as JSON.
2. **Questions:**
   - `step_succeeded` (yes/no)
   - `blocker` (choice: none, permission, login, error, ad, update prompt)
   - `next` (choice: continue, retry, ask the user, stop)
3. Retry at most twice, then say plainly what went wrong.
4. Use the API's `resolution` setting on images to keep the token cost low.

**Done when:** multi-step tasks finish more often on the test phones, and stuck tasks end within 3 tries.

---

## Phase 5: Keeping memory clean (3–4 days)

Runs in the background through WorkManager, so it never slows down voice.

1. **For each new note:**
   - `worth_saving` (yes/no)
   - `importance` (scored 1–5)
   - `category` (choice)
2. **Check it against stored notes in one call:** a `dup_N` and a `contradicts_N` question per stored note, with that note's text in the instructions. Up to 300 questions for 150 notes.
3. **Act on the result:**
   - duplicate: merge the two notes;
   - contradiction: replace the old note and log the change;
   - memory full: drop the least important note first.

**Done when:** no duplicate notes appear on the test set, and memory stops filling up with low-value notes.

---

## Phase 6: Ranking document search results (3–4 days)

1. Take the top 20 chunks from the ObjectBox search.
2. Use the user's question as the input. Add one score question per chunk (0–3: not relevant to directly answers), with the chunk text in the instructions.
3. Pass the top 3–4 chunks that score at least 2.
4. If nothing scores 2 or more, ULTRON says it did not find the answer instead of guessing.

**Done when:** answers on the document part of the test set get better.

---

## Phase 7: Smaller additions (2–3 days)

- **Skill selection:** a choice question picks which Markdown skill to use.
- **Document tagging:** when a document is added, a choice question sets its type and a yes/no question flags sensitive content.

---

## Work that applies to every phase

- **Latency:** start the routing call while the Live turn is starting, not after it. The safety and screen checks may wait briefly.
- **Cost:** only input tokens are billed, but screenshots use the most. Downscale them, and add a "lite mode" setting that skips screen checks.
- **Privacy:** add a settings toggle and a note in onboarding and the privacy policy that screenshots go to Google. Hide password fields and OTP screens.
- **Settings screen:** an on/off switch per feature, plus a "use Decisions API" master switch.
- **Testing:**
  - unit tests on parsing and on what happens with each kind of answer;
  - the test set rerun on every build that changes thresholds;
  - real-phone testing (Android 8, 11 and 14) before each release.
- **Rollout:** phase by phase behind flags. Start with beta users, check the local logs, adjust thresholds, then turn it on for everyone.
- **Website (this repo):** once features ship, update the feature list in `src/data/products.js` (for example "asks before risky actions" and "checks its own work").

---

## Risks

| Risk | How to handle it |
|---|---|
| The beta API changes or is retired | Keep all calls inside `DecisionsClient`, keep the off switch and the fallbacks |
| Free-tier rate limits on users' keys | Cache answers, skip optional checks after a 429 |
| Live tools are fixed at session start | Use the dispatcher-tool design from Phase 2 |
| Users do not like screenshots leaving the phone | Feature is optional, the node tree works instead, passwords and OTPs are hidden |

**Rough total:** 5–6 weeks for one developer. Doing Phases 1–3 first (about 2.5 weeks) delivers most of the benefit.
