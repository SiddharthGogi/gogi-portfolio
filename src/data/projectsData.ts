export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  year: string;
  scale?: number;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  challenges: string;
  github?: string;
  demo?: string;
  modalImage?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Habit Tracker App: SANKALPA",
    category: "AI Tool",
    tools: "AI: Base44",
    image: "/images/sankalpa-logo.png",
    year: "2025 - 2026",
    description: "SANKALPA is a smart habit-tracking application that uses AI to analyze your behavior and provide personalized motivation to keep you on track.",
    problem: "Most habit trackers are manual and fail to account for the psychological dips and peaks of the user, leading to high abandonment rates.",
    solution: "By integrating AI-driven insights, SANKALPA dynamically adjusts goal difficulty and sends proactive reminders based on historical success patterns.",
    keyFeatures: ["Real-time behavior analysis", "Dynamic goal adjustment", "Personalized motivation", "Progress dashboard"],
    challenges: "Ensuring low-latency AI processing on mobile devices while maintaining high accuracy in user habit prediction models.",
    github: "https://github.com/",
    demo: "https://momentum-demo.com"
  },
  {
    id: "02",
    title: "Smart Helmet for Safety",
    category: "Hardware & IoT",
    tools: "Arduino, Sensors",
    image: "/images/helmet.jpg",
    scale: 1.5,
    year: "2024 - 2025",
    description: "A specialized IoT-enabled helmet designed for industrial safety, capable of detecting impacts, gas leaks, and worker vitals in real-time.",
    problem: "Industrial accidents often occur in remote or noisy areas where workers cannot easily signal for help, leading to delayed emergency responses.",
    solution: "The Smart Helmet collects sensor data and wirelessly transmits alerts to a central dashboard, providing instant GPS location and incident type to safety officers.",
    keyFeatures: ["Multi-sensor fusion (Impact, Gas, Heartrate)", "Long-range RF communication", "Rugged industrial design", "Automatic SOS override"],
    challenges: "Calibrating sensor sensitivity to minimize false alarms while ensuring critical safety triggers are never missed in harsh environments.",
    github: "https://github.com/",
  },
  {
    id: "03",
    title: "Automated Gantry Robot",
    category: "Mechatronics System",
    tools: "SolidWorks, RFID",
    image: "/images/gantry.png",
    year: "2023 - 2024",
    description: "A precision mechatronics system built for automated warehouse sorting using RFID technology and high-torque stepper motors.",
    problem: "Manual sorting in logistics leads to high error rates and physical strain on employees during high-volume periods.",
    solution: "The Gantry Robot automates the pick-and-place process with sub-millimeter precision, significantly increasing throughput and reducing human error.",
    keyFeatures: ["Sub-millimeter position accuracy", "Integrated RFID scanning", "Modular mechanical frame", "Real-time status monitoring"],
    challenges: "Synchronizing high-speed stepper motor controllers to prevent vibration while maintaining structural rigidity under load.",
    github: "https://github.com/",
  },
  {
    id: "04",
    title: "Street Cause MGIT [NGO]",
    category: "Vice President",
    tools: "Negotiation, Strategic Communication",
    image: "/images/street_cause_logo.png",
    modalImage: "/images/street_cause_modal.jpg",
    year: "2022 - 2023",
    description: "Leading one of the largest student-run NGOs at MGIT, coordinating impactful social projects and managing a multi-departmental team.",
    problem: "Coordinating large-scale social impact projects across multiple student groups often suffers from communication silos and inefficient resource allocation.",
    solution: "Implemented a streamlined project management workflow and strategic communication plan, resulting in a 40% increase in volunteer participation and project success rate.",
    keyFeatures: ["Centralized project management hub", "Volunteer engagement tracking", "Cross-departmental coordination", "Scalable social impact assessment"],
    challenges: "Managing decentralized student teams and maintaining consistent project quality despite high academic pressure on volunteers.",
  }
];
