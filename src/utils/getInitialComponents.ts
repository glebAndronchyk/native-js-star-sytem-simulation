import { Planet } from "../components/logic/Planet.ts";
import { Star } from "../components/logic/Star.ts";
import { Vector } from "./Vector.ts";
import { Moon } from "../components/logic/Moon.ts";

export const getInitialPlanets = (cX: number, cY: number) => [
  new Planet({
    x: cX + 350,
    y: cY,
    r: 10,
    color: "#00ffd9",
    mass: 15,
    velocity: new Vector(0, 0),
    speed: 5,
    direction: -Math.PI / 2,
    name: "p2",
  }),
  new Planet({
    x: cX + 700,
    y: cY,
    r: 10,
    color: "#dad71e",
    mass: 20,
    velocity: new Vector(0, 0),
    speed: 4,
    direction: -Math.PI / 2,
    name: "p2",
  }),
  new Planet({
    x: cX + 900,
    y: cY,
    r: 10,
    color: "#3bd70e",
    mass: 8,
    velocity: new Vector(0, 0),
    speed: 1,
    direction: -Math.PI / 2,
    name: "p2",
    moons: [
      new Moon({
        speed: 2,
        mass: 4,
        color: "#7c18cd",
        r: 5,
        distanceFromPlanet: 45,
        velocity: new Vector(5, 0),
        direction: -Math.PI / 2,
        name: "moon",
      }),
    ],
  }),
  new Planet({
    x: cX + 550,
    y: cY,
    r: 15,
    color: "#FFBF00",
    mass: 10,
    velocity: new Vector(0, 16),
    direction: -Math.PI / 2,
    speed: 3,
    name: "p3",
    moons: [
      new Moon({
        speed: 2,
        mass: 8,
        color: "#cd1818",
        r: 5,
        distanceFromPlanet: 65,
        velocity: new Vector(5, 0),
        direction: -Math.PI / 2,
        name: "moon",
      }),
    ],
  }),
];

export const getInitialStar = (x: number, y: number) =>
  new Star({ x, y, r: 30, color: "#FFBF00", mass: 1000 });
