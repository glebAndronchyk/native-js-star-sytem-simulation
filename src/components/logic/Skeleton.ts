import { SkeletonModel } from "../../types/SkeletonModel.ts";

export class Skeleton implements SkeletonModel {
  constructor(
    public x: number,
    public y: number,
    public r: number,
    public color = "white",
    public visible = false,
    public relatedObjectIndex?: number,
    public customOffset?: number,
  ) {}

  setValues({
    x,
    y,
    r,
    color,
    visible,
    relatedObjectIndex,
    customOffset,
  }: SkeletonModel) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color || this.color;
    this.visible = !!visible;
    this.relatedObjectIndex = relatedObjectIndex;
    this.customOffset = customOffset;
  }

  reset = () =>
    this.setValues({
      x: 0,
      y: 0,
      r: 0,
      color: "white",
      visible: false,
      relatedObjectIndex: undefined,
      customOffset: undefined,
    });
}
