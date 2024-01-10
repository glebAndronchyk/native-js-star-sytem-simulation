import { MovableBody, MovableBodySignature } from "./MovableBody.ts";
import {Vector} from "../../utils/Vector.ts";

interface MoonSignature extends Omit<MovableBodySignature, 'x' | 'y'> {
  distanceFromPlanetX?: number;
  distanceFromPlanetY?: number;
}

export class Moon extends MovableBody {
  distanceFromPlanetX: number;
  distanceFromPlanetY: number;
  private prevVelocity: Vector | null = null;
  private farFromPlanet = false;

  constructor({ distanceFromPlanetX = 0, distanceFromPlanetY = 0, ...args }: MoonSignature) {
    super({ ...args, x: 0, y: 0 });
    this.distanceFromPlanetX = distanceFromPlanetX;
    this.distanceFromPlanetY = distanceFromPlanetY;
  }

  update({relation}: {relation: MovableBody}) {
    // calculating velocity accordingly to distance from planet
    const handleVelocitiesResolver = (method: 'getX' | 'getY') => this.resolveVelocities(relation.velocity, method)

    let velocityX = this.velocity.getX() + handleVelocitiesResolver('getX');
    let velocityY = this.velocity.getY() + handleVelocitiesResolver('getY');

    const posDeltaX = Math.abs(relation.x - this.x);
    const posDeltaY = Math.abs(relation.y - this.y);

    if ((posDeltaX > 300 || posDeltaY > 300) && !this.farFromPlanet) {
      this.farFromPlanet = true;
      this.prevVelocity = new Vector(relation.velocity.getX(), relation.velocity.getY());
    }

    this.x += velocityX;
    this.y += velocityY;
  }

  private resolveVelocities = (relationVelocity: Vector, method: 'getX' | 'getY') => this.farFromPlanet ? this.prevVelocity![method]() : relationVelocity[method]()
}
