"use client";

import React, { useEffect, useRef, useState } from "react";

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface RadarBlip {
  angle: number;
  dist: number;
  size: number;
  alpha: number;
  speed: number;
}

export default function BlueParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    // Accessibility check: disable if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Target (actual mouse) and smooth lerp coordinates
    let targetX = -500;
    let targetY = -500;
    let currX = -500;
    let currY = -500;

    let isVisible = false;
    let isHovering = false;
    const clickPulses: PulseRing[] = [];

    // Continuous rotation angles for concentric mechanical rings
    let rotTickDial = 0;
    let rotArcRing = 0;
    let flarePos = 0; // Orbital angle of the cyan light glint

    // Ambient floating tactical blips (matching reference image upper right)
    const radarBlips: RadarBlip[] = [
      { angle: 0.72, dist: 44, size: 2.2, alpha: 0.9, speed: 0.003 },
      { angle: 0.98, dist: 52, size: 1.6, alpha: 0.7, speed: 0.0025 },
      { angle: 1.18, dist: 60, size: 2.6, alpha: 0.95, speed: 0.002 },
      { angle: 3.85, dist: 48, size: 1.8, alpha: 0.55, speed: -0.002 },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible || currX < -100) {
        currX = targetX;
        currY = targetY;
        isVisible = true;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isVisible = false;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      currX = targetX;
      currY = targetY;
      isVisible = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest(".interactive-hover") ||
        target?.closest("[role='button']") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Trigger kinetic radar pulse expanding outward
      clickPulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 12,
        maxRadius: 55,
        alpha: 0.95,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 60FPS Tactical HUD Canvas Renderer
    const render = () => {
      // Safe high-DPI transform & clear
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Do not render tactical HUD reticle over open modals or mobile drawers
      if (typeof document !== "undefined" && document.body.style.overflow === "hidden") {
        animId = requestAnimationFrame(render);
        return;
      }

      if (isVisible && targetX >= 0 && targetY >= 0) {
        // High-precision smooth follow (spring lerp)
        const lerpFactor = isHovering ? 0.3 : 0.22;
        currX += (targetX - currX) * lerpFactor;
        currY += (targetY - currY) * lerpFactor;

        // Rotations update
        const spinSpeed = isHovering ? 0.024 : 0.009;
        rotTickDial += spinSpeed;
        rotArcRing -= spinSpeed * 0.75;
        flarePos += spinSpeed * 1.6;

        ctx.save();
        ctx.translate(currX, currY);

        // Reticle size scales slightly on hover lock-on (compact tactical scale)
        const baseScale = isHovering ? 0.84 : 0.72;
        ctx.scale(baseScale, baseScale);

        // =========================================================================
        // 1. Central Ambient Luminous Halo Core (Exact matching reference image)
        // =========================================================================
        const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 24);
        coreGlow.addColorStop(0, "rgba(0, 229, 255, 0.45)");
        coreGlow.addColorStop(0.35, "rgba(56, 189, 248, 0.25)");
        coreGlow.addColorStop(0.7, "rgba(2, 132, 199, 0.08)");
        coreGlow.addColorStop(1, "rgba(2, 132, 199, 0)");

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();

        // Central Precision Target Dot
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 8;
        ctx.fillStyle = isHovering ? "#ffffff" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(0, 0, 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Inner Concentric Soft Target Circle
        ctx.shadowBlur = 4;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
        ctx.stroke();

        // =========================================================================
        // 2. Four Directional Target Chevrons (▲ ▼ ◄ ► pointing to center)
        // =========================================================================
        ctx.fillStyle = isHovering ? "#00e5ff" : "#38bdf8";
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 6;

        const chevronDist = 12.5;
        const cSize = 3.0;

        // Top chevron (pointing down)
        ctx.beginPath();
        ctx.moveTo(0, -chevronDist);
        ctx.lineTo(-cSize, -chevronDist - cSize * 1.3);
        ctx.lineTo(cSize, -chevronDist - cSize * 1.3);
        ctx.closePath();
        ctx.fill();

        // Bottom chevron (pointing up)
        ctx.beginPath();
        ctx.moveTo(0, chevronDist);
        ctx.lineTo(-cSize, chevronDist + cSize * 1.3);
        ctx.lineTo(cSize, chevronDist + cSize * 1.3);
        ctx.closePath();
        ctx.fill();

        // Left chevron (pointing right)
        ctx.beginPath();
        ctx.moveTo(-chevronDist, 0);
        ctx.lineTo(-chevronDist - cSize * 1.3, -cSize);
        ctx.lineTo(-chevronDist - cSize * 1.3, cSize);
        ctx.closePath();
        ctx.fill();

        // Right chevron (pointing left)
        ctx.beginPath();
        ctx.moveTo(chevronDist, 0);
        ctx.lineTo(chevronDist + cSize * 1.3, -cSize);
        ctx.lineTo(chevronDist + cSize * 1.3, cSize);
        ctx.closePath();
        ctx.fill();

        // =========================================================================
        // 3. Rotating Compass Dial Ring with Radial Hash Ticks (|||||||||)
        // =========================================================================
        ctx.save();
        ctx.rotate(rotTickDial);
        ctx.strokeStyle = isHovering ? "rgba(0, 229, 255, 0.95)" : "rgba(126, 200, 255, 0.75)";
        ctx.lineWidth = 1.0;
        ctx.shadowBlur = 5;

        const tickRadius = 20;
        const numTicks = 36;
        for (let i = 0; i < numTicks; i++) {
          const tAngle = (i * Math.PI * 2) / numTicks;
          const isMajor = i % 9 === 0;
          const tickLen = isMajor ? 4.0 : 2.4;

          const x1 = Math.cos(tAngle) * tickRadius;
          const y1 = Math.sin(tAngle) * tickRadius;
          const x2 = Math.cos(tAngle) * (tickRadius + tickLen);
          const y2 = Math.sin(tAngle) * (tickRadius + tickLen);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();

        // =========================================================================
        // 4. Segmented Arc Ring with Luminous Orbital Light Flare (Reference Image)
        // =========================================================================
        ctx.save();
        ctx.rotate(rotArcRing);
        const arcRadius = 28;
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 9;

        // 3 Segmented Arcs with clean gaps
        const arcSegments = [
          { start: 0.15, end: 1.85 },
          { start: 2.25, end: 3.95 },
          { start: 4.35, end: 6.05 },
        ];

        arcSegments.forEach((seg) => {
          ctx.beginPath();
          ctx.arc(0, 0, arcRadius, seg.start, seg.end);
          ctx.stroke();
        });

        // Kinetic Bright Cyan Lens Flare orbiting along the arc
        const flareX = Math.cos(flarePos) * arcRadius;
        const flareY = Math.sin(flarePos) * arcRadius;

        // Intense core glare
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(flareX, flareY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing cyan bloom
        ctx.fillStyle = "rgba(0, 229, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(flareX, flareY, 5.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // =========================================================================
        // 5. Outer Thin Targeting Boundary & Military Crosshairs with Hash Marks
        // =========================================================================
        const outerRadius = 38;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = 1.0;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#38bdf8";

        // Outer Ring Boundary
        ctx.beginPath();
        ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Extended Tactical Crosshairs (Matching reference image: T-marks & hash lines)
        ctx.strokeStyle = isHovering ? "#00e5ff" : "rgba(126, 200, 255, 0.9)";
        ctx.lineWidth = 1.3;

        const crossStart = outerRadius;
        const crossEnd = outerRadius + 16;

        // Top Vertical Axis with "T" Bar Mark (Reference Image Top)
        ctx.beginPath();
        ctx.moveTo(0, -crossStart);
        ctx.lineTo(0, -crossEnd);
        ctx.moveTo(-5, -crossEnd + 4); // Horizontal T bar
        ctx.lineTo(5, -crossEnd + 4);
        ctx.stroke();

        // Bottom Vertical Axis with "T" Bar Mark (Reference Image Bottom)
        ctx.beginPath();
        ctx.moveTo(0, crossStart);
        ctx.lineTo(0, crossEnd);
        ctx.moveTo(-5, crossEnd - 4);
        ctx.lineTo(5, crossEnd - 4);
        ctx.stroke();

        // Left Horizontal Axis with 3 Hash Measurement Marks (Reference Image Left)
        ctx.beginPath();
        ctx.moveTo(-crossStart, 0);
        ctx.lineTo(-crossEnd - 5, 0);
        // Measurement tick marks
        ctx.moveTo(-crossStart - 4, -3.5); ctx.lineTo(-crossStart - 4, 3.5);
        ctx.moveTo(-crossStart - 10, -3.5); ctx.lineTo(-crossStart - 10, 3.5);
        ctx.moveTo(-crossStart - 16, -3.5); ctx.lineTo(-crossStart - 16, 3.5);
        ctx.stroke();

        // Right Horizontal Axis with 3 Hash Measurement Marks (Reference Image Right)
        ctx.beginPath();
        ctx.moveTo(crossStart, 0);
        ctx.lineTo(crossEnd + 5, 0);
        // Measurement tick marks
        ctx.moveTo(crossStart + 4, -3.5); ctx.lineTo(crossStart + 4, 3.5);
        ctx.moveTo(crossStart + 10, -3.5); ctx.lineTo(crossStart + 10, 3.5);
        ctx.moveTo(crossStart + 16, -3.5); ctx.lineTo(crossStart + 16, 3.5);
        ctx.stroke();

        // =========================================================================
        // 6. Ambient Floating Radar Blips (Upper Right in Reference Image)
        // =========================================================================
        radarBlips.forEach((blip) => {
          blip.angle += blip.speed;
          const bx = Math.cos(blip.angle) * blip.dist;
          const by = Math.sin(blip.angle) * blip.dist;

          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00e5ff";
          ctx.fillStyle = `rgba(126, 200, 255, ${blip.alpha})`;
          ctx.beginPath();
          ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      // =========================================================================
      // 7. Click Kinetic Ripple Waves
      // =========================================================================
      for (let i = clickPulses.length - 1; i >= 0; i--) {
        const pulse = clickPulses[i];
        pulse.radius += (pulse.maxRadius - pulse.radius) * 0.12 + 0.8;
        pulse.alpha -= 0.035;

        if (pulse.alpha <= 0.01 || pulse.radius >= pulse.maxRadius) {
          clickPulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(0, 229, 255, ${pulse.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore(); // Restore root canvas frame transform
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      id="tactical-hud-cursor-canvas"
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
}
