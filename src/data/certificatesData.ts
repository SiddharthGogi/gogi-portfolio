export interface Certificate {
  id: string;
  rollNumber: string;
  title: string;
  issuer: string;
  skills: string[];
  image: string;
  issueDate: string;
  about?: string;
}




export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    rollNumber: "01",
    title: "MICROSOFT 365 FUNDAMENTALS",
    issuer: "Microsoft",
    skills: ["Microsoft 365", "Cloud Computing", "Productivity Solutions", "Security"],
    image: "/images/cert-ms365.png",
    issueDate: "2024-01-15",
    about: "Microsoft 365 Fundamentals covers the core cloud-based productivity suite used by millions of professionals worldwide. The course explores Word, Excel, PowerPoint, Teams, and OneDrive along with cloud security and compliance concepts. It establishes a solid foundation in Microsoft's ecosystem and prepares learners for real-world office and enterprise collaboration. Completing this certification demonstrates proficiency in the tools that drive modern digital workplaces."
  },
  {
    id: "cert-2",
    rollNumber: "02",
    title: "ENGLISH FOR CAREER DEVELOPMENT",
    issuer: "University of Pennsylvania",
    skills: ["Business Communication", "Resume Writing", "Interview Skills", "Professional English"],
    image: "/images/cert-english.png",
    issueDate: "2024-02-15",
    about: "Offered by the University of Pennsylvania, this course develops the English communication skills essential for career success in a global job market. It covers professional writing, interview preparation, resume crafting, and networking language strategies. Learners practice real-world scenarios such as job applications and workplace conversations in English. The course is designed to help non-native speakers project confidence and clarity in professional settings."
  },
  {
    id: "cert-3",
    rollNumber: "03",
    title: "FINANCE AND ACCOUNTING",
    issuer: "Wharton Univ. of Pennsylvania",
    skills: ["Financial Statements", "Corporate Finance", "Accounting Principles", "Investment Analysis"],
    image: "/images/cert-03.png",
    issueDate: "2024-03-15",
    about: "This Wharton specialization covers the core principles of financial accounting and corporate finance across four rigorous courses. Learners gain hands-on experience reading and interpreting financial statements, understanding company valuations, and analyzing investment decisions. The program builds the financial literacy needed to participate meaningfully in business discussions at any organizational level. It is grounded in real case studies from the Wharton School, one of the world's top business institutions."
  },
  {
    id: "cert-4",
    rollNumber: "04",
    title: "COLLABORATIVE ROBOTICS",
    issuer: "L&T EduTech",
    skills: ["Cobot Programming", "Human-Robot Collaboration", "Industrial Automation", "Robot Safety"],
    image: "/images/cert-04.png",
    issueDate: "2024-04-15",
    about: "This specialization from L&T EduTech explores the growing field of collaborative robots (cobots) designed to work safely alongside human workers in industrial environments. It covers cobot programming, sensor integration, safety protocols, and real-world deployment scenarios across manufacturing sectors. The course bridges mechanical engineering with digital automation by combining theory with applied lab exercises. Graduates are equipped to design and implement human-robot collaborative workflows in Industry 4.0 environments."
  },
  {
    id: "cert-5",
    rollNumber: "05",
    title: "FLUIDICS & SMART FACTORY AUTOMATION",
    issuer: "L&T EduTech",
    skills: ["Hydraulics", "Pneumatics", "Smart Factory", "Industrial IoT"],
    image: "/images/cert-05.png",
    issueDate: "2024-05-15",
    about: "This certification covers the principles of industrial fluid systems including hydraulics and pneumatics, and how they integrate into smart factory automation architectures. Learners explore industrial IoT sensors, actuators, and control loops used to monitor and automate physical processes on the factory floor. The course teaches how traditional fluid-power systems are being transformed by digital intelligence and connectivity. It is ideal for engineers looking to bridge mechanical systems expertise with modern smart manufacturing technologies."
  },
  {
    id: "cert-6",
    rollNumber: "06",
    title: "ROBOTICS ENGINEERING AND APPLICATIONS",
    issuer: "L&T EduTech",
    skills: ["Robot Kinematics", "Control Systems", "Gripper Design", "Industrial Robots"],
    image: "/images/cert-06.png",
    issueDate: "2024-06-15",
    about: "This L&T EduTech course provides a practical and theoretical foundation in robotics engineering, covering kinematics, dynamics, and control systems used in industrial robots. Learners study end-effector and gripper design along with programming techniques for automated assembly and process tasks. The curriculum includes real-world robot manipulation scenarios and emphasizes safety and precision in high-stakes environments. It prepares engineers to deploy and manage robotic systems across manufacturing, logistics, and automation industries."
  },
  {
    id: "cert-7",
    rollNumber: "07",
    title: "FUNDAMENTALS OF ROBOTICS",
    issuer: "L&T EduTech",
    skills: ["Mechatronics", "Sensor Integration", "Robot Programming", "Digital Control"],
    image: "/images/cert-07.png",
    issueDate: "2024-07-15",
    about: "Fundamentals of Robotics introduces the interdisciplinary field of mechatronics and robotics to learners with a background in engineering or technology. The course covers robot components including actuators, sensors, and digital control circuits, along with foundational programming for automated motion. It provides a strong entry point into more advanced robotics specializations and industry applications. Learners come away with the vocabulary and conceptual framework to understand and contribute to modern robotic systems."
  },
  {
    id: "cert-8",
    rollNumber: "08",
    title: "LEVERAGE DATA SCIENCE FOR SUPPLY CHAIN",
    issuer: "University of California, Irvine",
    skills: ["Demand Forecasting", "Monte Carlo Simulation", "Inventory Optimization", "Data Analytics"],
    image: "/images/cert-08.png",
    issueDate: "2024-08-15",
    about: "This UC Irvine specialization teaches how data science techniques can be applied to improve supply chain decision-making and agility. Learners explore demand forecasting, inventory management with variability, capacity optimization, and Monte Carlo simulation for risk modeling. The program bridges data analytics with supply chain operations, enabling professionals to turn raw data into strategic insights. It is designed for supply chain managers and analysts seeking to modernize their approach using quantitative methods."
  },
  {
    id: "cert-9",
    rollNumber: "09",
    title: "SUPPLY CHAIN PLANNING",
    issuer: "University of California, Irvine",
    skills: ["Demand Planning", "S&OP", "Forecasting Methods", "Supply Network Design"],
    image: "/images/cert-09.png",
    issueDate: "2024-09-15",
    about: "This course from UC Irvine focuses on the strategic and operational aspects of supply chain planning, including demand management, sales and operations planning (S&OP), and network design. Learners study forecasting methodologies and how to align supply capacity with market demand in dynamic environments. The curriculum integrates both qualitative judgment and quantitative tools to support effective planning decisions. It is a valuable credential for professionals working in operations, procurement, or logistics roles."
  },
  {
    id: "cert-10",
    rollNumber: "10",
    title: "SUPPLY CHAIN OPTIMISATION",
    issuer: "University of California, Irvine",
    skills: ["Linear Programming", "Risk Mitigation", "Cost Reduction", "Resource Allocation"],
    image: "/images/cert-10.png",
    issueDate: "2024-01-15",
    about: "Supply Chain Optimization covers quantitative methods for maximizing efficiency and minimizing costs across complex supply networks. Topics include linear programming, resource allocation, risk mitigation strategies, and resilience planning in global supply chains. Learners apply optimization models to real-world scenarios such as route planning, sourcing decisions, and capacity balancing. The course is ideal for operations professionals seeking to apply rigorous analytical thinking to their supply chain challenges."
  },
  {
    id: "cert-11",
    rollNumber: "11",
    title: "INVENTORY MANAGEMENT",
    issuer: "University of California, Irvine",
    skills: ["Safety Stock", "EOQ Models", "Replenishment Policies", "Warehouse Operations"],
    image: "/images/cert-11.png",
    issueDate: "2024-02-15",
    about: "This UC Irvine course provides a comprehensive introduction to inventory management principles used in modern supply chains. It covers economic order quantity (EOQ), safety stock calculations, replenishment policies, and warehouse layout optimization strategies. Learners gain the tools to balance holding costs against stockout risks while maintaining service level targets. The course is highly practical and directly applicable to roles in warehousing, procurement, and operations management."
  },
  {
    id: "cert-12",
    rollNumber: "12",
    title: "ARTIFICIAL INTELLIGENCE",
    issuer: "Google / Coursera",
    skills: ["Generative AI", "Prompt Engineering", "AI Productivity Tools", "Responsible AI"],
    image: "/images/cert-12.png",
    issueDate: "2024-03-15",
    about: "The Google AI Essentials specialization covers the foundational skills needed to use artificial intelligence tools responsibly and effectively in a professional context. Learners explore generative AI, prompt engineering, and how tools like Gemini can maximize workplace productivity across five structured courses. The program also addresses responsible AI use and how to stay ahead of rapid developments in the AI landscape. Completing this certification from Google validates practical competency in the AI tools shaping the future of work."
  },
  {
    id: "cert-13",
    rollNumber: "13",
    title: "MAXIMISING PRODUCTIVITY WITH AI TOOLS",
    issuer: "Google / Coursera",
    skills: ["AI Productivity", "Prompt Engineering", "Time Management", "Automation"],
    image: "/images/cert-13.png",
    issueDate: "2024-04-15",
    about: "This course focuses on leveraging cutting-edge Artificial Intelligence tools to streamline professional workflows and enhance daily productivity. It covers advanced prompt engineering techniques, task automation with AI, and the strategic integration of AI assistants into office applications. By the end of this certification, learners can significantly reduce time spent on repetitive tasks and focus on high-impact creative work. It is an essential credential for any modern professional looking to stay competitive in the AI-driven workplace."
  }
];
