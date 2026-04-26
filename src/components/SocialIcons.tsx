import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowResume(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="icons-section">
        <div className="social-icons" data-cursor="icons" id="social">
          <span>
            <a href="https://www.linkedin.com" target="_blank">
              <FaLinkedinIn />
            </a>
          </span>
          <span>
            <a
              href="https://www.instagram.com/siddharth.gogi?igsh=YXh4aGs1bDU3YjVz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-instagram"
              data-tooltip="Follow me on Instagram"
            >
              <FaInstagram />
            </a>
          </span>
          <span>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </span>
        </div>

        {/* Resume button — opens modal instead of linking */}
        <button
          className="resume-button"
          onClick={() => setShowResume(true)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </button>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <div
          className="resume-modal-overlay"
          onClick={() => setShowResume(false)}
        >
          <div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="resume-modal-close"
              onClick={() => setShowResume(false)}
              aria-label="Close resume"
            >
              ✕
            </button>
            <img
              src="/images/resume.png"
              alt="Siddharth Gogi — Resume"
              className="resume-modal-img"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SocialIcons;
