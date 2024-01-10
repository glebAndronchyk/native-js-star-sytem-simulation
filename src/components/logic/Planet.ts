import { Moon } from "./Moon.ts";
import { MovableBody, MovableBodySignature } from "./MovableBody.ts";

interface PlanetSignature extends MovableBodySignature {
  moons?: Moon[];
}

export class Planet extends MovableBody implements PlanetSignature {
  moons: Moon[];

  constructor({ moons = [], ...args }: PlanetSignature) {
    super(args);
    this.moons = moons?.map((moon) => {
      moon.x = args.x + moon.distanceFromPlanetX;
      moon.y = args.y + moon.distanceFromPlanetY;

      return moon;
    });
  }

  update() {
    const velocityX = this.velocity.getX();
    const velocityY = this.velocity.getY();

    this.x += velocityX;
    this.y += velocityY;
  }
}
