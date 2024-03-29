import { Planet } from "../logic/Planet.ts";
import { SpaceBody } from "../../types/SpaceBody.ts";
import { Star } from "../logic/Star.ts";
import { MovableBody } from "../logic/MovableBody.ts";
import { globalState } from "../../state/global.ts";
import { DebuggerHelper } from "./canvasComponents/DebuggerWindow.canvas.ts";
import { SkeletonTypes } from "../../types/SkeletonModel.ts";
import { SkeletonView } from "./canvasComponents/SkeletonView.canvas.ts";
import { HighlightedElement } from "../logic/HighlightedElement.ts";

export class StarSystemCanvasComponent extends HTMLCanvasElement {
  ctx = this.getContext("2d") as CanvasRenderingContext2D;
  planets: Planet[] = [];
  star: Star | null = null;
  debuggerHelper = new DebuggerHelper(this.ctx);
  skeletonView = new SkeletonView(this);
  highlightedElement = new HighlightedElement();

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

  setHighlightedElement(bodyIdx: number, parentIdx: number | null = null) {
    // In future this should be refactored in order to handle more complex logic

    const isPlanetAlreadyHighlighted =
      parentIdx === null && this.highlightedElement.x === bodyIdx;
    const isMoonAlreadyHighlighted =
      parentIdx !== null &&
      this.highlightedElement.x === parentIdx &&
      this.highlightedElement.y === bodyIdx;

    if (isPlanetAlreadyHighlighted || isMoonAlreadyHighlighted) {
      this.highlightedElement.reset();
      return;
    }

    if (!parentIdx) {
      this.highlightedElement.highlight(bodyIdx);
    } else {
      this.highlightedElement.highlight(parentIdx, bodyIdx);
    }
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private updateContent() {
    this.planets.forEach((planet) => {
      if (planet.name ) {
        planet.attractsTo(this.star as Star);
      }
      this.updatePathSegments(planet); // trail

      planet.update();

      planet.moons?.forEach((moon) => {
        moon.attractsTo(planet);
        moon.update({relation: planet});
        // this.updatePathSegments(moon); // trail
      });
    });
  }

  private drawContent() {
    this.drawCircle(this.star as Star);
    this.drawPlanets();
    this.drawSkeletons();
  }

  private drawSkeletons() {
    Object.keys(this.skeletonView.skeletons).forEach((key) => {
      const castedKey = key as SkeletonTypes;
      const skeleton = this.skeletonView.skeletons[castedKey];

      if (skeleton.visible) {
        if (skeleton.relatedObjectIndex !== undefined) {
          const planet = this.planets[skeleton.relatedObjectIndex];
          skeleton.x = planet?.x + skeleton.customOffset!;
          skeleton.y = planet?.y + skeleton.customOffset!;
        }

        this.skeletonView.drawSkeleton(skeleton);
      }
    });
  }

  private drawPlanets() {
    this.planets.forEach((planet, planetIndex) => {
      this.drawCircle(planet);
      const { x: parentIdx, y: bodyIdx } = this.highlightedElement;
      const isPlanetHighlighted = bodyIdx === null && planetIndex === parentIdx;

      if (isPlanetHighlighted) {
        this.skeletonView.drawHighlight(planet);
      }

      this.drawMoons(planet, planetIndex, parentIdx, bodyIdx);
      this.drawDebugger(planet);
    });
  }

  private drawDebugger(planet: Planet) {
    if (globalState.withDebugger) {
      this.debuggerHelper.draw(planet);
      planet.moons?.forEach((moon) =>
          this.debuggerHelper.draw(moon, { window: false }),
      );
    }
  }

  private drawMoons(planet: Planet, planetIndex: number, parentIdx: number | null, bodyIdx: number | null ) {
    planet.moons?.forEach((moon, moonIndex) => {
      const isMoonHighlighted =
          planetIndex === parentIdx && moonIndex === bodyIdx;

      if (isMoonHighlighted) {
        this.skeletonView.drawHighlight(moon);
      }

      this.drawCircle(moon);
    });
  }

  private updatePathSegments(body: MovableBody) {
    body.pathSegments.push([body.x, body.y]);
    body.pathSegments.map(([x, y]) => {
      this.drawCircle({ x, y, r: 0.6, color: body.color });
    });
    if (body.pathSegments.length > 120) {
      body.pathSegments.splice(0, 1);
    }
  }

  // virvite mne ruki
}

customElements.define("star-system-canvas", StarSystemCanvasComponent, {
  extends: "canvas",
});
