import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursor, {
        x: x - 20,
        y: y - 20,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: x - 4,
        y: y - 4,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Mouse enter handler for interactive elements
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Mouse leave handler for interactive elements
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default MagneticCursor;
