import { Moon } from "./Moon.ts";
import { MovableBody, MovableBodySignature } from "./MovableBody.ts";

interface PlanetSignature extends MovableBodySignature {
  moons?: Moon[];
}

export class Planet extends MovableBody implements PlanetSignature {
  moons: Moon[];

  constructor({ moons = [], ...args }: PlanetSignature) {
    super(args);
    this.moons = moons;
  }

  update() {
    const velocityX = this.velocity.getX();
    const velocityY = this.velocity.getY();

    this.x += velocityX;
    this.y += velocityY;
  }
}
