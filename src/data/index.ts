const skills = [
  {
    icon: "",
    name: "HTML",
  },

  {
    icon: "",
    name: "CSS",
  },
  {
    icon: "",
    name: "Javascript",
  },
  {
    icon: "",
    name: "TypeScript",
  },
  {
    icon: "",
    name: "TailwindCSS",
  },
  {
    icon: "",
    name: "Bootstrap",
  },
  {
    icon: "",
    name: "THREEJS",
  },
  {
    icon: "",
    name: "ReactJS",
  },
  {
    icon: "",
    name: "Redux Toolkit",
  },
  {
    name: "NodeJS",
    icon: "nodejs",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
  },
  {
    name: "PostgreSQL",
    icon: "",
  },
  {
    name: "Git",
    icon: "git",
  },

  {
    icon: "",
    name: "Firebase",
  },
];

const projects = [
  {
    name: "TechMind",
    description:
      "TechMind is a web platform specializing in business programming courses. Users can explore and enroll in available courses, register directly on the site, and submit inquiries. The owner has access to a dashboard for managing courses, diplomas, and student inquiries. The development process resulted in a highly functional and well-performing website. TechMind offers equal opportunities for individuals interested in learning business & programming.",
    tags: [
      "Typescript",
      "ReactJS",
      "MongoDB",
      "NodeJS/ExpressJS",
      "Middlewares",
      "Bootstrap",
      "Firebase Storage",
      "Netlify",
    ],
    url: "https://techmind812.com/",
    image: "carrent",
    githubs: [
      { title: "Frontend", url: "https://github.com/" },
      { title: "Backend", url: "https://github.com/" },
    ],
  },
  {
    name: "EGITeam",
    description:
      "The EGITeam Website is a platform for a volunteering team, offering insights into their story and purpose. It showcases their events, including speakers and important details. With a focus on community involvement, the website keeps visitors informed about upcoming initiatives. Serving as a central hub, it highlights the team's commitment to making a positive impact.",
    tags: ["ReactJS", "CSS", "NodeJS/ExpressJS", "MongoDB", "Netlify"],
    url: "https://egiteam.org/",
    image: "carrent",
    githubs: [
      { title: "Frontend", url: "https://github.com/" },
      { title: "Backend", url: "https://github.com/" },
    ],
  },
  {
    name: "My Personal 3D Portfolio",
    description: "",
    tags: [
      "ReactJS",
      "R3F(React Three Fiber)",
      "GSAP",
      "FramerMotion",
      "TailwindCSS",
      "Typescript",
      "GLSL",
      //   "Custom Shaders",
    ],
    image: "tripguide",
    githubs: [
      { title: "Frontend", url: "https://github.com/" },
      { title: "Backend", url: "https://github.com/" },
    ],
  },
];

const experiences = [
  {
    title: "Full-Stack Freelancer",
    company_name: "Upwork",
    icon: "Upwork",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using Web technologes.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Bulding Clean/Secured/Manainable Backend Code.",
    ],
  },
];

const volunteering = [
  {
    title: "Backend Head",
    company_name: "EGI Team",
    icon: "EGI Team",
    date: "March 2020 - Now",
    points: [
      "Sharing expertise and helping others in learning backend development",
      "Contributing to meaningful projects and making a positive impact",
      "Developed leadership abilities",
      "Gained valuable teamwork experience",
    ],
  },
];

export { experiences, volunteering, projects, skills };
