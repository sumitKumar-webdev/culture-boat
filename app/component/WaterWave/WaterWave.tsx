"use client";

import { useEffect, useRef } from "react";
import {
  Application,
  DisplacementFilter,
  Sprite,
  Texture,
  TilingSprite,
} from "pixi.js";

export default function WaterWave() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) return;

    const app = new Application();
    let disposed = false;
    let onMotionChange: ((event: MediaQueryListEvent) => void) | null = null;
    let onResize: (() => void) | null = null;
    let onTick: ((delta: number) => void) | null = null;

    const init = async () => {
      await app.init({
        backgroundAlpha: 0,
        resizeTo: window,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
      });

      if (disposed) {
        app.destroy(true);
        return;
      }

      const view = app.canvas as HTMLCanvasElement;
      view.className = "water-wave-canvas";
      host.appendChild(view);

      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 256;
      noiseCanvas.height = 256;
      const ctx = noiseCanvas.getContext("2d");
      if (!ctx) {
        app.destroy(true);
        return;
      }

      const noiseImage = ctx.createImageData(256, 256);
      for (let i = 0; i < noiseImage.data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        noiseImage.data[i] = value;
        noiseImage.data[i + 1] = value;
        noiseImage.data[i + 2] = value;
        noiseImage.data[i + 3] = 255;
      }
      ctx.putImageData(noiseImage, 0, 0);

      const causticsCanvas = document.createElement("canvas");
      causticsCanvas.width = noiseCanvas.width;
      causticsCanvas.height = noiseCanvas.height;
      const causticsCtx = causticsCanvas.getContext("2d");
      if (!causticsCtx) {
        app.destroy(true);
        return;
      }

      causticsCtx.filter = "blur(10px)";
      causticsCtx.drawImage(noiseCanvas, 0, 0);

      const noiseTexture = Texture.from(noiseCanvas);
      const causticsTexture = Texture.from(causticsCanvas);

      // Must be Sprite, not TilingSprite
      const displacementSprite = Sprite.from(noiseTexture);
      displacementSprite.visible = false;
      displacementSprite.width = app.screen.width;
      displacementSprite.height = app.screen.height;
      app.stage.addChild(displacementSprite);

      const displacementFilter = new DisplacementFilter({
        sprite: displacementSprite,
        scale: { x: 28, y: 22 },
      });

      const overlay = new TilingSprite({
        texture: causticsTexture,
        width: app.screen.width,
        height: app.screen.height,
      });

      overlay.tint = 0xcfe6ff;
      overlay.alpha = 0.32;
      overlay.blendMode = "screen";
      overlay.tileScale.set(1.4, 1.4);
      overlay.filters = [displacementFilter];
      app.stage.addChild(overlay);

      onResize = () => {
        displacementSprite.width = app.screen.width;
        displacementSprite.height = app.screen.height;
        overlay.width = app.screen.width;
        overlay.height = app.screen.height;
      };

      onMotionChange = () => {
        if (prefersReducedMotion.matches) {
          app.ticker.stop();
        } else {
          app.ticker.start();
        }
      };

      prefersReducedMotion.addEventListener("change", onMotionChange);
      app.renderer.on("resize", onResize);

      onTick = (delta) => {
        // move the displacement map itself
        displacementSprite.x += 0.45 * delta;
        displacementSprite.y += 0.65 * delta;

        // move the visible caustics texture
        overlay.tilePosition.x -= 0.15 * delta;
        overlay.tilePosition.y += 0.1 * delta;
      };

      app.ticker.add(onTick);
    };

    init();

    return () => {
      disposed = true;
      if (onMotionChange) {
        prefersReducedMotion.removeEventListener("change", onMotionChange);
      }
      if (onResize && app.renderer) {
        app.renderer.off("resize", onResize);
      }
      if (onTick) {
        app.ticker.remove(onTick);
      }
      app.destroy(true);
      host.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} className="water-wave-layer" aria-hidden="true" />;
}      overlay.filters = [displacementFilter];
      app.stage.addChild(overlay);

      onResize = () => {
        displacementSprite.width = app.screen.width;
        displacementSprite.height = app.screen.height;
        overlay.width = app.screen.width;
        overlay.height = app.screen.height;
      };

      onMotionChange = () => {
        if (prefersReducedMotion.matches) {
          app.ticker.stop();
        } else {
          app.ticker.start();
        }
      };

      prefersReducedMotion.addEventListener("change", onMotionChange);
      app.renderer.on("resize", onResize);

      onTick = (delta) => {
        displacementSprite.tilePosition.x += 0.45 * delta;
        displacementSprite.tilePosition.y += 0.65 * delta;
        overlay.tilePosition.x -= 0.15 * delta;
        overlay.tilePosition.y += 0.1 * delta;
      };
      app.ticker.add(onTick);
    };

    init();

    return () => {
      disposed = true;
      if (onMotionChange) {
        prefersReducedMotion.removeEventListener("change", onMotionChange);
      }
      if (onResize && app.renderer) {
        app.renderer.off("resize", onResize);
      }
      if (onTick) {
        app.ticker.remove(onTick);
      }
      app.destroy(true);
      host.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} className="water-wave-layer" aria-hidden="true" />;
}
