export interface SkeletonModel {
  x: number;
  y: number;
  r: number;
  color?: string;
  visible?: boolean;
}

export type SkeletonTypes = "planetSkeleton" | "starSkeleton";
