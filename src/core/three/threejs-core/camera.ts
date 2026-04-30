import * as THREE from "three";

export class CameraMange {
  public camera: THREE.PerspectiveCamera | null = null;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
  }

  setPosition(position: THREE.Vector3) {
    this.camera!.position.copy(position);
  }
}
