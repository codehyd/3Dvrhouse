export type ILivingStatusType =
  | "cloakroom"
  | "drawingRoom"
  | "kitchen"
  | "masterBedroom"
  | "secondaryBedroom"
  | "toilet";

export interface ILivingStatus {
  id: string | number;
  name: string;
  material: Record<ILivingStatusType, string[]>;
}
