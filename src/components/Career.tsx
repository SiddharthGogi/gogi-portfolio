import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. Mechatronics Engineering</h4>
                <h5>Education</h5>
              </div>
              <h3>2021-2025</h3>
            </div>
            <p>
              Mechatronics engineering graduate. Studies covered manufacturing systems, automation technologies, mechanical operations, CNC technology, machine kinematics, and production processes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Inventory Control Engineer</h4>
                <h5>Magadha Corporation</h5>
              </div>
              <h3>2025-2026</h3>
            </div>
            <p>
              Managed and optimised inventory systems, ensured accurate stock levels and material flow, and analysed data using tools like Excel and AI. Applied Lean Manufacturing Principles and Quality Inspection techniques.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI in Automation & Mechatronics</h4>
                <h5>Ongoing Projects</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Expanding expertise in collaborative robotics in industries, AI tools in automation, digital marketing, and advanced problem-solving methodologies to improve operational efficiency and workflow optimisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
