export interface SkeletonModel {
  x: number;
  y: number;
  r: number;
  color?: string;
  visible?: boolean;
  relatedObjectIndex?: number;
  customOffset?: number;
}

export type SkeletonTypes = "planetSkeleton" | "starSkeleton" | "moonSkeleton";
