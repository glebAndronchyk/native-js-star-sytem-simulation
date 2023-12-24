import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";
import { Skeleton } from "../../logic/Skeleton.ts";
import { MovableBody } from "../../logic/MovableBody.ts";
import { SkeletonTypes } from "../../../types/SkeletonModel.ts";

export class SkeletonView {
  skeletons: Record<SkeletonTypes, Skeleton> = {
    planetSkeleton: new Skeleton(0, 0, 0),
    starSkeleton: new Skeleton(0, 0, 0),
    moonSkeleton: new Skeleton(0, 0, 0),
  };

  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: StarSystemCanvasComponent) {
    this.ctx = canvas.ctx;
  }

  drawHighlight(body: MovableBody) {
    this.drawSkeleton(new Skeleton(body.x, body.y, body.r + 10));
  }

  public drawSkeleton(skeleton: Skeleton) {
    const lineWidth = 5;

    this.drawSkeletonBorder(skeleton, lineWidth);

    this.ctx.globalAlpha = 0.7;

    this.canvas.drawCircle({
      ...skeleton,
      r: skeleton.r - (skeleton.r < lineWidth ? 0 : lineWidth),
    });

    this.ctx.globalAlpha = 1;
  }

  private drawSkeletonBorder(skeleton: Skeleton, lineWidth: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = skeleton.color;
    this.ctx.arc(skeleton.x, skeleton.y, skeleton.r, 0, 2 * Math.PI, false);
    this.ctx.lineWidth = lineWidth;
    this.ctx.setLineDash([15, 3]);
    this.ctx.stroke();
    this.ctx.setLineDash([0, 0]);
  }
}
