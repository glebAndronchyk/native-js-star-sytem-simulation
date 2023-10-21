import { Planet } from "../logic/Planet.ts";
import { SpaceBody } from "../../types/SpaceBody.ts";
import { Star } from "../logic/Start.ts";

export class StarSystemCanvasComponent extends HTMLCanvasElement {
  ctx = this.getContext("2d") as CanvasRenderingContext2D;
  planets: Planet[] = [];
  star: Star | null = null;

  connectedCallback() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  drawCircle({ x, y, r, color }: SpaceBody) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.planets.map((planet) => {
      planet.gravitateTo(this.star as Star);
      planet.update();
    });

    this.drawCircle(this.star as Star);
    this.planets.map((planet) => this.drawCircle(planet));

    requestAnimationFrame(this.update.bind(this));
  }
}

customElements.define("star-system-canvas", StarSystemCanvasComponent, {
  extends: "canvas",
});
