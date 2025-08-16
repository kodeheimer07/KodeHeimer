import {useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
}) => {
  const ref = useRef(null);

  const [animationAxis, setAnimationAxis] = useState("vertical"); // "x" or "y"

  // Detect direction dynamically
  useEffect(() => {
    const updateDirection = () => {
      const isRow = window.innerWidth > 768; // adjust breakpoint
      setAnimationAxis(isRow ? "horizontal" : "vertical");
    };

    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => window.removeEventListener("resize", updateDirection);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = animationAxis === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
        horizontal: animationAxis === "x" ? offset : 0,
        vertical: animationAxis === "y" ? offset : 0,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
    });

    gsap.to(el, {
      [animationAxis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        toggleActions: "play reverse play reverse",
        //once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    animationAxis,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
  ]);

  return (

    <div style={{ display: "inline-block" }}>
        <div ref={ref}>
            {children}    
        </div>
    </div>
    
  )
};

export default AnimatedContent;
