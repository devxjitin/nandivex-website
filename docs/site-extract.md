# NANDIVEX (nandivex.in) — Extracted Site Reference

Source: https://nandivex.in/ — React + Vite SPA (React Router, Framer Motion, Tailwind, lucide icons, react-helmet-async). Raw bundles are in `extracted/`. Full string dump: `content-strings.txt`.

## Brand
- Tagline: "Build • Scale • Secure" / "Web Services • IT Infrastructure • Cybersecurity"
- Colors: bg `#020B1C`, deep navy `#0A2548`, royal `#005FCC`, electric `#008CFF`, cyan `#18B7FF`, text slate-100
- Fonts: Inter (body), Manrope (headings), Space Grotesk (accents)
- Logo: `extracted/logo.png` (shield), favicon `extracted/favicon.png`
- Contact: contact@nandivex.com, +91 98765 43210 (placeholder-looking), "Technology Solutions Center, India"
- Social: github.com, linkedin.com (generic, not real profile links)
- Note: robots.txt points to nandivex.com sitemap (domain mismatch)

## Routes
/, /about, /services, /services/:slug, /industries, /projects, /project/:slug, /blog, /blog/:slug, /careers, /contact, /privacy-policy, /terms-and-conditions, /404

## Home sections
1. Hero: "Technology Built for Modern Business." + badges (Enterprise SLA Guarantees, OWASP-Compliant Development, Infrastructure Reliability), live-status cards (Healthy 4ms / 100% Online 8ms), "DEFENSIVE POSTURE: ACTIVE — OWASP ASVS • ZERO-TRUST"
2. About teaser: "Technology That Moves Your…" → Learn More
3. Three pillars: Build future-ready digital products / Build reliable infrastructure designed for growth / Protect systems, applications and business data
4. Services overview → "View All 9 Service Specializations"
5. Cybersecurity practice spotlight (VAPT, OWASP, Network hardening, BOLA audits, Continuous monitoring) → Request Security Assessment
6. Infrastructure spotlight (AWS, 24/7 server admin, Linux hardening, VPC, DB clustering) → Explore Infrastructure Services
7. 6-stage process: Discovery → Architecture → UI/UX Design → Development → Testing/QA → Deploy & Monitor
8. Why choose us: Security-first, Scalable, Modern tech, Transparent communication, Performance, Reliability/SLA
9. Industries preview, Projects preview, Tech stack, Final CTA "Let's build a secure, scalable solution together."

## Services (9)
1. Web Development — corporate sites, web apps/dashboards, SaaS, e-commerce, API integration, <1.2s loads
2. Custom Software Development — enterprise software, ERP/CRM, workflow automation, microservices, RBAC
3. Mobile App Development — Android (Kotlin), iOS (Swift), React Native/Flutter, PWA, offline-first
4. Cloud Services & Migration — AWS/hybrid, serverless, Terraform, 99.99% availability, zero-downtime migration
5. IT Infrastructure Management — Linux/Windows servers, networks/VPN, DB HA, backup & DR, <15 min incident SLA
6. Cybersecurity — VAPT, OWASP Top 10, API security, network pentest, cloud security assessment, CVSS reports
7. Network Security & Architecture — NGFW, IDS/IPS, VPN, VLANs, ZTNA, DDoS mitigation
8. Security & Compliance Audits — code review, IAM audits, DB encryption, governance, vendor risk
9. DevOps & CI/CD — pipelines, Docker, Terraform/Ansible, zero-downtime deploys, log aggregation, rollbacks
Each service page: hero, capabilities, deliverables, process steps, technologies, CTA.

## Industries (11)
FinTech/Banking/NBFC · Healthcare & Life Sciences · Logistics & Fleet · E-Commerce & Retail · Hospitality & Travel · Legal & Professional · Education/EdTech · Real Estate · High-Growth Startups · Enterprise/Governance. Each: challenges + tailored solutions.

## Projects / case studies (7)
Loan Management Platform (5 days → 45 min) · Transport Management System (18% fewer empty miles, 40k consignments/mo) · Legal Services Portal (zero-knowledge encryption) · Hotel Management Platform (+34% direct bookings, 12 properties) · Enterprise ERP (close 14 → 2 days, -92% stock discrepancy) · Cloud Infrastructure Modernization (99.99%, -32% cost) · Defensive VAPT Security Overhaul (4 high-severity fixed).
Structure: client problem → solution → features → architecture → results.

## Blog (4)
- Architecting High-Availability Cloud Infrastructure
- Building Performant React Applications
- Defending Against OWASP Top 10 in 2026
- Linux Server Hardening Checklist
- Practical CI/CD DevOps Playbook

## Careers
Values: quality, security-first, autonomy, continuous learning. Perks: competitive pay, certification sponsorship, modern stack, hybrid, health coverage. Hiring steps: resume review → conversation → practical challenge → leadership chat → offer.
Roles: React.js Frontend Engineer, Full Stack Developer, Backend (Node) Engineer, DevOps & Infrastructure Engineer, Cybersecurity Analyst / VAPT Engineer.

## About
Mission: help businesses leverage secure, scalable, innovative tech. Vision: trusted partner for next-gen digital products. Values + pillars (Web, Infra, Security), engineering approach (React, Node, Docker CI/CD; OWASP ASVS, hardened Linux, 24/7 telemetry).

## Tech stack shown
React, JS, HTML/CSS, Tailwind, Framer Motion, Vite · Node, Express, REST, WebSockets · PostgreSQL, MySQL, MongoDB, Redis · Linux, AWS, Docker, Nginx, Cloudflare, Git · TLS, JWT/OAuth, RBAC, OWASP, IAM, VPN · Terraform, CI/CD, Prometheus/Grafana

## Redesign observations
- Dark navy/cyan "generic tech" look; heavy glow/gradients; very text-dense, many repeated sections
- No real contact details, social links, client logos, testimonials or team — trust gaps
- Contact phone is a placeholder; sitemap domain mismatch (nandivex.com vs .in)
- 9 services overlap (Cyber/Network/Audit; Cloud/Infra/DevOps) — can consolidate into 4–5
- Client-rendered SPA: weak SEO without prerender/SSR
