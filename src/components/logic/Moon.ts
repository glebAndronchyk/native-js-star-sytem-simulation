import { MovableBody, MovableBodySignature } from "./MovableBody.ts";
import { Vector } from "../../utils/Vector.ts";
import { Planet } from "./Planet.ts";

export class Moon extends MovableBody {
  constructor(args: MovableBodySignature) {
    super(args);
  }

  update(bodyCenterX: number, bodyCenterY: number) {
    // console.log(this.velocity.getY());
    const nextFramePositionX = bodyCenterX + this.velocity.getX();
    const nextFramePositionY = bodyCenterY + this.velocity.getY();
    // console.log('next', nextFramePositionY, 'center', bodyCenterY);

    this.x =  nextFramePositionX;
    this.y = nextFramePositionY;
  }
  attractsTo(planet: Planet) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(planet);

    gravity.setLength(planet.mass / distance ** 2);
    gravity.setAngle(this.angleTo(planet));

    this.velocity.addTo(gravity.getX(), gravity.getY());
  }
}
