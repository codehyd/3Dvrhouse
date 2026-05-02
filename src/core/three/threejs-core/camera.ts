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

  // 获取相机位置
  getPosition() {
    return this.camera!.position;
  }

  // 设置相机位置
  setPosition(position: { x: number; y: number; z: number }) {
    const vector3 = new THREE.Vector3(position.x, position.y, position.z);
    this.camera!.position.copy(vector3);
  }
}
