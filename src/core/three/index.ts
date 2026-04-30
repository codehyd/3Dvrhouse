import { ThreejsCore } from "./threejs-core";
import { IThreeCoreInitOptions } from "./types/IRenderType";

/**
 * Threejs 应用类
 *
 */

export class ThreeJsApp {
  private static instance: ThreeJsApp;
  private constructor() {} // 禁止外部 new

  // 内部 Map：存放 多个 ThreejsCore 单例（key 随便命名区分）
  private readonly threeAppMap = new Map<string, ThreejsCore>();

  public static getInstance(): ThreeJsApp {
    if (!this.instance) this.instance = new ThreeJsApp();
    return this.instance;
  }

  // 存入 ThreejsCore 单例
  public setThreeApp(key: string, a: ThreejsCore) {
    this.threeAppMap.set(key, a);
  }

  // 获取 ThreejsCore 单例
  public getThreeApp(key: string): ThreejsCore | undefined {
    return this.threeAppMap.get(key);
  }

  /**
   * 根据 id 获取或自动创建实例（自动传参）
   */
  public getOrCreateCore(
    id: string,
    container: HTMLElement,
    options?: IThreeCoreInitOptions,
  ): ThreejsCore {
    // 已有直接返回
    if (this.threeAppMap.has(id)) {
      return this.threeAppMap.get(id)!;
    }
    // 没有就 new 一个，把 id 传进去
    const core = new ThreejsCore(id, container, options);
    this.threeAppMap.set(id, core);
    return core;
  }

  // 删除某个id实例
  public removeCore(id: string) {
    this.threeAppMap.delete(id);
  }

  // 销毁某个id实例的资源
  public destroyCore(id: string) {
    const core = this.getThreeApp(id);
    if (core) {
      core.rendererMange!.destroy();
      this.removeCore(id);
    }
  }
}
