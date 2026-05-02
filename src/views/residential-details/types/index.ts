import * as THREE from "three";

export type ILivingStatusType =
  | "cloakroom"
  | "drawingRoom"
  | "kitchen"
  | "masterBedroom"
  | "secondaryBedroom"
  | "toilet";

export interface ILivingMarker {
  position: THREE.Vector3;
  scale: number;
  name: string;
  materialName: string;
  icon: string;
}

export interface ILivingStatus {
  id: string | number;
  name: string;
  material: Record<ILivingStatusType, string[]>;
  marker: Record<ILivingStatusType, ILivingMarker[]>;
}
