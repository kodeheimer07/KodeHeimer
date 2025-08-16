import { useRef, useEffect } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import { Link } from "react-router-dom"; // adjust if you use a different router

const RippleGrid = ({
  enableRainbow = false,
  gridColor = "#0000FF",
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
}) => {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const rafRef = useRef(null);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
    return result
      ? [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ]
      : [1, 1, 1];
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create renderer
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    // Canvas style to fully cover container
    const canvas = gl.canvas;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // append canvas (clear any previous children first)
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(canvas);

    // vertex + fragment (kept your shader, unchanged)
    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`;

    // uniforms
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: enableRainbow },
      gridColor: { value: hexToRgb(gridColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      fadeDistance: { value: fadeDistance },
      vignetteStrength: { value: vignetteStrength },
      glowIntensity: { value: glowIntensity },
      opacity: { value: opacity },
      gridRotation: { value: gridRotation },
      mouseInteraction: { value: mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: mouseInteractionRadius },
    };
    uniformsRef.current = uniforms;

    // Fullscreen geometry (Triangle helper covers viewport)
    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    // Resize helper - sets CSS size via renderer.setSize and shader iResolution as physical pixels
    const resize = () => {
      if (!containerRef.current || !rendererRef.current) return;

      const wCSS = containerRef.current.clientWidth || 1;
      const hCSS = containerRef.current.clientHeight || 1;
      const dpr = rendererRef.current.dpr || Math.min(window.devicePixelRatio || 1, 2);

      // set renderer CSS size (keeps canvas filling container)
      rendererRef.current.setSize(wCSS, hCSS);

      // physical pixels for shader math:
      const pxW = Math.max(1, Math.floor(wCSS * dpr));
      const pxH = Math.max(1, Math.floor(hCSS * dpr));

      // tell GL the viewport in pixels
      gl.viewport(0, 0, pxW, pxH);

      // shader expects pixel resolution
      uniforms.iResolution.value = [pxW, pxH];

      // update ray/mouse data if needed (not used here but kept structure)
    };

    // Mouse handlers
    const handleMouseMove = (e) => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // flipped Y as in shader
      targetMouseRef.current = { x, y };
    };
    const handleMouseEnter = () => { if (mouseInteraction) mouseInfluenceRef.current = 1.0; };
    const handleMouseLeave = () => { if (mouseInteraction) mouseInfluenceRef.current = 0.0; };

    window.addEventListener("resize", resize);
    if (mouseInteraction && containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Render loop (start AFTER resize to ensure correct iResolution & viewport)
    const render = (t) => {
      if (!uniformsRef.current) return;
      uniformsRef.current.iTime.value = t * 0.001;

      // smooth mouse position
      const lerpFactor = 0.1;
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;

      const currentInfluence = uniformsRef.current.mouseInfluence.value || 0;
      const targetInfluence = mouseInfluenceRef.current || 0;
      uniformsRef.current.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05;

      uniformsRef.current.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];

      try {
        rendererRef.current.render({ scene: meshRef.current });
      } catch (err) {
        // swallow occasional GL errors
        console.warn("render error", err);
      }
      rafRef.current = requestAnimationFrame(render);
    };

    // Ensure layout is ready, then resize + start rendering
    requestAnimationFrame(() => {
      resize();
      // start next frame to ensure viewport set
      rafRef.current = requestAnimationFrame(render);
    });

    // cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (mouseInteraction && containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        const lose = gl.getExtension("WEBGL_lose_context");
        lose?.loseContext();
      } catch (e) {
        // ignore
      }
      try {
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      } catch (e) {}
      rendererRef.current = null;
      uniformsRef.current = null;
      meshRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // update uniforms when props change
  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.enableRainbow.value = enableRainbow;
    uniformsRef.current.gridColor.value = hexToRgb(gridColor);
    uniformsRef.current.rippleIntensity.value = rippleIntensity;
    uniformsRef.current.gridSize.value = gridSize;
    uniformsRef.current.gridThickness.value = gridThickness;
    uniformsRef.current.fadeDistance.value = fadeDistance;
    uniformsRef.current.vignetteStrength.value = vignetteStrength;
    uniformsRef.current.glowIntensity.value = glowIntensity;
    uniformsRef.current.opacity.value = opacity;
    uniformsRef.current.gridRotation.value = gridRotation;
    uniformsRef.current.mouseInteraction.value = mouseInteraction;
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
    mouseInteraction,
    mouseInteractionRadius,
  ]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden [&_canvas]:block flex items-center">
    </div>
  );
};

export default RippleGrid;
