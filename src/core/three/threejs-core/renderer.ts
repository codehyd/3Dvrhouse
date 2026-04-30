import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { IRenderType } from "../types/IRenderType";

export class RendererMange {
  public renderer: THREE.WebGLRenderer | null = null;

  private orbitControlsUpdateCallback: (() => void) | undefined;

  constructor(randerOptions: IRenderType) {
    if (!randerOptions) {
      throw new Error("options 不能为空");
    }

    const { scene, camera, dom, options } = randerOptions;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(dom.clientWidth, dom.clientHeight);
    this.renderer.setClearColor(0x000000, 1);

    dom.appendChild(this.renderer.domElement);

    this.orbitControlsUpdateCallback = options?.orbitControlsUpdate;

    this.renderAnimationFrame(scene, camera, options?.render);
  }

  public setOrbitControlsUpdate(callback: () => void) {
    this.orbitControlsUpdateCallback = callback;
  }

  public renderAnimationFrame(
    scene: THREE.Scene,
    camera: THREE.Camera,
    callback?: (renderer: THREE.WebGLRenderer) => void,
  ) {
    const animate = () => {
      requestAnimationFrame(animate);

      try {
        TWEEN.update();
      } catch (e) {
        console.error("TWEEN.update error:", e);
      }

      try {
        this.orbitControlsUpdateCallback?.();
      } catch (e) {
        console.error("orbitControlsUpdate error:", e);
      }

      try {
        callback?.(this.renderer!);
      } catch (e) {
        console.error("render callback error:", e);
      }

      try {
        this.renderer?.render(scene, camera);
      } catch (e) {
        console.error("render error:", e);
      }
    };

    animate();
  }

  public destroy() {
    if (this.renderer) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}