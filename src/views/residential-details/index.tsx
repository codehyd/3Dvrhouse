import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import * as THREE from "three";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";

import { ThreeJsApp } from "@/core/three";
import { ThreejsCore } from "@/core/three/threejs-core";

import { livingDetail } from "./config/";
import { ILivingStatusType } from "./types";
import { Spin } from "antd";

function ResidentialDetails() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const threeCoreRef = useRef<ThreejsCore | null>(null);

  const [loading, setLoading] = useState(true);

  const [, setRibbon] = useState<ILivingStatusType>("drawingRoom");

  // 预加载房间资源
  const preloadRoom = useCallback(async (currentRibbon: ILivingStatusType) => {
    const findLiving = livingDetail.find(
      (item) => item.id === threeCoreRef.current!.id,
    );
    const findMarker = livingDetail.find(
      (item) => item.id === threeCoreRef.current!.id,
    );

    if (!findLiving || !findMarker) return;

    const textureLoader = new THREE.TextureLoader();

    const materialPromises = findLiving.material[currentRibbon].map((item) => {
      return new Promise<THREE.Material>((res) => {
        textureLoader.load(item, (texture) => {
          texture.magFilter = THREE.LinearFilter;
          texture.minFilter = THREE.LinearFilter;
          res(new THREE.MeshBasicMaterial({ map: texture }));
        });
      });
    });

    const markerPromises = findMarker.marker[currentRibbon].map((item) => {
      return new Promise<THREE.Sprite>((res) => {
        textureLoader.load(item.icon, (texture) => {
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.copy(item.position);
          sprite.scale.set(item.scale, item.scale, item.scale);
          sprite.userData = {
            id: item.name,
            marker: true,
            materialName: item.materialName,
            position: item.position,
          };
          res(sprite);
        });
      });
    });

    const [materials, sprites] = await Promise.all([
      Promise.all(materialPromises),
      Promise.all(markerPromises),
    ]);

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.geometry.scale(10, 10, -10);
    mesh.userData = { id: findLiving.id, roomType: currentRibbon };

    return { mesh, sprites };
  }, []);

  // 清除场景中标记点
  const clearMarker = useCallback(() => {
    const markers = threeCoreRef.current?.sceneMange
      .getSceneChildren()
      .filter((item) => item.userData.marker);
    if (markers && markers.length > 0) {
      markers.forEach((item) => {
        threeCoreRef.current?.sceneMange.removeSceneChild(item);
      });
    }
  }, []);

  // 清除房间模型
  const clearRoomMesh = useCallback(() => {
    const meshes = threeCoreRef.current?.sceneMange
      .getSceneChildren()
      .filter((item) => !item.userData.marker);
    if (meshes && meshes.length > 0) {
      meshes.forEach((item) => {
        threeCoreRef.current?.sceneMange.removeSceneChild(item);
      });
    }
  }, []);

  // 将预加载的房间资源添加到场景
  const applyPreloadedRoom = useCallback((preloadedData: { mesh: THREE.Mesh; sprites: THREE.Sprite[] }) => {
    clearRoomMesh();
    threeCoreRef.current!.sceneMange.addSceneChild(preloadedData.mesh);
    preloadedData.sprites.forEach((sprite) => {
      threeCoreRef.current!.sceneMange.addSceneChild(sprite);
    });
  }, [clearRoomMesh]);

  // 切换至其他房间
  const switchRoom = useCallback(
    (preloadedData: { mesh: THREE.Mesh; sprites: THREE.Sprite[] } | null) => {
      setRibbon(preloadedData?.mesh.userData.roomType || "drawingRoom");
      if (preloadedData) {
        applyPreloadedRoom(preloadedData);
      }
    },
    [applyPreloadedRoom],
  );

  // 监听鼠标点击事件 (点击至标记点进行补间动画)
  const handleClickMarker = useCallback(
    (event: PointerEvent) => {
      const threeCore = threeCoreRef.current;
      if (!threeCore) return;

      const intersects = threeCore.raycasterMange.intersectObjects(event);
      if (!intersects?.length) return;

      const marker = intersects.find((item) => item.object.userData.marker);
      if (!marker) return;

      const { position, materialName } = marker.object.userData;

      clearMarker();

      const targetRoomType = materialName as ILivingStatusType;
      const preloadPromise = preloadRoom(targetRoomType);

      setLoading(true);

      const cameraPosition = threeCore.cameraMange.getPosition();

      new TWEEN.Tween({
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
      })
        .to({ x: position.x, y: position.y, z: position.z }, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((obj) => {
          cameraPosition.set(obj.x, obj.y, obj.z);
        })
        .onComplete(async () => {
          const preloadedData = await preloadPromise;
          switchRoom(preloadedData!);
          setLoading(false);
        })
        .start();
    },
    [clearMarker, preloadRoom, switchRoom],
  );

  // 组件加载
  useEffect(() => {
    // 初始化场景
    const currentID = location.state?.id;
    threeCoreRef.current = ThreeJsApp.getInstance().getOrCreateCore(
      currentID,
      containerRef.current!,
      {
        orbitControls: {
          enable: true,
          options: {
            minDistance: 1,
            maxDistance: 50,
          },
        },
      },
    );
    threeCoreRef.current.sceneMange.getSceneChildren();

    // 初始化房间
    const initRoom = async () => {
      setLoading(true);
      const preloadedData = await preloadRoom("drawingRoom");
      switchRoom(preloadedData!);
      setLoading(false);
    };
    initRoom();

    // 设置相机位置
    threeCoreRef.current.cameraMange.setPosition({ x: 0, y: 0, z: 5 });

    // 屏幕缩放事件
    const handleResize = () => threeCoreRef.current?.onWindowResize();
    window.addEventListener("resize", handleResize);

    // 屏幕点击事件
    window.addEventListener("click", handleClickMarker);

    // 组件卸载时
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickMarker);
      ThreeJsApp.getInstance().destroyCore(currentID!);
    };
  }, [location, preloadRoom, switchRoom, clearMarker, handleClickMarker]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <Spin spinning={loading} fullscreen description="Loading..." />
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}

export default ResidentialDetails;
