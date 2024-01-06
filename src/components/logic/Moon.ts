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
    const nextFramePositionX =
      bodyCenterX + this.velocity.getX() + this.distanceFromPlanet;
    const nextFramePositionY =
      bodyCenterY + this.velocity.getY() + this.distanceFromPlanet;

    this.x = nextFramePositionX;
    this.y = nextFramePositionY;
  }
}
