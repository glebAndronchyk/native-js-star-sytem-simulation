import { Planet } from "../logic/Planet.ts";
import { SpaceBody } from "../../types/SpaceBody.ts";
import { Star } from "../logic/Star.ts";
import { MovableBody } from "../logic/MovableBody.ts";

export class StarSystemCanvasComponent extends HTMLCanvasElement {
  ctx = this.getContext("2d") as CanvasRenderingContext2D;
  planets: Planet[] = [];
  star: Star | null = null;
  isAnimationPaused = false;

  connectedCallback() {
    this.resize();
    this.ctx.font = "15px Arial";
    // window.addEventListener("resize", () => this.resize());
  }

  handleAnimationPlay() {
    this.isAnimationPaused = !this.isAnimationPaused;
    if (!this.isAnimationPaused) {
      this.update();
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.updateContent();
    this.drawContent();

    if (this.isAnimationPaused) {
      return;
    }

    requestAnimationFrame(this.update.bind(this));
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private updateContent() {
    this.planets.map((planet) => {
      planet.attractsTo(this.star as Star);
      this.updatePathSegments(planet);

      planet.moons?.map((moon) => {
        moon.attractsTo(planet);
        moon.update(planet.x, planet.y);
        this.updatePathSegments(moon);
      });

      planet.update();
    });
  }

  private drawContent() {
    this.drawCircle(this.star as Star);
    this.planets.forEach((planet) => {
      this.drawCircle(planet);
      planet.moons?.forEach((moon) => this.drawCircle(moon));

      if (planet.withDebugger) {
        this.drawDebuggerWindow({
          x: planet.x + planet.r,
          y: planet.y + planet.r,
          name: planet.name,
          titleColor: planet.color,
          content: [
            `x: ${planet.x}`,
            `y: ${planet.y}`,
            "Gravity:",
            ...planet.gravityVector!.debuggerView(),
          ],
        });
      }
    });
  }

  private drawDebuggerWindow({
    x = 0,
    y = 0,
    name = "item",
    content = [] as string[],
    titleColor = "red",
  }) {
    // debugger window
    this.ctx.beginPath();
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(x, y, 200, 300);
    this.ctx.globalAlpha = 1;

    // debugger title
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = titleColor;
    this.ctx.fillText(name, x + 15, y + 25, 200);
    this.ctx.font = "15px Arial";

    // debugger content
    this.ctx.fillStyle = "red";
    content.map((str, index) => {
      const xOffset = x + 15;
      const yOffset = y + 45 * (index + 1);
      this.ctx.fillText(str, xOffset, yOffset, 200);
    });
  }

  private drawCircle({ x, y, r, color }: Omit<SpaceBody, "mass">) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
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
