import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Decal, useTexture, Html } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

import { FaTimes } from "react-icons/fa";
import "./styles/TechStack.css";

export type TechItem = {
  id: string;
  name: string;
  description: string;
  scale: number;
  textureUrl: string;
  sphereRef?: React.MutableRefObject<RapierRigidBody | null>;
};

const colors = [
  "#f3e8ff",
  "#e9d5ff",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8"
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres: TechItem[] = [
  { id: "excel", name: "MS Excel", description: "Spreadsheet tool for data analysis and visualization.", scale: 1.84, textureUrl: "/images/excel.png" },
  { id: "powerpoint", name: "PowerPOINT", description: "Professional dynamic presentation software.", scale: 1.84, textureUrl: "/images/powerpoint.png" },
  { id: "word", name: "MSword", description: "Word processor for creating and editing documents.", scale: 1.84, textureUrl: "/images/word.png" },
  { id: "chatgpt", name: "Chat GPT", description: "Conversational AI and language model.", scale: 1.84, textureUrl: "/images/chatgpt.png" },
  { id: "gemini", name: "Google Gemini", description: "Advanced multimodal AI model and reasoning engine.", scale: 1.84, textureUrl: "/images/gemini.png" },
  { id: "canva", name: "canva", description: "Design graphics, presentations, and digital content.", scale: 1.84, textureUrl: "/images/canva.png" },
  { id: "sw", name: "Solidworks", description: "Advanced 3D CAD design and engineering simulation tool.", scale: 1.84, textureUrl: "/images/sw.png" },
  { id: "claude", name: "Antigravity.", description: "Next-generation AI assistant for research and writing.", scale: 1.84, textureUrl: "/images/anthropic.png" },
  { id: "framer", name: "Frmer", description: "Interactive design and fast prototyping tool.", scale: 1.84, textureUrl: "/images/framer.png" },
  { id: "ps", name: "Adobe Photoshop", description: "Industry-standard image editing and digital art software.", scale: 1.84, textureUrl: "/images/ps.png" },
  { id: "gemini_alt", name: "Perplexity", description: "Google's most capable AI model for complex tasks.", scale: 1.84, textureUrl: "/images/perplexity.svg" },
  { id: "deepseek", name: "DeepSeek", description: "Advanced AI search and reasoning infrastructure.", scale: 1.84, textureUrl: "/images/deepseek.svg" },
  { id: "grok", name: "Grok", description: "Humorous and real-time AI knowledge engine.", scale: 1.84, textureUrl: "/images/grok.svg" },
  { id: "ts", name: "TypeScript", description: "Strongly typed programming language that builds on JavaScript.", scale: 1.84, textureUrl: "/images/typescript.webp" },
];

function SphereDecal({ url }: { url: string }) {
  const texture = useTexture(url);
  return (
    <Decal
      position={[0, 0, 1]}
      rotation={[0, 0, 0]}
      scale={[4.55, 4.55, 1.0]}
    >
      <meshPhysicalMaterial
        map={texture}
        transparent={false}
        alphaTest={0.5}
        depthWrite={true}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </Decal>
  );
}

type SphereProps = {
  tech: TechItem;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  isMobile?: boolean;
  onTechClick: (tech: TechItem) => void;
  externalHoveredId: React.MutableRefObject<string | null>;
};

function SphereGeo({
  tech,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isMobile = false,
  onTechClick,
  externalHoveredId,
}: SphereProps) {
  // Use either the globally registered ref or a fallback internal ref
  const internalApi = useRef<RapierRigidBody | null>(null);
  const api = tech.sphereRef || internalApi;
  
  const meshRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(tech.scale);
  const pointerSpeed = useRef(0);
  const lastPointer = useRef(new THREE.Vector2());

  // Clone material so glowing one ball doesn't glow all spheres of the same color
  const instancedMaterial = useMemo(() => material.clone(), [material]);

  useFrame((_state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta); // clamp delta against violent scrolls

    const isGlobalHoverActive = externalHoveredId.current !== null;
    const isFocused = externalHoveredId.current === tech.id;
    const isRepressed = isGlobalHoverActive && !isFocused;

    // ── 1. SCALE BREATHE (FOCUSED) VS IDLE ──
    const baseScale = tech.scale * (isMobile ? 0.7 : 1);
    let targetScale = baseScale;
    let baseOffset = 0;

    if (isFocused) {
        // Organic Breathing Effect
        const breathe = Math.sin(_state.clock.elapsedTime * 2.5) * 0.03;
        targetScale = (baseScale * 1.25) + breathe;
        
    } else if (isRepressed) {
        targetScale = baseScale * 0.85;
    } else {
        // Idle Sin Wave floating offset based uniquely on ID string length to create staggered variations
        baseOffset = Math.sin(_state.clock.elapsedTime * 1.5 + tech.id.length) * 0.8;
    }

    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 15);
    if(meshRef.current) {
        meshRef.current.scale.setScalar(currentScale.current);
    }
    
    // ── 2. GLOSSY AESTHETICS ──
    const targetEmissiveInt = isFocused ? 0.8 : 0;
    instancedMaterial.emissive = new THREE.Color("#A855F7");
    instancedMaterial.emissiveIntensity = THREE.MathUtils.lerp(instancedMaterial.emissiveIntensity, targetEmissiveInt, delta * 15);

    // ── 3. CHOREOGRAPHED MULTI-TARGET PHYSICS ──
    let targetPos = new THREE.Vector3(0, baseOffset, 0); // Include the sin wave offset into idle
    let impulseStrength = 50;
    let dampingMultiplier = 1;

    if (isFocused) {
        targetPos.set(6, 0, 3);
        impulseStrength = 150; 
        dampingMultiplier = 8; 
    } else if (isRepressed) {
        targetPos.set(-6, -1 + (baseOffset * 0.5), -5);
        impulseStrength = 80;
    }

    const currentPos = api.current.translation();
    const vecToTarget = new THREE.Vector3(
        targetPos.x - currentPos.x,
        targetPos.y - currentPos.y,
        targetPos.z - currentPos.z
    );

    // Convert exact mathematical disparity smoothly into an actionable impulse
    const distanceThreshold = vecToTarget.length();
    const impulse = vecToTarget.normalize().multiplyScalar(impulseStrength * distanceThreshold * delta * currentScale.current);
    api.current.applyImpulse(impulse, true);

    // ── 4B. ALGORITHMIC POINTER REPULSION ──
    // Unobtrusively track pointer velocity natively
    const dx = _state.pointer.x - lastPointer.current.x;
    const dy = _state.pointer.y - lastPointer.current.y;
    const rawSpeed = Math.sqrt(dx * dx + dy * dy);
    lastPointer.current.copy(_state.pointer);

    pointerSpeed.current = THREE.MathUtils.lerp(pointerSpeed.current, rawSpeed, 0.1);

    // If perfectly moving fast and NOT FOCUSED, calculate soft distance pushaway mapping cursor into 3D plane
    if (!isFocused && pointerSpeed.current > 0.0035) {
        const ptr3D = new THREE.Vector3(_state.pointer.x, _state.pointer.y, 0.5).unproject(_state.camera);
        ptr3D.z = currentPos.z; // flattened normalized detection
        
        const vecFromPtr = new THREE.Vector3().subVectors(currentPos, ptr3D);
        const physicalDist = vecFromPtr.length();
        
        if (physicalDist < 6.5) {
            const repulsionForce = vecFromPtr.normalize().multiplyScalar((6.5 - physicalDist) * 39 * pointerSpeed.current);
            api.current.applyImpulse(repulsionForce, true);
        }
    }

    // Modulate physical body tension dynamically
    api.current.setLinearDamping(0.75 * dampingMultiplier);
    api.current.setAngularDamping(0.98 * dampingMultiplier);

    // ── 5. ROTATIONAL CORRECTION (FACE FRONT) ──
    const rot = api.current.rotation();
    const q = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
    const identity = new THREE.Quaternion();
    
    // Calculate rotational distance from identity
    const dot = Math.min(1, Math.abs(q.dot(identity)));
    
    // Idle balls drift gently on Y-axis
    let strength = (1 - dot) * 12; 
    let idleDrift = isGlobalHoverActive ? 0 : Math.sin(_state.clock.elapsedTime + tech.id.length) * 0.5 * delta * 60;
    
    if (isFocused) {
        strength = (1 - dot) * 80; 
        idleDrift = 0;
    }

    const correction = q.clone().invert().normalize();
    const angVel = api.current.angvel();
    api.current.setAngvel(
      {
        x: angVel.x * 0.85 + correction.x * strength * delta * 60,
        y: angVel.y * 0.85 + correction.y * strength * delta * 60 + idleDrift, // Apply drift
        z: angVel.z * 0.85 + correction.z * strength * delta * 60,
      },
      true
    );
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.98}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[tech.scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * tech.scale]}
        args={[0.15 * tech.scale, 0.275 * tech.scale]}
      />
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={sphereGeometry}
        material={instancedMaterial}
        rotation={[0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          externalHoveredId.current = tech.id;
        }}
        onPointerOut={() => {
          if (externalHoveredId.current === tech.id) {
            externalHoveredId.current = null;
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onTechClick(tech);
        }}
      >
        {tech.textureUrl && <SphereDecal url={tech.textureUrl} />}
        
        {/* Dynamic DOM Link Anchor tracking physical position continuously */}
        <Html center style={{ pointerEvents: 'none' }}>
          <div id={`focal-anchor-${tech.id}`} style={{ width: '2px', height: '2px', position: 'absolute' }} />
        </Html>
      </mesh>
    </RigidBody>
  );
}

// ── DOM TO 3D CANVAS SVG LINKAGE ──────────────────────────────────
type SVGLineProps = {
  activeIdRef: React.MutableRefObject<string | null>;
};

function DynamicSVGLine({ activeIdRef }: SVGLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let frameId: number;
    let opacity = 0;

    const tick = () => {
      const targetOpacity = activeIdRef.current ? 1 : 0;
      opacity += (targetOpacity - opacity) * 0.15; // Smooth fade easing
      
      if (svgRef.current) {
         svgRef.current.style.opacity = opacity.toFixed(2);
      }

      if (activeIdRef.current && svgRef.current && pathRef.current) {
         const anchor = document.getElementById(`focal-anchor-${activeIdRef.current}`);
         const dest = document.getElementById(`list-${activeIdRef.current}`);
         if (anchor && dest) {
            const sRect = anchor.getBoundingClientRect();
            const tRect = dest.getBoundingClientRect();
            const svgRect = svgRef.current.getBoundingClientRect();

            // Calculate precise offsets bridging absolute viewport coordinates
            const x1 = sRect.left + sRect.width / 2 - svgRect.left;
            const y1 = sRect.top + sRect.height / 2 - svgRect.top;
            
            const x2 = tRect.left - svgRect.left - 10; // slightly left of the border
            const y2 = tRect.top + tRect.height / 2 - svgRect.top;

            // Draw a sweeping bezier curve between points
            const offset = Math.abs(x2 - x1) * 0.45;
            pathRef.current.setAttribute("d", `M${x1},${y1} C${x1 + offset},${y1} ${x2 - offset},${y2} ${x2},${y2}`);
         }
      }
      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <svg 
      ref={svgRef} 
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}
    >
      <path 
        ref={pathRef}
        fill="none" 
        stroke="#a855f7" 
        strokeWidth="1.5" 
        style={{ filter: 'drop-shadow(0px 0px 4px rgba(168,85,247,0.7))', strokeDasharray: '6,6' }}
      />
    </svg>
  );
}

const TechStack = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize(); // Init bounding
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Shared ultra-responsive ref for external hover interactions (bypasses React loop)
  const externalHoveredId = useRef<string | null>(null); // Controls the 3D physics cluster focus
  const domListHoveredId = useRef<string | null>(null); // Strictly isolates and restricts the SVG Line to DOM clicks

  // ── MATTE GRADIENT MATERIALS ──
  const materials = useMemo(() => {
    return colors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.1,
          roughness: 0.85,
        })
    );
  }, []);

  // Centralized Master Registry (mapping 3D refs for direct lookup/interaction later)
  const techRegistry = useMemo(() => {
    return spheres.map((tech) => ({
      ...tech,
      sphereRef: { current: null } as React.MutableRefObject<RapierRigidBody | null>,
      material: materials[Math.floor(Math.random() * materials.length)]
    }));
  }, [materials]);

  // Close modal with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTech(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="techstack" id="techstack">
      {/* ── CSS GLOW ORBS ── */}
      <div className="tech-glow-orb orb-primary"></div>
      <div className="tech-glow-orb orb-secondary"></div>

      {/* ── INTERACTIVE SVG CONNECTING LOOP ── */}
      <DynamicSVGLine activeIdRef={domListHoveredId} />

      {/* Centered Main Title */}
      <h2 className="techstack-title" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', marginBottom: '20px' }}> 
          My <span>Techstack</span>
      </h2>

      <div className="techstack-layout" style={{ position: 'relative', zIndex: 10 }}>
        <div className="techstack-canvas-wrapper">
          <Canvas
            dpr={[1, 2]}
            shadows
            gl={{ alpha: true, stencil: false, antialias: false }}
            camera={{ position: [0, 0, 35], fov: 40, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="tech-canvas"
          >
        <ambientLight intensity={0.4} /> {/* Dimmed ambient for richer contrast */}
        {/* Purple Key Light */}
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.4}
          color="#a855f7"
          intensity={3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Cyan Rim Light */}
        <directionalLight position={[-15, -5, -20]} intensity={4} color="#22d3ee" />
        {/* Subtle Ambient Fill */}
        <pointLight position={[0, -10, 5]} intensity={1.5} color="#581c87" />
        <Physics gravity={[0, 0, 0]}>
          {techRegistry.map((tech) => (
            <SphereGeo
              key={tech.id}
              tech={tech}
              material={tech.material}
              isMobile={isMobile}
              onTechClick={(t) => setSelectedTech(t)}
              externalHoveredId={externalHoveredId}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
        </div>

        <div className="techstack-skills-wrapper">

          <div className="skills-grid" data-lenis-prevent="true" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {techRegistry.map((tech, index) => (
               <div 
                 className="skill-card hover-glow" 
                 id={"list-" + tech.id}
                 key={"list-" + tech.id}
                 onMouseEnter={() => {
                   if (externalHoveredId.current !== tech.id) {
                     externalHoveredId.current = tech.id;
                   }
                   domListHoveredId.current = tech.id;
                 }}
                 onMouseLeave={() => {
                   if (externalHoveredId.current === tech.id) {
                     externalHoveredId.current = null;
                   }
                   domListHoveredId.current = null;
                 }}
                 onClick={() => setSelectedTech(tech)}
                 style={{ cursor: 'pointer' }}
               >
                  <h4>{index + 1}. {tech.name}</h4>
                  <p>{tech.description}</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tech Modal */}
      {selectedTech && (
        <div 
          className="tech-modal-overlay" 
          onClick={() => setSelectedTech(null)}
        >
          <div 
            className="tech-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="tech-close-btn" 
              onClick={() => setSelectedTech(null)}
            >
              <FaTimes />
            </button>
            <div className="tech-modal-header">
              <div className="tech-modal-icon-wrapper">
                <img src={selectedTech.textureUrl} alt={selectedTech.name} />
              </div>
              <h3>{selectedTech.name}</h3>
            </div>
            <div className="tech-modal-body">
              <p>{selectedTech.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;
