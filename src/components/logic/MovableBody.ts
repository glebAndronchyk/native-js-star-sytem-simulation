import { SpaceBody } from "../../types/SpaceBody.ts";
import { Vector } from "../../utils/Vector.ts";
import { globalState } from "../../state/global.ts";

export interface MovableBodySignature extends SpaceBody {
  velocity: Vector;
  name: string;
  speed?: number;
  direction?: number;
}

export abstract class MovableBody implements MovableBodySignature {
  color: string;
  mass: number;
  r: number;
  x: number;
  y: number;
  velocity: Vector;
  speed?: number;
  direction?: number;
  pathSegments: [number, number][] = [];
  name: string;
  gravity: Vector = new Vector(0, 0);

  protected constructor(args: MovableBodySignature) {
    this.x = args.x;
    this.y = args.y;
    this.r = args.r;
    this.mass = args.mass;
    this.color = args.color;
    this.velocity = args.velocity;
    this.velocity.setLength(args.speed || 0);
    this.velocity.setAngle(args.direction || 0);
    this.name = args.name;
  }

  abstract update(bX?: number, bY?: number): void;

  attractsTo(spaceBody: SpaceBody) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(spaceBody);

    gravity.setLength(
      (globalState.G * spaceBody.mass * this.mass) / distance ** 2,
    );
    gravity.setAngle(this.angleTo(spaceBody));
    this.gravity = gravity;

    this.velocity.addTo(gravity.getX(), gravity.getY());
  }

  angleTo = (body: SpaceBody) => Math.atan2(body.y - this.y, body.x - this.x);

  distanceTo(body: SpaceBody) {
    const dx = body.x - this.x;
    const dy = body.y - this.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
