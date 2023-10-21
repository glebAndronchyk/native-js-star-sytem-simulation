import { SpaceBody } from "../../types/SpaceBody.ts";
import { Vector } from "../../utils/Vector.ts";

interface PlanetSignature extends SpaceBody {
  velocity: Vector;
}

export class Planet implements PlanetSignature {
  color: string;
  mass: number;
  r: number;
  x: number;
  y: number;
  velocity: Vector;

  constructor(args: PlanetSignature, speed: number, direction: number) {
    this.x = args.x;
    this.y = args.y;
    this.r = args.r;
    this.mass = args.mass;
    this.color = args.color;
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }

  accelerate = (x: number, y: number) => this.velocity.addTo(x, y);
  update = () => {
    this.x += this.velocity.getX();
    this.y += this.velocity.getY();
  };
  angleTo = (body: SpaceBody) => Math.atan2(body.y - this.y, body.x - this.x);
  distanceTo(body: SpaceBody) {
    const dx = body.x - body.y;
    const dy = body.y - body.x;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }
  gravitateTo(body: SpaceBody) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(body);

    gravity.setLength(body.mass / distance ** 2);
    gravity.setAngle(this.angleTo(body));

    this.velocity.addTo(gravity.getX(), gravity.getY());
  }
}
