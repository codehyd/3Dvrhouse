import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import * as THREE from "three";

import { ThreeJsApp } from "@/core/three";
import { ThreejsCore } from "@/core/three/threejs-core";

import { livingDetail } from "./config/";
import { ILivingStatusType } from "./types";

function ResidentialDetails() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const threeCoreRef = useRef<ThreejsCore | null>(null);

  const [, setRibbon] = useState<ILivingStatusType>("drawingRoom");

  // 加载当前房间的模型
  const loadLivingInfo = useCallback((currentRibbon: ILivingStatusType) => {
    setRibbon(currentRibbon);

    const findLiving = livingDetail.find(
      (item) => item.id === threeCoreRef.current!.id,
    );

    if (findLiving) {
      const materials = findLiving.material[currentRibbon].map((item) => {
        const texture = new THREE.TextureLoader().load(item);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        return new THREE.MeshBasicMaterial({ map: texture });
      });

      const geometry = new THREE.BoxGeometry(10, 10, 10);
      const mesh = new THREE.Mesh(geometry, materials);
      mesh.geometry.scale(10, 10, -10);
      mesh.userData = { id: findLiving.id };

      threeCoreRef.current!.sceneMange.addSceneChild(mesh);
    }
  }, []);

  // 组件加载
  useEffect(() => {
    const currentID = location.state?.id;
    threeCoreRef.current = ThreeJsApp.getInstance().getOrCreateCore(
      currentID,
      containerRef.current!,
      {
        orbitControls: {
          enable: true,
          options: {
            minDistance: 1,
            maxDistance: 30,
          },
        },
      },
    );
    threeCoreRef.current.sceneMange.getSceneChildren();

    threeCoreRef.current.cameraMange.setPosition(new THREE.Vector3(0, 0, 5));

    loadLivingInfo("drawingRoom");

    const handleResize = () => {
      threeCoreRef.current?.onWindowResize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ThreeJsApp.getInstance().destroyCore(currentID!);
    };
  }, [location, loadLivingInfo]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}

export default ResidentialDetails;
