import { Moon } from "./Moon.ts";
import { MovableBody, MovableBodySignature } from "./MovableBody.ts";

interface PlanetSignature extends MovableBodySignature {
  moons?: Moon[] | null;
}

export class Planet extends MovableBody implements PlanetSignature {
  moons: Moon[] | null = null;

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
}
