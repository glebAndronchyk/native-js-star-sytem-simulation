import { Planet } from "../components/logic/Planet.ts";
import { Star } from "../components/logic/Start.ts";
import { Vector } from "./Vector.ts";

export const getInitialPlanets = (cX: number, cY: number) => [
  new Planet(
    {
      x: cX + 200,
      y: cY,
      r: 10,
      color: "#FFBF00",
      mass: 50000,
      velocity: new Vector(0, 0),
    },
    1,
    -Math.PI / 2,
  ),
  // new Planet(
  //   {
  //     x: cX + 200,
  //     y: cY,
  //     r: 10,
  //     color: "#FFBF00",
  //     mass: 1,
  //     velocity: new Vector(0, 0),
  //   },
  //   5,
  //   -Math.PI / 2,
  // ),
  // new Planet(
  //   {
  //     x: cX + 300,
  //     y: cY,
  //     r: 10,
  //     color: "#FFBF00",
  //     mass: 1,
  //     velocity: new Vector(0, 0),
  //   },
  //   5,
  //   -Math.PI / 2,
  // ),
  new Planet(
    {
      x: cX + 600,
      y: cY,
      r: 10,
      color: "#FFBF00",
      mass: 1,
      velocity: new Vector(0, 0),
    },
    10,
    -Math.PI / 2,
  ),
];

export const getInitialStar = (x: number, y: number) =>
  new Star({ x, y, r: 20, color: "#FFBF00", mass: 1_000 });
