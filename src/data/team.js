export const jitin = {
  slug: 'jitin-kumar-sengar',
  name: 'Jitin Kumar Sengar',
  role: 'AI Engineer',
  short: 'Builds AI agents that think, see, listen and act, and ships them end to end.',
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
  tag: 'A voice assistant that works your phone for you',
  summary:
    'A native Android assistant you talk to in 13 languages. Voice runs in real time over Gemini Live and can be interrupted, even with the screen off. It uses 80+ phone and cloud tools to finish the task. Sold on subscription.',
  points: [
    'Real-time voice with Gemini Live in 13 languages, interruptible, working with the screen off.',
    'Tools through MCP connectors on AWS Lambda: Google Workspace, YouTube search and app updates, so connectors change without a new app release.',
    'Remembers up to 150 notes about you and answers from your own documents with BM25 plus embedding search, stored on the device.',
    'Over-the-air updates with a checksum, so a new build installs in seconds.',
    'Skills written in Markdown, four personalities, a usage view and storage cleanup, plus phone control through accessibility once you allow it.',
  ],
  stack: ['Kotlin', 'Jetpack Compose', 'Gemini Live', 'MCP', 'RAG', 'ObjectBox', 'AWS Lambda'],
  facts: [['Android 8+', 'Platform'], ['Voice', 'Input'], ['Gemini + MCP', 'Engine']],
  shots: [
    ['/products/ultron-home.webp', 'ULTRON home screen'],
    ['/products/ultron-voice.webp', 'ULTRON live voice mode'],
    ['/products/ultron-skills.webp', 'ULTRON skills screen'],
    ['/products/ultron-connectors.webp', 'ULTRON connectors'],
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
];

/* Other work shown on a member's own page. */
jitin.projects = otherProjects;

export const sonia = {
  slug: 'sonia',
  name: 'Sonia Dahiya',
  role: 'Designer and Junior AI Developer',
  photo: '/team/sonia.jpeg',
  short: 'Designs our logos, brand and product visuals, and builds AI features as a junior developer. Co-builder of ULTRON.',
  bio: [
    'I design the look of what we build: logos, brand and product visuals, so that the work is clear and recognisable at a glance. I also work as a junior AI developer, building small AI projects in Python.',
    'On ULTRON I work alongside Jitin as co-builder. I help shape how it looks and behaves, and I test every release on a real phone before it ships.',
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soniadahiya' },
    { label: 'GitHub', href: 'https://github.com/dahiyasonia' },
  ],
  stats: [
    ['3rd', 'INTELLITHON’26, K.R. Mangalam University (team lead, VoxAssist)'],
    ['3rd', 'Best Project Award, K.R. Mangalam University (Vox Agent)'],
    ['IEEE', 'conference paper'],
  ],
  skills: [
    ['Design', ['Logo design', 'Brand identity', 'UI design', 'Visual design']],
    ['Product', ['Product strategy', 'Content direction', 'Documentation', 'Release testing']],
    ['AI development', ['Python', 'Jupyter', 'Translation and text-to-speech', 'Health data analysis']],
  ],
  projects: [
    {
      name: 'ULTRON',
      tag: 'Co-builder',
      text: 'An Android voice assistant that works your phone for you. Sonia works with Jitin on how ULTRON looks and behaves, and tests every release on a real phone before it ships.',
      stack: ['Android', 'Voice AI', 'UI design', 'Release testing'],
      links: [{ label: 'Website', href: 'https://ultron.devxjitin.dev' }],
    },
    {
      name: 'Multi-Language Translator',
      tag: 'Language AI',
      text: 'Translates Hindi and English text into multiple languages and generates voice for the translated text.',
      stack: ['Python', 'Translation', 'Text-to-speech'],
      links: [{ label: 'Source', href: 'https://github.com/dahiyasonia/Multi-Language-Translator' }],
    },
    {
      name: 'Health Analyser',
      tag: 'Health data',
      text: 'Takes a person’s health reports and returns a plain-language health description along with a diet plan.',
      stack: ['Python', 'Jupyter'],
      links: [{ label: 'Source', href: 'https://github.com/dahiyasonia/Health_Analyser' }],
    },
  ],
};

/* Everyone on the Team page. To add a member, define an object like `jitin` (slug, name, role, photo, short, bio, links;
   stats, skills, projects and education are optional) and add it here. */
export const team = [jitin, sonia];
