"use client";

import { useEffect, useRef } from "react";

const BACKGROUND_WIDTH = 1600;
const BACKGROUND_HEIGHT = 900;
const DISPLACEMENT_SIZE = 320;

const createWaterBackground = () => {
  const canvas = document.createElement("canvas");
  canvas.width = BACKGROUND_WIDTH;
  canvas.height = BACKGROUND_HEIGHT;

  const context = canvas.getContext("2d");

  if (!context) {
    return canvas;
  }

  const baseGradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  baseGradient.addColorStop(0, "#100d0b");
  baseGradient.addColorStop(0.45, "#3a2a21");
  baseGradient.addColorStop(1, "#0b0b0b");
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(
    canvas.width * 0.52,
    canvas.height * 0.48,
    60,
    canvas.width * 0.52,
    canvas.height * 0.48,
    canvas.width * 0.65,
  );
  glow.addColorStop(0, "rgba(248, 231, 199, 0.32)");
  glow.addColorStop(0.4, "rgba(205, 166, 111, 0.18)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 18; index += 1) {
    const x = ((index * 97) % canvas.width) + (index % 3) * 48;
    const y = (canvas.height / 18) * index;
    const width = 280 + (index % 5) * 90;
    const height = 30 + (index % 4) * 10;

    const highlight = context.createLinearGradient(x, y, x + width, y + height);
    highlight.addColorStop(0, "rgba(255, 244, 220, 0)");
    highlight.addColorStop(0.5, "rgba(255, 244, 220, 0.16)");
    highlight.addColorStop(1, "rgba(255, 244, 220, 0)");

    context.save();
    context.translate(x, y);
    context.rotate((-10 + index) * (Math.PI / 180));
    context.fillStyle = highlight;
    context.fillRect(-width / 2, -height / 2, width, height);
    context.restore();
  }

  return canvas;
};

const createDisplacementMap = () => {
  const canvas = document.createElement("canvas");
  canvas.width = DISPLACEMENT_SIZE;
  canvas.height = DISPLACEMENT_SIZE;

  const context = canvas.getContext("2d");

  if (!context) {
    return canvas;
  }

  const imageData = context.createImageData(DISPLACEMENT_SIZE, DISPLACEMENT_SIZE);

  for (let y = 0; y < DISPLACEMENT_SIZE; y += 1) {
    for (let x = 0; x < DISPLACEMENT_SIZE; x += 1) {
      const index = (y * DISPLACEMENT_SIZE + x) * 4;
      const nx = x / DISPLACEMENT_SIZE;
      const ny = y / DISPLACEMENT_SIZE;

      const waveA =
        Math.sin(nx * Math.PI * 6.5) +
        Math.cos(ny * Math.PI * 7.25) +
        Math.sin((nx + ny) * Math.PI * 4.5);
      const waveB =
        Math.cos(nx * Math.PI * 8.25 - ny * Math.PI * 3.75) +
        Math.sin((ny - nx) * Math.PI * 5.5);

      imageData.data[index] = 128 + waveA * 18;
      imageData.data[index + 1] = 128 + waveB * 18;
      imageData.data[index + 2] = 190;
      imageData.data[index + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
};

export default function WaterRippleBackground() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host || typeof window === "undefined") {
      return;
    }

    let isCancelled = false;
    let pixiApp: import("pixi.js").Application | null = null;
    let removeResizeListener: (() => void) | null = null;

    const setup = async () => {
      const pixi = await import("pixi.js");

      if (isCancelled || !hostRef.current) {
        return;
      }

      const app = new pixi.Application();
      await app.init({
        resizeTo: window,
        autoDensity: true,
        antialias: true,
        backgroundAlpha: 0,
        preference: "webgl",
      });

      if (isCancelled || !hostRef.current) {
        app.destroy(true, {
          children: true,
          texture: true,
          textureSource: true,
        });
        return;
      }

      pixiApp = app;

      app.canvas.style.width = "100%";
      app.canvas.style.height = "100%";
      app.canvas.style.display = "block";
      app.canvas.style.transform = "scale(1.02)";
      app.canvas.style.transformOrigin = "center";
      app.canvas.style.filter = "brightness(0.82) contrast(1.08) saturate(0.92)";

      hostRef.current.appendChild(app.canvas);

      const scene = new pixi.Container();
      const backgroundTexture = pixi.Texture.from(createWaterBackground());
      const backgroundSprite = new pixi.Sprite(backgroundTexture);
      scene.addChild(backgroundSprite);
      app.stage.addChild(scene);

      const displacementTexture = pixi.Texture.from(createDisplacementMap());
      displacementTexture.source.addressMode = "repeat";

      const displacementSprite = new pixi.Sprite(displacementTexture);
      displacementSprite.alpha = 0;
      displacementSprite.scale.set(3.6, 3.6);
      app.stage.addChild(displacementSprite);

      const displacementFilter = new pixi.DisplacementFilter({
        sprite: displacementSprite,
        scale: { x: 28, y: 18 },
      });
      scene.filters = [displacementFilter];

      const syncBackgroundSize = () => {
        backgroundSprite.width = window.innerWidth;
        backgroundSprite.height = window.innerHeight;
      };

      syncBackgroundSize();
      window.addEventListener("resize", syncBackgroundSize);
      removeResizeListener = () => {
        window.removeEventListener("resize", syncBackgroundSize);
      };

      const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const animate = !reduceMotionQuery.matches;

      if (animate) {
        app.ticker.add((ticker) => {
          displacementSprite.x += 0.35 * ticker.deltaTime;
          displacementSprite.y += 0.16 * ticker.deltaTime;

          const elapsed = ticker.lastTime * 0.001;
          displacementFilter.scale.x = 24 + Math.sin(elapsed * 0.7) * 6;
          displacementFilter.scale.y = 15 + Math.cos(elapsed * 0.55) * 4;
        });
      }
    };

    void setup();

    return () => {
      isCancelled = true;
      removeResizeListener?.();

      if (pixiApp) {
        pixiApp.destroy(true, {
          children: true,
          texture: true,
          textureSource: true,
        });
      }
    };
  }, []);

  return <div ref={hostRef} className="app-water-bg" aria-hidden="true" />;
}
