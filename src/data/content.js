// ============================================================
//  CONTENT  —  single source of truth for the whole portfolio
//  Data sourced from Kironraj Odatt Peringode's résumé (NZ) + kironraj.com
// ============================================================

export const profile = {
  name: 'Kiron Raj',
  fullName: 'Kironraj Odatt Peringode',
  handle: 'kironraj',
  initials: 'KR',
  role: 'Cyber Security · Full Stack · Network Engineering',
  headline:
    "Master's Student in Cyber Security with experience as a Full Stack and Network Engineer",
  tagline:
    'Dedicated IT professional and master’s student in Cyber Security — bringing Linux server hardening, firewalls and performance tuning into the protection of digital infrastructures.',
  location: 'Upper Hutt, Wellington, New Zealand',
  email: 'contact@kironraj.com',
  phone: '+64 22 131 9495',
  nationality: 'India',
  resume: 'https://kironraj.com/resume.pdf',
  avatar: 'https://github.com/KIRONRAJ.png',
  available: 'Open to opportunities',
}

export const about = {
  paragraphs: [
    'I’m a dedicated IT professional and master’s student in Cyber Security at Whitecliffe College, Wellington — with a robust background in server management and web development.',
    'Across prior roles as a Software and NOC Engineer I built proven expertise in Linux server hardening, firewalls and performance tuning. Now I’m leveraging a strong foundation in Python-Django and network configuration to transition into advanced cybersecurity — committed to adaptability and continuous learning in the protection of digital infrastructures.',
  ],
  stats: [
    { value: '8+', label: 'Years across IT, networks & dev' },
    { value: '11', label: 'Professional certifications' },
    { value: '4', label: 'Industry roles held' },
    { value: '∞', label: 'Curiosity for security' },
  ],
}

export const socials = [
  { label: 'GitHub', short: 'GH', url: 'https://github.com/KIRONRAJ', handle: '@KIRONRAJ' },
  { label: 'LinkedIn', short: 'IN', url: 'https://linkedin.com/in/kironrajop', handle: 'in/kironrajop' },
  { label: 'Website', short: 'WWW', url: 'https://www.kironraj.com', handle: 'kironraj.com' },
  { label: 'Email', short: 'MAIL', url: 'mailto:contact@kironraj.com', handle: 'contact@kironraj.com' },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
]

export const education = [
  {
    degree: "Master's in Information Technology (Major in Cyber Security)",
    school: 'Whitecliffe College, Wellington, New Zealand',
    note: 'Advanced cybersecurity methodologies & information assurance.',
    period: '2025 — Present',
    current: true,
  },
  {
    degree: 'Google UX Design Professional Certificate',
    school: 'Coursera — Google',
    period: '2023 — 2024',
  },
  {
    degree: 'Web Development, Full Stack',
    school: 'Mashupstack, Thiruvananthapuram',
    period: '2021 — 2022',
  },
  {
    degree: 'Routing and Switching, CCNA',
    school: 'Vidya Engineering College, Thrissur',
    period: '2017 — 2018',
  },
  {
    degree: 'B.Tech in Electronics & Communication',
    school: 'Jyothi Engineering College, Thrissur',
    period: '2013 — 2017',
  },
]

export const skills = [
  {
    group: 'Development',
    items: ['HTML/CSS', 'JavaScript', 'jQuery', 'Python–Django', 'React', 'AJAX', 'JSON', 'LAMP Stack'],
  },
  {
    group: 'Infrastructure & Security',
    items: ['Linux (RHCSA)', 'AWS', 'Docker', 'Cisco', 'Juniper', 'Firewalls & VPNs', 'Server Hardening', 'cPanel/WHM'],
  },
  {
    group: 'UI/UX & Design',
    items: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Responsive Design', 'Adobe XD'],
  },
]

export const certifications = [
  { name: 'Red Hat Certified System Administrator (RHCSA)', issuer: 'Red Hat', year: '2018' },
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Udemy / AWS', year: '2020' },
  { name: 'cPanel Professional Certification (CPP)', issuer: 'cPanel', year: '2021' },
  { name: 'cPanel & WHM System Administrator I (CWSA-1)', issuer: 'cPanel', year: '2021' },
  { name: 'cPanel & WHM Sales Professional (CPSP)', issuer: 'cPanel', year: '2021' },
  { name: 'cPanel & WHM Administrator Certification (CWA)', issuer: 'cPanel', year: '2021' },
  { name: 'LiteSpeed Certification', issuer: 'cPanel', year: '2021' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2022' },
  { name: 'Foundations of User Experience (UX) Design', issuer: 'Google', year: '2023' },
  { name: 'High-Fidelity Designs and Prototypes in Figma', issuer: 'Google', year: '2023' },
  { name: 'Build Dynamic User Interfaces (UI) for Websites', issuer: 'Google', year: '2024' },
]

export const experience = [
  {
    role: 'Production Labourer',
    org: 'Tuatara Brewery',
    place: 'Brewtown, Upper Hutt, NZ',
    period: '2026.02 — 2026.03',
    points: [
      'Packaging & quality control — packed and sealed bottles and cans to protect product freshness in transit.',
      'Checked each batch for labelling accuracy and correct fill levels, catching errors before the line shipped.',
      'Organised finished stock so the shipping team could locate orders quickly.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    org: 'Self-employed',
    place: 'Thrissur, India',
    period: '2021.07 — 2025.06',
    points: [
      'Built websites with HTML, CSS, JavaScript, jQuery, AJAX and JSON.',
      'Converted client mockups into usable, responsive web presences.',
      'Ran debugging tools to eliminate flaws and glitches before publishing.',
      'Engaged clients to scope requirements and produce actionable development plans.',
      'Applied emerging technologies to keep sites current and maintainable.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Poornam Infovision Pvt Ltd',
    place: 'Kochi, Kerala',
    period: '2021.04 — 2021.07',
    points: [
      'Provided technical support for Linux & Windows servers and web hosting.',
      'Server security, hardening and performance tuning via control panels.',
      'Set up and administered VPS and dedicated servers; performed manual migrations.',
      'Partnered with dev & QA teams to build robust, scalable solutions.',
      'Integrated third-party tools and suggested fixes to cut lag and boost speed.',
    ],
  },
  {
    role: 'L2 NOC Engineer',
    org: 'Keralavision Broadband Pvt Ltd',
    place: 'Thrissur, Kerala',
    period: '2017.11 — 2019.06',
    points: [
      'Back-end support for network configuration and troubleshooting at a major Kerala ISP.',
      'Coordinated support, provisioning and sales teams to meet or beat SLA targets.',
      'Maintained detailed ticket documentation and a shared knowledge base.',
      'Configured and maintained network monitoring and load balancing.',
    ],
  },
]

export const projects = [
  {
    index: '01',
    title: 'Replay Attack Prevention in Smart Car IoT Systems',
    status: "Ongoing Master's Research",
    blurb:
      'A hybrid nonce + counter defense against replay attacks on IoT-based smart vehicles.',
    description:
      'This research addresses the growing security threat of replay attacks in IoT-based smart car systems, where attackers intercept and retransmit valid messages to gain unauthorized access — a threat traditional detection struggles to counter. Existing nonce-based and counter-based defenses each carry limitations around memory overhead and synchronization, so the study proposes a hybrid solution combining both. It is evaluated in a simulated smart-vehicle environment across replay detection rate, latency and attack success rate, aiming to demonstrate a more robust, resource-efficient mitigation framework for automotive IoT security.',
    tags: ['Cyber Security', 'Network Security', 'Automotive IoT', 'Hybrid Defenses', 'Lightweight Cryptography'],
  },
  {
    index: '02',
    title: 'Intelligent Aquaponics',
    status: 'IoT System · 2017–2019',
    blurb:
      'A self-regulating IoT system merging aquaculture and hydroponics, monitored from anywhere.',
    description:
      'A symbiotic system merging aquaculture with hydroponics: nitrifying bacteria break fish waste into plant nutrients while water recirculates between tanks and beds. Relay-controlled pumps and sensors track humidity, water level and temperature, automating fish feeding and climate control. Backup air pumps and a master kill-relay guard against power failures, while a web application stores and visualises data for real-time monitoring from browsers and Android — cutting the manpower aquaponics usually demands.',
    tags: ['IoT', 'Android', 'Web App', 'Sensors', 'Automation'],
  },
  {
    index: '03',
    title: 'Wireless Audio Transmitter (FM)',
    status: 'Hardware / Electronics · 2016–2017',
    blurb:
      'A compact FM transmitter explored as a discreet, low-cost wireless hearing aid.',
    description:
      'A compact device that transmits FM waves, amplifying and modulating audio via a BC547 transistor and supporting components — a 15-metre range on a single 9V battery. Tuning is done from a phone or by adjusting the capacitor while monitoring radio output. Beyond broadcasting, the project explores assistive technology, serving as a discreet wireless hearing aid and a low-cost solution for people with hearing impairments.',
    tags: ['Electronics', 'Signal Processing', 'Hardware', 'Assistive Tech'],
  },
]

export const contact = {
  intro:
    'I am currently open to opportunities in Cyber Security and Full Stack Development. Initiate a secure connection below.',
}
