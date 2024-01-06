import { MovableBody, MovableBodySignature } from "./MovableBody.ts";

interface MoonSignature extends Omit<MovableBodySignature, "x" | "y"> {
  distanceFromPlanet: number;
}

export class Moon extends MovableBody {
  distanceFromPlanet = 0;

  constructor({ distanceFromPlanet, ...args }: MoonSignature) {
    super({ ...args, x: 0, y: 0 });
    this.distanceFromPlanet = distanceFromPlanet;
  }

  update(bodyCenterX: number, bodyCenterY: number) {
    const deltaX = this.x - bodyCenterX;
    const deltaY = this.y - bodyCenterY;

    const angle = Math.atan2(deltaY, deltaX);

    const distanceFromPlanetX = this.distanceFromPlanet * Math.cos(angle);
    const distanceFromPlanetY = this.distanceFromPlanet * Math.sin(angle);

    const nextFramePositionX = bodyCenterX + distanceFromPlanetX;
    const nextFramePositionY = bodyCenterY + distanceFromPlanetY;

    this.x = nextFramePositionX;
    this.y = nextFramePositionY;
  }
}
