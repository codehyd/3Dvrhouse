import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export interface IRenderOptions {
  render?: (renderer: THREE.WebGLRenderer) => void;
  orbitControlsUpdate?: () => void;
}

export interface IRenderType {
  scene: THREE.Scene;
  camera: THREE.Camera;
  dom: HTMLElement;
  options?: IRenderOptions;
}

export interface IOrbitControlsOptions {
  enable: boolean;
  options?: Partial<OrbitControls>;
}

export interface IThreeCoreInitOptions {
  orbitControls?: IOrbitControlsOptions;
}
