import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certificatesData, Certificate } from "../data/certificatesData";
import CertificateModal from "./CertificateModal";
import "./styles/MyCertifications.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Layout constants
const STRIP_WIDTH = 40;       // px offset between overlapping cards (strip visible)
const CARD_WIDTH = 495;       // 10% increased width (rectangular)
const CARD_HEIGHT = 450;      // px height of all cards

const MyCertifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [expandedAboutId, setExpandedAboutId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const focusIndex = hoveredIndex;
  const totalCards = certificatesData.length;

  // All cards are always CARD_WIDTH wide (square base form).
  // Positioning via 'left' creates the overlapping strip effect.
  const getCardLeft = (cardIndex: number): number => {
    if (focusIndex === null) {
      // No card focused: all cards overlap with equal STRIP_WIDTH offsets
      return cardIndex * STRIP_WIDTH;
    }
    if (cardIndex <= focusIndex) {
      // Cards on the left side of the focused card keep their strip positions
      return cardIndex * STRIP_WIDTH;
    } else {
      // Cards to the right slide over so focused card is fully exposed
      return focusIndex * STRIP_WIDTH + CARD_WIDTH + (cardIndex - focusIndex - 1) * STRIP_WIDTH;
    }
  };

  // Cards always have the same width — square
  const getCardWidth = () => CARD_WIDTH;

  // Compute total container width needed
  const containerWidth = focusIndex !== null
    ? focusIndex * STRIP_WIDTH + CARD_WIDTH + (totalCards - focusIndex - 1) * STRIP_WIDTH
    : (totalCards - 1) * STRIP_WIDTH + CARD_WIDTH;

  // Handle 3D tilt on mouse move within a card
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
      if (focusIndex === null || cardIndex !== focusIndex) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 6; // max ±6deg
      const rotX = -((y - cy) / cy) * 4; // max ±4deg

      // Also update glow position
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.transform = `translateY(-12px) scale(1.02) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    },
    [focusIndex]
  );

  const handleCardMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
      if (cardIndex !== focusIndex) return;
      e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
    },
    [focusIndex]
  );

  // Reset on container leave — all cards collapse
  const handleContainerLeave = () => {
    setHoveredIndex(null);
  };

  // GSAP scroll-triggered intro: cards animate from a chaotic pile
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".cert-card");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".certifications",
        start: "top 80%",
        once: true,
      },
    });

    tl.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.85,
      rotationZ: (i) => (i % 2 === 0 ? -8 : 8),
      duration: 0.7,
      ease: "back.out(1.4)",
      stagger: {
        each: 0.06,
        from: "end",
      },
    });
  }, { scope: containerRef });

  return (
    <>
      <div className="certifications" id="certifications" ref={containerRef}>
        <div className="certifications-inner">
          <h2 className="certifications-title">My <span>Certifications</span></h2>

          {/* Outer scroll wrapper so wide deck stays centered */}
          <div className="cert-deck-wrapper">
            <div
              className="cert-deck"
              style={{ width: `${containerWidth}px` }}
              onMouseLeave={handleContainerLeave}
            >
              {certificatesData.map((cert, index) => {
                const isFocused = index === focusIndex;
                const distanceFromFocus = focusIndex !== null ? Math.abs(index - focusIndex) : 0;
                const depthOpacity = isFocused ? 1 : Math.max(0.45, 1 - distanceFromFocus * 0.08);
                const depthScale = isFocused ? 1 : Math.max(0.9, 1 - distanceFromFocus * 0.03);

                return (
                  <div
                    key={cert.id}
                    className={`cert-card ${isFocused ? "cert-card--active" : "cert-card--collapsed"}`}
                    style={{
                      left: `${getCardLeft(index)}px`,
                      width: `${getCardWidth()}px`,
                      height: `${CARD_HEIGHT}px`,
                      zIndex: isFocused ? 50 : totalCards - index,
                      opacity: depthOpacity,
                      transform: isFocused
                        ? "translateY(-12px) scale(1.02)"
                        : `scale(${depthScale})`,
                      filter: isFocused ? "none" : `brightness(${Math.max(0.6, 1 - distanceFromFocus * 0.1)})`,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    onMouseLeave={(e) => handleCardMouseLeave(e, index)}
                  >
                    {/* ── NUMBER BADGE — top-right corner, always visible ── */}
                    <span className="cert-card__num-badge">{cert.rollNumber}</span>

                    {/* ── TITLE — top area, always visible ── */}
                    <div className="cert-card__top-title">
                      <h3>{cert.title}</h3>
                    </div>

                    {/* ── EXPANDED CONTENT ── */}
                    <div className={`cert-content ${isFocused ? "cert-content--visible" : ""}`}>

                      {/* Certificate Image */}
                      <div
                        className="cert-content__image-wrap"
                        onClick={() => setSelectedCert(cert)}
                        title="Click to zoom"
                      >
                        <img src={cert.image} alt={cert.title} />
                        <div className="cert-content__image-overlay">
                          <span>🔍 Click to zoom</span>
                        </div>
                      </div>

                      {/* Issuer */}
                      <p className="cert-content__issuer">{cert.issuer}</p>

                      {/* About */}
                      {cert.about && (
                        <div className="cert-about">
                          <button
                            className="cert-about__toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedAboutId(expandedAboutId === cert.id ? null : cert.id);
                            }}
                          >
                            {expandedAboutId === cert.id ? "Hide" : "About"} ↓
                          </button>
                          <div className={`cert-about__body ${expandedAboutId === cert.id ? "cert-about__body--open" : ""}`}>
                            <p>{cert.about}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Radial glow overlay */}
                    <div className="cert-card__glow" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </>
  );
};

export default MyCertifications;
