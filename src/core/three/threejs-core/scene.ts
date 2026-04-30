import * as THREE from "three";

export class SceneMange {
  public scene: THREE.Scene | null = null;

  constructor() {
    this.scene = new THREE.Scene();

    // 对场景Children做处理
    const group = new THREE.Group();
    this.scene!.add(group);
  }

  getSceneChildren() {
    return (this.scene!.children[0] as THREE.Group).children;
  }

  // 新增场景子元素
  addSceneChild(child: THREE.Object3D) {
    (this.scene!.children[0] as THREE.Group).add(child);
  }
}
