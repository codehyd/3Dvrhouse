import * as THREE from "three";
import { ThreejsCore } from ".";

export class RaycasterMange {
  private threeCore: ThreejsCore;

  constructor(threeCore: ThreejsCore) {
    this.threeCore = threeCore;
  }

  private get camera() {
    return this.threeCore.cameraMange.camera!;
  }
  private get sceneMange() {
    return this.threeCore.sceneMange!;
  }

  public intersectObjects(
    event: PointerEvent,
    objects: THREE.Object3D[] = [],
  ) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 获取当前物体在屏幕坐标的坐标位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    const intersect =
      objects.length == 0 ? this.sceneMange.getSceneChildren() : objects;
    return raycaster.intersectObjects(intersect, true);
  }
}
