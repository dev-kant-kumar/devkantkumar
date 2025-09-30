import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerComponent = ({
  children,
  animation = 'fadeInUp',
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  markers = false,
  onEnter,
  onLeave,
  className = ''
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationProps = {};

    // Define animation presets
    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 50 });
        animationProps = { opacity: 1, y: 0, duration: 1, ease: 'power2.out' };
        break;
      case 'fadeInDown':
        gsap.set(element, { opacity: 0, y: -50 });
        animationProps = { opacity: 1, y: 0, duration: 1, ease: 'power2.out' };
        break;
      case 'fadeInLeft':
        gsap.set(element, { opacity: 0, x: -50 });
        animationProps = { opacity: 1, x: 0, duration: 1, ease: 'power2.out' };
        break;
      case 'fadeInRight':
        gsap.set(element, { opacity: 0, x: 50 });
        animationProps = { opacity: 1, x: 0, duration: 1, ease: 'power2.out' };
        break;
      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animationProps = { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' };
        break;
      case 'rotateIn':
        gsap.set(element, { opacity: 0, rotation: 180 });
        animationProps = { opacity: 1, rotation: 0, duration: 1, ease: 'power2.out' };
        break;
      case 'slideInUp':
        gsap.set(element, { y: 100 });
        animationProps = { y: 0, duration: 1, ease: 'power3.out' };
        break;
      case 'parallax':
        animationProps = { y: -100, ease: 'none' };
        break;
      default:
        gsap.set(element, { opacity: 0 });
        animationProps = { opacity: 1, duration: 1 };
    }

    const scrollTriggerConfig = {
      trigger: trigger || element,
      start,
      end,
      scrub,
      pin,
      markers,
      onEnter: () => {
        if (!scrub) {
          gsap.to(element, animationProps);
        }
        onEnter && onEnter();
      },
      onLeave: () => {
        onLeave && onLeave();
      },
      onEnterBack: () => {
        if (!scrub) {
          gsap.to(element, animationProps);
        }
      },
      onLeaveBack: () => {
        if (!scrub) {
          gsap.set(element, {
            opacity: animation.includes('fade') ? 0 : 1,
            y: animation.includes('Up') ? 50 : animation.includes('Down') ? -50 : 0,
            x: animation.includes('Left') ? -50 : animation.includes('Right') ? 50 : 0,
            scale: animation === 'scaleIn' ? 0.8 : 1,
            rotation: animation === 'rotateIn' ? 180 : 0
          });
        }
      }
    };

    if (scrub) {
      scrollTriggerConfig.animation = gsap.to(element, {
        ...animationProps,
        paused: true
      });
    }

    ScrollTrigger.create(scrollTriggerConfig);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.trigger === trigger) {
          trigger.kill();
        }
      });
    };
  }, [animation, trigger, start, end, scrub, pin, markers, onEnter, onLeave]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollTriggerComponent;
