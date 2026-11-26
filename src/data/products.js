/* Every product has its own section on /products, in this order. Add another object and it appears there. */
export const products = [
  {
    slug: 'parakh',
    name: 'Parakh',
    tag: 'Run proctored online exams and issue verifiable certificates.',
    summary:
      'Parakh lets trainers and institutes run exams online. Plan the paper, add questions, publish with a code, and the exam grades itself. Students join with just an email, and every certificate carries a serial number and a QR code anyone can verify.',
    url: 'https://parakh.nandivex.com',
    platform: 'Web',
    features: [
      'Paper plan: question types, counts and marks kept in step',
      'Add questions by hand, paste them, or build the paper with an AI prompt',
      'Full-screen proctoring with tab-switch strikes you set',
      'Choice answers graded instantly; written answers marked by the trainer',
      'Certificates with a serial number and QR code, checkable online',
      'Pay per exam, no subscription. Trainers earn a share of student fees',
    ],
    notes: ['Live now. Prices are shown on the Parakh website.'],
  },
  {
    slug: 'friday',
    name: 'Friday',
    tag: 'A focused assistant for a fixed set of tasks.',
    summary:
      'Friday handles a predefined list of tasks, and for each one it follows a better, purpose-built way of doing it. It can also control your phone with short, one-time commands like scroll, tap here or go back. The only thing it cannot do is long-running tasks, such as sending a message on WhatsApp.',
    platform: 'Coming soon',
    features: [
      'Predefined tasks only, each with a tuned method',
      'Phone control with short one-time commands: scroll, tap here, go back',
      'No long-running tasks like messaging on WhatsApp',
    ],
    notes: ['Not launched yet.'],
  },
  {
    slug: 'ultron',
    name: 'ULTRON (Experimental)',
    tag: 'A voice assistant that works your phone for you.',
    summary:
      'Talk to your Android phone in 13 languages. ULTRON answers by voice, even with the screen off, and uses 80+ phone and cloud tools to finish the task: alarms, apps, documents, YouTube, Google Workspace and more.',
    url: 'https://ultron.devxjitin.dev',
    platform: 'Android 8+',
    builtBy: ['jitin-kumar-sengar', 'sonia'],
    features: [
      'Live voice you can interrupt, with the screen off too',
      'Phone control: flashlight, alarms, opening apps',
      'Accessibility-based control of other apps, once you allow it',
      '19 connectors and 80+ tools',
      'Memory of up to 150 notes about you',
      'Searchable document knowledge base stored on the phone',
      'Skills written in Markdown, and four personalities',
      'YouTube downloads saved to your phone',
    ],
    shots: [
      ['/products/ultron-home.webp', 'ULTRON home screen'],
      ['/products/ultron-voice.webp', 'ULTRON live voice mode'],
      ['/products/ultron-connectors.webp', 'ULTRON connectors'],
      ['/products/ultron-skills.webp', 'ULTRON skills screen'],
    ],
    notes: [
      'ULTRON is experimental and not yet stable. It is not on sale.',
      'ULTRON uses your own Gemini API key, so Google sets its limits and any charges.',
    ],
  },
  {
    slug: 'nandi',
    name: 'Nandi',
    tag: 'An on-device RAG assistant that costs very little.',
    summary:
      'Upload as many documents as you like, with no limit, and Nandi answers only from what you gave it. It runs on your device and is priced to be very cheap.',
    platform: 'Coming soon',
    features: [
      'Unlimited document uploads',
      'Answers based on your documents',
      'Runs on the device, very low cost',
    ],
    notes: ['Not launched yet.'],
  },
];
