export const jitin = {
  name: 'Jitin Kumar Sengar',
  role: 'AI Engineer',
  photo: '/team/jitin.jpeg',
  bio: [
    'I build AI agents that can think, see, listen and act. I like shipping whole systems rather than single demos: the reasoning loop, the tools an agent can use, the memory it keeps, and the voice and vision it uses to deal with people.',
    'At NandiVex Technologies I bring that to client work: voice and chat assistants, retrieval over a company’s own documents, and automation that saves real hours.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/devxjitin' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devxjitin' },
    { label: 'Portfolio', href: 'https://portfolio.devxjitin.dev/' },
  ],
  stats: [
    ['17', 'open-source packages on PyPI'],
    ['3rd', 'Best Project Award, K.R. Mangalam University'],
    ['Top 5', 'Build with Bharat 2.0, NIT Delhi'],
    ['IEEE', 'conference paper'],
  ],
  skills: [
    ['Languages', ['Python', 'Kotlin', 'TypeScript', 'Java', 'C++']],
    ['AI and agents', ['LLM agents', 'Gemini Live', 'RAG', 'MCP', 'Tool calling', 'Whisper', 'Ollama', 'Human-in-the-loop']],
    ['Apps and backend', ['Jetpack Compose', 'FastAPI', 'React', 'Next.js', 'PostgreSQL', 'Qt', 'Tkinter']],
    ['Cloud and delivery', ['AWS Lambda', 'S3', 'Docker', 'Git', 'CI/CD']],
  ],
  education: [
    ['MCA, AI and ML', 'K.R. Mangalam University, Gurugram', '2025 – 2027 (pursuing)'],
    ['BCA', 'GLA University, Mathura', '2021 – 2024'],
  ],
};

export const ultron = {
  name: 'ULTRON',
  tag: 'Android voice and chat AI assistant',
  summary:
    'A native Android assistant you can talk to or type to. Voice runs in real time over Gemini Live, chat streams answers with image, video, PDF and DOCX attachments, and both share the same memory and personalisation.',
  points: [
    'Real-time voice mode with Gemini Live, plus a streaming chat mode.',
    'Tools through MCP connectors on AWS Lambda: Google Workspace, YouTube search and app updates, so connectors change without a new app release.',
    'Remembers facts about you and answers from your own documents using BM25 plus embedding search, stored on the device.',
    'Over-the-air updates with a checksum, so a new build installs in seconds.',
    'Personalisation for tone, warmth and emoji, a file library, chat search and storage cleanup.',
  ],
  stack: ['Kotlin', 'Jetpack Compose', 'Gemini Live', 'MCP', 'RAG', 'ObjectBox', 'AWS Lambda'],
  facts: [['Android 8+', 'Platform'], ['Voice + chat', 'Input'], ['Gemini + MCP', 'Engine']],
  shots: [
    ['/products/ultron-home.png', 'ULTRON home screen'],
    ['/products/ultron-voice.png', 'ULTRON live voice mode'],
    ['/products/ultron-chat.png', 'ULTRON chat with a streamed answer'],
    ['/products/ultron-personalization.png', 'ULTRON personalisation settings'],
  ],
  siteUrl: 'https://ultron.devxjitin.dev',
};

export const otherProjects = [
  {
    name: 'Autourgos',
    tag: 'Open-source agent framework',
    text: 'A small, readable Python framework for LLM agents. It works with any OpenAI-compatible model, has 11 lifecycle hooks, parallel tool calling, and pause and resume of runs.',
    stack: ['Python', 'Agents', 'Async', 'PyPI'],
    links: [
      { label: 'Source', href: 'https://github.com/devxjitin/autourgos-agent' },
      { label: 'PyPI', href: 'https://pypi.org/project/autourgos-agent/' },
    ],
  },
  {
    name: 'CampusGrade',
    tag: 'Assignment and grading platform',
    text: 'Collects GitHub-based assignments, flags copied code across a batch and grades against rubrics with AI, without sending student identities to the model.',
    stack: ['FastAPI', 'PostgreSQL', 'Next.js', 'Docker'],
    links: [{ label: 'Source', href: 'https://github.com/devxjitin/CampusGrade' }],
  },
  {
    name: 'Drishti',
    tag: 'Voice assistant kiosk',
    text: 'A reception-desk kiosk with a voice interface that answers from an organisation’s own documents instead of guessing.',
    stack: ['Kotlin', 'Jetpack Compose', 'Gemini', 'RAG'],
    links: [],
  },
];
