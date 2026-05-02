import * as THREE from "three";
import { ILivingStatus } from "../types";

// cloakroom
import cloakroomB from "@/assets/images/material/cloakroom/mobile_b.jpg";
import cloakroomD from "@/assets/images/material/cloakroom/mobile_d.jpg";
import cloakroomF from "@/assets/images/material/cloakroom/mobile_f.jpg";
import cloakroomL from "@/assets/images/material/cloakroom/mobile_l.jpg";
import cloakroomR from "@/assets/images/material/cloakroom/mobile_r.jpg";
import cloakroomU from "@/assets/images/material/cloakroom/mobile_u.jpg";

// drawingRoom
import drawingRoomB from "@/assets/images/material/drawingRoom/mobile_b.jpg";
import drawingRoomD from "@/assets/images/material/drawingRoom/mobile_d.jpg";
import drawingRoomF from "@/assets/images/material/drawingRoom/mobile_f.jpg";
import drawingRoomL from "@/assets/images/material/drawingRoom/mobile_l.jpg";
import drawingRoomR from "@/assets/images/material/drawingRoom/mobile_r.jpg";
import drawingRoomU from "@/assets/images/material/drawingRoom/mobile_u.jpg";

// kitchen
import kitchenB from "@/assets/images/material/kitchen/mobile_b.jpg";
import kitchenD from "@/assets/images/material/kitchen/mobile_d.jpg";
import kitchenF from "@/assets/images/material/kitchen/mobile_f.jpg";
import kitchenL from "@/assets/images/material/kitchen/mobile_l.jpg";
import kitchenR from "@/assets/images/material/kitchen/mobile_r.jpg";
import kitchenU from "@/assets/images/material/kitchen/mobile_u.jpg";

// masterBedroom
import masterBedroomB from "@/assets/images/material/masterBedroom/mobile_b.jpg";
import masterBedroomD from "@/assets/images/material/masterBedroom/mobile_d.jpg";
import masterBedroomF from "@/assets/images/material/masterBedroom/mobile_f.jpg";
import masterBedroomL from "@/assets/images/material/masterBedroom/mobile_l.jpg";
import masterBedroomR from "@/assets/images/material/masterBedroom/mobile_r.jpg";
import masterBedroomU from "@/assets/images/material/masterBedroom/mobile_u.jpg";

// secondaryBedroom
import secondaryBedroomB from "@/assets/images/material/secondaryBedroom/mobile_b.jpg";
import secondaryBedroomD from "@/assets/images/material/secondaryBedroom/mobile_d.jpg";
import secondaryBedroomF from "@/assets/images/material/secondaryBedroom/mobile_f.jpg";
import secondaryBedroomL from "@/assets/images/material/secondaryBedroom/mobile_l.jpg";
import secondaryBedroomR from "@/assets/images/material/secondaryBedroom/mobile_r.jpg";
import secondaryBedroomU from "@/assets/images/material/secondaryBedroom/mobile_u.jpg";

// toilet
import toiletB from "@/assets/images/material/toilet/mobile_b.jpg";
import toiletD from "@/assets/images/material/toilet/mobile_d.jpg";
import toiletF from "@/assets/images/material/toilet/mobile_f.jpg";
import toiletL from "@/assets/images/material/toilet/mobile_l.jpg";
import toiletR from "@/assets/images/material/toilet/mobile_r.jpg";
import toiletU from "@/assets/images/material/toilet/mobile_u.jpg";

// 标记点配置
import iconTop from "@/assets/images/icon/icon_top.png";
import iconRight from "@/assets/images/icon/icon_right.png";
import iconLeft from "@/assets/images/icon/icon_left.png";

export const livingDetail: ILivingStatus[] = [
  {
    id: "living_1",
    name: "房源1",
    material: {
      cloakroom: [
        cloakroomR,
        cloakroomL,
        cloakroomU,
        cloakroomD,
        cloakroomF,
        cloakroomB,
      ],
      drawingRoom: [
        drawingRoomR,
        drawingRoomL,
        drawingRoomU,
        drawingRoomD,
        drawingRoomF,
        drawingRoomB,
      ],
      kitchen: [kitchenR, kitchenL, kitchenU, kitchenD, kitchenF, kitchenB],
      masterBedroom: [
        masterBedroomR,
        masterBedroomL,
        masterBedroomU,
        masterBedroomD,
        masterBedroomF,
        masterBedroomB,
      ],
      secondaryBedroom: [
        secondaryBedroomR,
        secondaryBedroomL,
        secondaryBedroomU,
        secondaryBedroomD,
        secondaryBedroomF,
        secondaryBedroomB,
      ],
      toilet: [toiletR, toiletL, toiletU, toiletD, toiletF, toiletB],
    },
    marker: {
      cloakroom: [
        {
          position: new THREE.Vector3(16, -12, 43),
          scale: 7,
          name: "主卧",
          materialName: "masterBedroom",
          icon: iconTop,
        },
        {
          position: new THREE.Vector3(40, 12, -15),
          scale: 5,
          name: "卫生间",
          materialName: "toilet",
          icon: iconTop,
        },
      ],
      drawingRoom: [
        {
          position: new THREE.Vector3(-12, 3, -48),
          scale: 7,
          name: "主卧",
          materialName: "masterBedroom",
          icon: iconTop,
        },
        {
          position: new THREE.Vector3(-45, -1, 20),
          scale: 7,
          name: "厨房",
          materialName: "kitchen",
          icon: iconTop,
        },
        {
          position: new THREE.Vector3(47, 0, 38),
          scale: 7,
          name: "次卧",
          materialName: "secondaryBedroom",
          icon: iconTop,
        },
      ],
      kitchen: [
        {
          position: new THREE.Vector3(-5, -19, 50),
          scale: 10,
          name: "客厅",
          materialName: "drawingRoom",
          icon: iconTop,
        },
      ],
      masterBedroom: [
        {
          position: new THREE.Vector3(-49, 0, 17),
          scale: 5,
          name: "衣帽间",
          materialName: "cloakroom",
          icon: iconTop,
        },
        {
          position: new THREE.Vector3(-49, 0, 10),
          scale: 5,
          name: "卫生间",
          materialName: "toilet",
          icon: iconRight,
        },
        {
          position: new THREE.Vector3(-49, 0, 36),
          scale: 5,
          name: "客厅",
          materialName: "drawingRoom",
          icon: iconLeft,
        },
      ],
      secondaryBedroom: [
        {
          position: new THREE.Vector3(-22, -2, 16),
          scale: 7,
          name: "客厅",
          materialName: "drawingRoom",
          icon: iconLeft,
        },
      ],
      toilet: [
        {
          position: new THREE.Vector3(49, 1, 4),
          scale: 7,
          name: "衣帽间",
          materialName: "cloakroom",
          icon: iconTop,
        },
      ],
    },
  },
];
