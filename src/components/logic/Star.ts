import { SpaceBody } from "../../types/SpaceBody.ts";

export class Star implements SpaceBody {
  color: string;
  mass: number;
  r: number;
  x: number;
  y: number;

  constructor(args: SpaceBody) {
    this.mass = args.mass;
    this.r = args.r;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
  }
}
