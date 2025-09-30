import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Note: SplitText is a premium GSAP plugin. For production, you'll need a license.
// Alternative: We'll create a simple text splitting function

const splitTextIntoSpans = (text) => {
  return text.split('').map((char, index) => (
    <span key={index} className="inline-block" style={{ opacity: 0 }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const TextReveal = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  stagger = 0.05,
  trigger = 'onMount',
  className = '',
  as: Component = 'div'
}) => {
  const textRef = useRef(null);
  const isRevealed = useRef(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element || isRevealed.current) return;

    const chars = element.querySelectorAll('span');

    if (chars.length === 0) return;

    let animationProps = {};
    let fromProps = {};

    switch (animation) {
      case 'fadeInUp':
        fromProps = { opacity: 0, y: 50 };
        animationProps = { opacity: 1, y: 0 };
        break;
      case 'fadeInDown':
        fromProps = { opacity: 0, y: -50 };
        animationProps = { opacity: 1, y: 0 };
        break;
      case 'fadeInLeft':
        fromProps = { opacity: 0, x: -30 };
        animationProps = { opacity: 1, x: 0 };
        break;
      case 'fadeInRight':
        fromProps = { opacity: 0, x: 30 };
        animationProps = { opacity: 1, x: 0 };
        break;
      case 'scaleIn':
        fromProps = { opacity: 0, scale: 0 };
        animationProps = { opacity: 1, scale: 1 };
        break;
      case 'rotateIn':
        fromProps = { opacity: 0, rotationY: 90 };
        animationProps = { opacity: 1, rotationY: 0 };
        break;
      case 'typewriter':
        fromProps = { opacity: 0, width: 0 };
        animationProps = { opacity: 1, width: 'auto' };
        break;
      default:
        fromProps = { opacity: 0 };
        animationProps = { opacity: 1 };
    }

    // Set initial state
    gsap.set(chars, fromProps);

    const timeline = gsap.timeline({ delay });

    timeline.to(chars, {
      ...animationProps,
      duration,
      stagger,
      ease: 'power2.out'
    });

    if (trigger === 'onMount') {
      timeline.play();
    }

    isRevealed.current = true;

    return () => {
      timeline.kill();
    };
  }, [animation, delay, duration, stagger, trigger]);

  const renderContent = () => {
    if (typeof children === 'string') {
      return splitTextIntoSpans(children);
    }
    return children;
  };

  return (
    <Component ref={textRef} className={className}>
      {renderContent()}
    </Component>
  );
};

export default TextReveal;
