import { Moon } from "./Moon.ts";
import { MovableBody, MovableBodySignature } from "./MovableBody.ts";
import { Vector } from "../../utils/Vector.ts";
import { Star } from "./Star.ts";
import { SpaceBody } from "../../types/SpaceBody.ts";

interface PlanetSignature extends MovableBodySignature {
  moons?: Moon[] | null;
}

export class Planet extends MovableBody implements PlanetSignature {
  moons: Moon[] | null = null;
  gravityVector: Vector | null = null;

  constructor({ moons = null, ...args }: PlanetSignature) {
    super(args);
    this.moons = moons;
  }

  update() {
    const velocityX = this.velocity.getX();
    const velocityY = this.velocity.getY();

    this.x += velocityX;
    this.y += velocityY;
  }

  attractsTo(star: Star) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(star);
    // const kineticEnergy = this.getKineticEnergy(star, distance);
    // const gravitationalEnergy = this.getGravitationalEnergy(star, distance);
    // const energySum = kineticEnergy + gravitationalEnergy;
    // const isEqual = Math.abs(energySum) === Math.abs(kineticEnergy);
    // console.log(isEqual);
    // console.log({ kineticEnergy, gravitationalEnergy, energySum });

    // TODO: add gravitational constant
    gravity.setLength((50 * star.mass * this.mass) / distance ** 2);
    gravity.setAngle(this.angleTo(star));

    this.gravityVector = gravity;
    this.velocity.addTo(gravity.getX(), gravity.getY());
  }

  getKineticEnergy(compareBody: SpaceBody, distance: number) {
    return (compareBody.mass * this.mass) / (2 * distance);
  }

  getGravitationalEnergy(compareBody: SpaceBody, distance: number) {
    return -(compareBody.mass * this.mass) / distance;
  }
}
