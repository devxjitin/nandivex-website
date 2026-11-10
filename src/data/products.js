/* Software we sell on subscription. Add another object to this array and it appears on /products. */
export const products = [
  {
    slug: 'ultron',
    name: 'ULTRON',
    tag: 'A voice assistant that works your phone for you.',
    summary:
      'Talk to your Android phone in 13 languages. ULTRON answers by voice, even with the screen off, and uses 80+ phone and cloud tools to finish the task: alarms, apps, documents, YouTube, Google Workspace and more.',
    url: 'https://ultron.devxjitin.dev',
    platform: 'Android 8+',
    features: [
      'Live voice you can interrupt, with the screen off too',
      'Phone control: flashlight, alarms, opening apps',
      'Accessibility-based control of other apps, once you allow it',
      '19 connectors and 80+ tools',
      'Memory of up to 150 notes and searchable chat history',
      'Searchable document knowledge base stored on the phone',
      'Skills written in Markdown, and four personalities',
      'YouTube downloads saved to your phone',
    ],
    shots: [
      ['/products/ultron-home.png', 'ULTRON home screen'],
      ['/products/ultron-voice.png', 'ULTRON live voice mode'],
      ['/products/ultron-connectors.png', 'ULTRON connectors'],
      ['/products/ultron-settings.png', 'ULTRON settings'],
    ],
    plans: [
      { name: 'Spark', length: '7 days', price: 199, was: 299, perDay: 28, off: 33 },
      { name: 'Surge', length: '1 month', price: 699, was: 999, perDay: 23, off: 30 },
      { name: 'Apex', length: '3 months', price: 1499, was: 2199, perDay: 17, off: 32, best: true },
    ],
    notes: [
      'Every plan includes everything above. Plans differ only in length.',
      'The key starts counting from the day you first activate it.',
      'Each key works on one phone at a time. No automatic renewal.',
      'ULTRON uses your own Gemini API key, so Google sets its limits and any charges.',
    ],
  },
];
