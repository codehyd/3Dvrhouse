import { IThreeCoreInitOptions } from "../types/IRenderType";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";

import { CameraMange } from "./camera";
import { RendererMange } from "./renderer";
import { SceneMange } from "./scene";

import { OrbitControlsMange } from "../threejs-controller/orbitControls.ts";

export class ThreejsCore {
  public id: string;

  private _sceneMange: SceneMange | null = null;
  public get sceneMange() {
    return this._sceneMange!;
  }

  private _cameraMange: CameraMange | null = null;
  public get cameraMange() {
    return this._cameraMange!;
  }

  private _rendererMange: RendererMange | null = null;
  public get rendererMange() {
    return this._rendererMange!;
  }

  private _orbitControlsMange: OrbitControlsMange | null = null;
  public get orbitControlsMange() {
    return this._orbitControlsMange!;
  }

  constructor(
    id: string,
    container: HTMLElement,
    options?: IThreeCoreInitOptions,
  ) {
    this.id = id;
    this.init(container, options);
  }

  private init(container: HTMLElement, options: IThreeCoreInitOptions = {}) {
    console.log("初始化 id =", this.id);

    this._sceneMange = new SceneMange();
    this._cameraMange = new CameraMange();

    const orbitControlsOptions = options.orbitControls;
    const isEnableOrbitControls = orbitControlsOptions?.enable || false;

    this._rendererMange = new RendererMange({
      scene: this._sceneMange.scene!,
      camera: this._cameraMange.camera!,
      dom: container,
      options: {
        render: () => {
          TWEEN.update();
        },
      },
    });

    if (isEnableOrbitControls) {
      const canvas = this._rendererMange.renderer?.domElement;
      if (!canvas) return;
      this._orbitControlsMange = new OrbitControlsMange(
        this._cameraMange.camera!,
        canvas,
      );

      if (orbitControlsOptions?.options) {
        const controlOptions = orbitControlsOptions.options;
        for (const key in controlOptions) {
          const value = (controlOptions as Record<string, unknown>)[key];
          if (value !== undefined) {
            this._orbitControlsMange.setAttr(key as keyof OrbitControls, value);
          }
        }
      }

      this._rendererMange.setOrbitControlsUpdate(() => {
        this._orbitControlsMange?.update();
      });
    }
  }

  public onWindowResize(): void {
    const currentDom = this._rendererMange?.renderer?.domElement.parentElement;
    if (currentDom && this._rendererMange && this._cameraMange) {
      const width = currentDom.clientWidth;
      const height = currentDom.clientHeight;

      this._rendererMange.renderer!.setSize(width, height);

      const targetAspect = width / height;
      const camera = this._cameraMange.camera!;

      camera.aspect = targetAspect;
      camera.updateProjectionMatrix();
    }
  }
}
