import { SkeletonModel } from "../../types/SkeletonModel.ts";

export class Skeleton implements SkeletonModel {
  constructor(
    public x: number,
    public y: number,
    public r: number,
    public color = "white",
    public visible = false,
  ) {}

  setValues({ x, y, r, color, visible }: SkeletonModel) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color || this.color;
    this.visible = !!visible;
  }

  reset = () =>
    this.setValues({ x: 0, y: 0, r: 0, color: "white", visible: false });
}
