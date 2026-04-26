import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const contentIn = e.currentTarget.querySelector(".what-content-in");
    if (contentIn) {
      contentIn.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>ROBOTICS AND AUTOMATION</h3>
              <h4>Robotics & Systems Integration</h4>
              <p>
                Developing and integrating advanced control systems. Expertise in PLC, microcontrollers, and modern sensing technologies for real-world robotics.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Arduino</div>
                <div className="what-tags">Gantry Systems</div>
                <div className="what-tags">Sensors & Actuators</div>
                <div className="what-tags">Hydraulics</div>
                <div className="what-tags">Pneumatics</div>
                <div className="what-tags">AI Fundamentals</div>
                <div className="what-tags">Circuit Design</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>MANUFACTURING & PRODUCTION</h3>
              <h4>Production & Lean Operations</h4>
              <p>
                Optimizing production planning, precise machinery operations, and quality inspection to ensure seamless inventory and workflow management.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">CNC Programming</div>
                <div className="what-tags">G-code Basics</div>
                <div className="what-tags">Turning & Milling</div>
                <div className="what-tags">Lean Manufacturing</div>
                <div className="what-tags">Quality Inspection</div>
                <div className="what-tags">Preventive Maintenance</div>
                <div className="what-tags">Inventory Control</div>
                <div className="what-tags">SolidWorks</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>CLIENTELE MANAGEMENT</h3>
              <h4>Client Relationship & CRM Strategy</h4>
              <p>
                Managing professional client interactions, CRM workflows, and team communication to ensure seamless project delivery and long-term retention.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">CRM Systems</div>
                <div className="what-tags">Strategic Communication</div>
                <div className="what-tags">Lead Management</div>
                <div className="what-tags">Customer Retention</div>
                <div className="what-tags">Negotiation</div>
                <div className="what-tags">Project Coordination</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 3)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI GRAPHIC DESIGNING</h3>
              <h4>Prompt Engineering & Visual Identity</h4>
              <p>
                Prompt engineering for high-quality visual generation. Image generation, editing, and enhancement using AI tools. AI-based logo design, branding, and visual identity creation. Automated design workflows and content generation.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Antigravity</div>
                <div className="what-tags">Framer</div>
                <div className="what-tags">Adobe</div>
                <div className="what-tags">Canva</div>
                <div className="what-tags">UI/UX Fundamentals</div>
                <div className="what-tags">Visual Storytelling</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 4)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI TOOLS FOR AUTOMATION</h3>
              <h4>Streamlining Processes via Intelligent Tooling</h4>
              <p>
                Implementing cutting-edge AI tools to accelerate workflows, eliminate manual redundancies, and supercharge productivity. Leveraging commercial and custom AI solutions to seamlessly bridge the gap between complex software challenges and efficient deployment.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Workflow Automation</div>
                <div className="what-tags">Copilot Integration</div>
                <div className="what-tags">Process Optimization</div>
                <div className="what-tags">API Connectors</div>
                <div className="what-tags">No-Code AI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
