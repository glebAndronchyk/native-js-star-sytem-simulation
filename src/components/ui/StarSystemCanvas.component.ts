import { Planet } from "../logic/Planet.ts";
import { SpaceBody } from "../../types/SpaceBody.ts";
import { Star } from "../logic/Star.ts";
import { MovableBody } from "../logic/MovableBody.ts";
import { globalState } from "../../state/global.ts";
import { DebuggerHelper } from "./canvasComponents/DebuggerWindow.canvas.ts";
import { Skeleton } from "../logic/Skeleton.ts";
import { SkeletonTypes } from "../../types/SkeletonModel.ts";
import { SkeletonView } from "./canvasComponents/SkeletonView.canvas.ts";

export class StarSystemCanvasComponent extends HTMLCanvasElement {
  ctx = this.getContext("2d") as CanvasRenderingContext2D;
  planets: Planet[] = [];
  star: Star | null = null;
  skeletons: Record<SkeletonTypes, Skeleton> = {
    planetSkeleton: new Skeleton(0, 0, 0),
    starSkeleton: new Skeleton(0, 0, 0),
  };
  debuggerHelper = new DebuggerHelper(this.ctx);
  skeletonView = new SkeletonView(this);

  connectedCallback() {
    this.resize();
    this.ctx.font = "15px Arial";
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.updateContent();
    this.drawContent();

    if (globalState.isAnimationPaused) {
      return;
    }

    requestAnimationFrame(this.update.bind(this));
  }

  drawCircle({ x, y, r, color }: Omit<SpaceBody, "mass">) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private updateContent() {
    this.planets.map((planet) => {
      planet.moons?.map((moon) => {
        moon.attractsTo(planet);
        moon.update(planet.x, planet.y);
      });

      planet.attractsTo(this.star as Star);
      this.updatePathSegments(planet);

      planet.update();
    });
  }

  private drawContent() {
    this.drawCircle(this.star as Star);

    Object.keys(this.skeletons).forEach((key) => {
      const castedKey = key as SkeletonTypes;

      if (this.skeletons[castedKey].visible) {
        this.skeletonView.drawSkeleton(this.skeletons[castedKey]);
      }
    });

    this.planets.forEach((planet) => {
      this.drawCircle(planet);
      planet.moons?.forEach((moon) => this.drawCircle(moon));

      if (globalState.withDebugger) {
        this.debuggerHelper.draw(planet);
        planet.moons?.forEach((moon) =>
          this.debuggerHelper.draw(moon, { window: false }),
        );
      }
    });
  }

  private updatePathSegments(body: MovableBody) {
    body.pathSegments.push([body.x, body.y]);
    body.pathSegments.map(([x, y]) => {
      this.drawCircle({ x, y, r: 2, color: body.color });
    });
    if (body.pathSegments.length > 120) {
      body.pathSegments.splice(0, 1);
    }
  }
}

customElements.define("star-system-canvas", StarSystemCanvasComponent, {
  extends: "canvas",
});
