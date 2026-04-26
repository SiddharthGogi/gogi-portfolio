import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Project, projects } from "../data/projectsData";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
          <div 
            className="work-box clickable-card" 
            key={index}
            onClick={() => {
              setSelectedProject(project);
            }}
          >
            <div className="work-info">
              <div className="work-title">
                <h3>{project.id}</h3>

                <div>
                  <h4>{project.title}</h4>
                  <p>{project.category}</p>
                  {project.year && <span className="work-year">{project.year}</span>}
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>{project.tools}</p>
            </div>
            <WorkImage 
              image={project.image} 
              alt={project.title} 
              scale={project.scale}
            />
          </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Work;
