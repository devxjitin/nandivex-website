/* Work shown on /work: only projects delivered to a client company.
   Personal and open-source projects live on each team member's profile (data/team.js).
   type: 'client'
   services: slugs from services.json. */
export const work = [
  {
    slug: 'nira',
    type: 'client',
    featured: true,
    client: 'Nirman Labs',
    clientLogo: '/clients/nirman-labs.webp',
    clientUrl: 'https://nirmanlabs.com',
    title: 'Nira, a voice assistant for Nirman Labs',
    tag: 'Client work · Education',
    summary: 'We built and shipped Nira, an Android voice assistant that talks with people in real time and answers only from Nirman Labs’ own documents.',
    challenge: 'Nirman Labs teaches robotics and coding to students from Class 3 to 12 across many schools. They wanted an assistant people can simply talk to that answers from their own material, instead of guessing like a general chatbot.',
    built: [
      'Real-time spoken conversation with Gemini Live that can be interrupted',
      'Document upload (PDF, DOCX, TXT, Markdown), with answers drawn only from those files',
      'Semantic search over the documents, with text and vectors stored on the phone',
      'A picture library: ask for an image and Nira shows it on screen',
      'Signed Android builds with in-app updates and per-phone activation codes',
      'Branded for Nirman Labs, and built so another client can be branded quickly',
    ],
    outcome: [
      'Nira shipped to Nirman Labs as signed Android builds, with three releases so far (v1.0.0 to v1.0.3)',
      'Updates reach phones automatically, with no store listing needed',
      'One team handled design, build and release',
    ],
    stack: ['Gemini Live', 'RAG', 'Kotlin', 'Jetpack Compose', 'ObjectBox', 'AWS', 'GitHub Actions'],
    services: ['ai-agents', 'android-apps'],
    links: [{ label: 'Nirman Labs', href: 'https://nirmanlabs.com' }],
    images: [
      ['/work/nira-home.webp', 'Nira home screen: "What can I do for you today?" with a mic button'],
      ['/work/nira-menu.webp', 'Nira menu with Home, Knowledge, Settings, Update and About'],
      ['/work/nira-settings.webp', 'Nira settings: Gemini key, voice, language and microphone sensitivity'],
      ['/work/nira-about.webp', 'Nira About screen: what it does and how your data is handled'],
      ['/work/nira-updates.webp', 'Nira Update screen with version history and a check for updates button'],
    ],
  },
];

export const workBySlug = (slug) => work.find((w) => w.slug === slug);
