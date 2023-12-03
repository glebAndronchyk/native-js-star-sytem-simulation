import { SpaceBody } from "../../types/SpaceBody.ts";
import { Vector } from "../../utils/Vector.ts";

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
  withDebugger: boolean = false;
  name: string;

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
  abstract attractsTo(body: SpaceBody): void;
  angleTo = (body: SpaceBody) => Math.atan2(body.y - this.y, body.x - this.x);

  distanceTo(body: SpaceBody) {
    const dx = body.x - this.x;
    const dy = body.y - this.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
