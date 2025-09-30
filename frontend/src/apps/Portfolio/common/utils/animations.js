import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced Animation Utilities
 * Cinema-quality animations for portfolio enhancement
 */

export class AdvancedAnimations {

  // Initialize GSAP timeline
  static createTimeline(options = {}) {
    return gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
      ...options
    });
  }

  // Magnetic cursor effect
  static magneticCursor(element, strength = 0.3) {
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Text reveal animation
  static textReveal(element, options = {}) {
    const {
      duration = 1,
      stagger = 0.1,
      direction = 'up',
      distance = 100
    } = options;

    const chars = element.textContent.split('');
    element.innerHTML = chars.map(char =>
      `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const spans = element.querySelectorAll('span');

    gsap.set(spans, {
      y: direction === 'up' ? distance : -distance,
      opacity: 0
    });

    return gsap.to(spans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "back.out(1.7)"
    });
  }

  // Morphing button animation
  static morphButton(button) {
    const tl = gsap.timeline({ paused: true });

    tl.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(button, {
      borderRadius: "50px",
      duration: 0.2,
      ease: "power2.inOut"
    }, 0)
    .to(button.querySelector('.button-text'), {
      x: 10,
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    button.addEventListener('mouseenter', () => tl.play());
    button.addEventListener('mouseleave', () => tl.reverse());

    return tl;
  }

  // Parallax scroll effect
  static parallaxScroll(elements, speeds = []) {
    elements.forEach((element, index) => {
      const speed = speeds[index] || 0.5;

      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  // Stagger fade in animation
  static staggerFadeIn(elements, options = {}) {
    const {
      duration = 0.8,
      stagger = 0.2,
      y = 50,
      delay = 0
    } = options;

    gsap.set(elements, { opacity: 0, y });

    return gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out"
    });
  }

  // Floating animation
  static floatingAnimation(element, options = {}) {
    const {
      duration = 3,
      yDistance = 20,
      rotation = 5,
      delay = 0
    } = options;

    return gsap.to(element, {
      y: yDistance,
      rotation,
      duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Page transition
  static pageTransition(incoming, outgoing) {
    const tl = gsap.timeline();

    if (outgoing) {
      tl.to(outgoing, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    tl.fromTo(incoming,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }
    );

    return tl;
  }

  // Scroll-triggered counter animation
  static animateCounter(element, endValue, options = {}) {
    const {
      duration = 2,
      startValue = 0,
      suffix = '',
      prefix = ''
    } = options;

    const obj = { value: startValue };

    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = prefix + Math.round(obj.value) + suffix;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // 3D card tilt effect
  static cardTilt(card, options = {}) {
    const {
      maxTilt = 15,
      perspective = 1000,
      scale = 1.05
    } = options;

    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = `${perspective}px`;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * maxTilt;
      const rotateY = (centerX - x) / centerX * maxTilt;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Reveal on scroll
  static revealOnScroll(elements, options = {}) {
    const {
      threshold = 0.1,
      rootMargin = '0px 0px -100px 0px'
    } = options;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.staggerFadeIn([entry.target]);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });

    elements.forEach(element => {
      gsap.set(element, { opacity: 0, y: 50 });
      observer.observe(element);
    });

    return observer;
  }
}

// Export individual animation functions for convenience
export const {
  createTimeline,
  magneticCursor,
  textReveal,
  morphButton,
  parallaxScroll,
  staggerFadeIn,
  floatingAnimation,
  pageTransition,
  animateCounter,
  cardTilt,
  revealOnScroll
} = AdvancedAnimations;
