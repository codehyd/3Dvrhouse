import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

export type OrbitControlsAttrKey = keyof OrbitControls;

export class OrbitControlsMange {
  private orbitControls: OrbitControls | null = null;

  constructor(camera: THREE.Camera, canvas: HTMLCanvasElement) {
    this.orbitControls = new OrbitControls(camera, canvas);
  }

  update() {
    this.orbitControls?.update();
  }

  setAttr<K extends OrbitControlsAttrKey>(key: K, value: OrbitControls[K]) {
    if (!this.orbitControls) return;
    this.orbitControls[key] = value;
  }
}
