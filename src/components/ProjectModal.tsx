import { useEffect, useRef, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Project } from "../data/projectsData";
import { FaTimes } from "react-icons/fa";
import "./styles/ProjectModal.css";


interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    // Prevent wheel and touch events from moving the background,
    // while perfectly preserving GSAP ScrollSmoother functionality
    const preventScroll = (e: Event) => {
      // Don't prevent default if we are scrolling inside the modal body!
      const target = e.target as HTMLElement;
      if (modalRef.current && modalRef.current.contains(target)) {
        // If the modal-body itself is scrolling, let it scroll.
        // We only block it if it's the overlay or outside.
        const isModalBody = target.closest('.modal-body');
        if (isModalBody) {
          return; // Let the modal body scroll
        }
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Block arrow keys / spacebar from scrolling background
      if (["ArrowUp", "ArrowDown", "Spacebar", " "].includes(e.key)) {
        const target = e.target as HTMLElement;
        const isModalBody = target.closest('.modal-body');
        if (!isModalBody) {
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.5)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  // We use createPortal to ensure the fixed modal isn't trapped inside GSAP's transformed containers
  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <div 
          className="modal-img-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
        >
          <img 
            src={project.modalImage || project.image} 
            alt={project.title} 
            className="modal-img" 
            style={{ ...zoomStyle, transition: 'transform 0.1s ease-out', willChange: 'transform' }} 
          />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-meta">
            <span className="modal-category">{project.category}</span>
          </div>
          <div className="modal-section">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
          
          <div className="modal-section">
            <h3>The Problem</h3>
            <p>{project.problem}</p>
          </div>

          <div className="modal-section">
            <h3>The Solution</h3>
            <p>{project.solution}</p>
          </div>
          
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="modal-section">
              <h3>Key Features</h3>
              <ul className="modal-features-list">
                {project.keyFeatures.map((feature, i) => (
                   <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-section">
            <h3>Tools / Tech</h3>
            <div className="modal-tags">
              {project.tools.split(",").map((tool, index) => (
                <span key={index} className="modal-tag">{tool.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
