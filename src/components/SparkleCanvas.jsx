import React, { useEffect, useRef } from 'react';

export const SparkleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pre-render glowing sparkle sprites on offscreen canvases for 60+ FPS GPU blitting
    const colors = ['#f3d08a', '#e0a9af', '#ffffff', '#ffd700', '#fce8c3'];
    const sprites = colors.map((color) => {
      const spriteCanvas = document.createElement('canvas');
      const size = 32;
      spriteCanvas.width = size;
      spriteCanvas.height = size;
      const sCtx = spriteCanvas.getContext('2d');
      if (sCtx) {
        const center = size / 2;
        const grad = sCtx.createRadialGradient(center, center, 0, center, center, center);
        grad.addColorStop(0, color);
        grad.addColorStop(0.3, color);
        grad.addColorStop(0.7, color + '66');
        grad.addColorStop(1, 'transparent');

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        sCtx.arc(center, center, center, 0, Math.PI * 2);
        sCtx.fill();
      }
      return spriteCanvas;
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // 35 particles for smooth luxury ambiance without CPU overhead
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: (Math.random() * 0.01 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      sprite: sprites[Math.floor(Math.random() * sprites.length)]
    }));

    let lastTime = performance.now();

    const render = (now) => {
      const delta = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y += p.speedY * delta;
        p.x += p.speedX * delta;
        p.opacity += p.fadeSpeed * delta;

        if (p.opacity > 0.95 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -p.size) {
          p.y = height + p.size;
          p.x = Math.random() * width;
        } else if (p.x < -p.size) {
          p.x = width + p.size;
        } else if (p.x > width + p.size) {
          p.x = -p.size;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    />
  );
};
