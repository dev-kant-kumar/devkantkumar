import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Error Boundary for 3D components
class SkillsOrbErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SkillsOrb Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-center p-8">
            <div className="text-slate-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">3D Visualization Unavailable</h3>
            <p className="text-slate-400 text-sm">
              The interactive 3D skills display couldn't load. Your skills are still amazing!
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {this.props.skills?.slice(0, 8).map((skill, index) => (
                <div
                  key={skill.id || index}
                  className="px-3 py-2 bg-slate-700 text-slate-300 text-sm rounded-lg text-center"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const SkillsOrbLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="loading-spinner mx-auto mb-4"></div>
      <p className="text-slate-400">Loading 3D Skills...</p>
    </div>
  </div>
);

const SkillOrb = ({ position = [0, 0, 0], skill = {}, color = '#00D4FF', onClick }) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
    } catch (error) {
      console.warn('SkillOrb animation error:', error);
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick && skill) {
      onClick(skill);
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} onClick={handleClick}>
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Text
          ref={textRef}
          position={[0, 0, 0.9]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          {skill.name || 'Skill'}
        </Text>
      </group>
    </Float>
  );
};

// Scene component that contains all the 3D elements and hooks
const SkillsScene = ({ skills = [], onSkillClick }) => {
  const groupRef = useRef();

  // Generate positions in a sphere formation
  const skillPositions = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    const positions = [];
    const radius = 8;

    skills.forEach((skill, index) => {
      try {
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        // Ensure valid numbers
        if (isFinite(x) && isFinite(y) && isFinite(z)) {
          positions.push([x, y, z]);
        } else {
          // Fallback position
          positions.push([
            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius
          ]);
        }
      } catch (error) {
        console.warn('Position calculation error for skill:', skill, error);
        // Fallback position
        positions.push([
          (Math.random() - 0.5) * radius,
          (Math.random() - 0.5) * radius,
          (Math.random() - 0.5) * radius
        ]);
      }
    });

    return positions;
  }, [skills]);

  useFrame((state) => {
    try {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.002;
      }
    } catch (error) {
      console.warn('Scene animation error:', error);
    }
  });

  const skillColors = [
    '#00D4FF', '#FF6B6B', '#4ECDC4', '#45B7D1',
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471'
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <group ref={groupRef}>
        {skills.map((skill, index) => (
          <SkillOrb
            key={skill.id || index}
            position={skillPositions[index]}
            skill={skill}
            color={skillColors[index % skillColors.length]}
            onClick={() => onSkillClick && onSkillClick(skill)}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={15}
        maxDistance={30}
      />
    </>
  );
};

// Main component that wraps the scene in Canvas
const SkillsOrb = ({ skills = [], onSkillClick }) => {
  // Don't render if no skills
  if (!skills || skills.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="text-center p-8">
          <p className="text-slate-400">No skills data available for 3D visualization.</p>
        </div>
      </div>
    );
  }

  return (
    <SkillsOrbErrorBoundary skills={skills}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SkillsScene skills={skills} onSkillClick={onSkillClick} />
        </Suspense>
      </Canvas>
    </SkillsOrbErrorBoundary>
  );
};

export default SkillsOrb;
