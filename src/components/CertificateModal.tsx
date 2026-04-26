import { useEffect, useRef, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Certificate } from "../data/certificatesData";
import { FaTimes } from "react-icons/fa";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import "./styles/ProjectModal.css";

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

const CertificateModal = ({ certificate, onClose }: CertificateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(true);

    const preventScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (modalRef.current && modalRef.current.contains(target)) {
        const isModalBody = target.closest('.modal-body');
        if (isModalBody) return;
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      if (smoother) smoother.paused(false);
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
      transform: "scale(2.5)", // robust 2.5x zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      {/* Container is exactly 800x800 */ }
      <div className="modal-content cert-modal-special" ref={modalRef} style={{ width: 'min(800px, 90vw)', height: 'min(800px, 90vh)', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose} style={{ top: '10px', right: '10px', zIndex: 50 }}>
          <FaTimes />
        </button>
        
        {/* Zoom area scaled proportionately */}
        <div 
          className="cert-zoom-container" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: '550px', overflow: 'hidden', backgroundColor: '#fff', position: 'relative', cursor: 'zoom-in', flexShrink: 0 }}
        >
          <img 
            src={certificate.image} 
            alt={certificate.title} 
            style={{ ...zoomStyle, width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.1s ease-out' }} 
          />
        </div>
        
        <div className="modal-body">
          <h2 className="modal-title">{certificate.title}</h2>
          <div className="modal-meta">
            <span className="modal-category">Issued by: {certificate.issuer}</span>
            <span style={{ marginLeft: '15px' }}>Date: {certificate.issueDate}</span>
          </div>
          <div className="modal-section">
            <div className="modal-tags">
              {certificate.skills.map((skill, index) => (
                <span key={index} className="modal-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;
