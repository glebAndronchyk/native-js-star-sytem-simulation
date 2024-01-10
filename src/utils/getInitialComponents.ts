import { Planet } from "../components/logic/Planet.ts";
import { Star } from "../components/logic/Star.ts";
import { Vector } from "./Vector.ts";
import {Moon} from "../components/logic/Moon.ts";

export const getInitialPlanets = (cX: number, cY: number) => [
  new Planet({
    x: cX + 70,
    y: cY,
    r: 5,
    color: "#00ffd9",
    mass: 250,
    velocity: new Vector(0, 0),
    speed: 6,
    direction: -Math.PI / 2,
    name: "bbra",
  }),new Planet({
    x: cX + 120,
    y: cY,
    r: 4,
    color: "#19ff00",
    mass: 300,
    velocity: new Vector(0, 0),
    speed: 5,
    direction: -Math.PI / 2,
    name: "planet",
  }),new Planet({
    x: cX + 190,
    y: cY,
    r: 7,
    color: "#ff0000",
    mass: 150,
    velocity: new Vector(0, 0),
    speed: 3,
    direction: -Math.PI / 2,
    name: "ogo",
  }),new Planet({
    x: cX + 850,
    y: cY,
    r: 20,
    color: "#ff00fd",
    mass: 900,
    velocity: new Vector(0, 0),
    speed: 3,
    direction: -Math.PI / 2,
    name: "debil",
    moons: [
      new Moon({
        speed: 1.5,
        distanceFromPlanetX: 40,
        velocity: new Vector(0, 16),
        direction: -Math.PI / 2,
        r: 5,
        mass: 100,
        color: "rgba(0,255,174,0.3)",
        name: 'debil-1'
      }),new Moon({
        speed: 1,
        distanceFromPlanetX: 60,
        velocity: new Vector(0, 16),
        direction: -Math.PI / 2,
        r: 5,
        mass: 70,
        color: "#580569",
        name: 'debil-2'
      }),new Moon({
        speed: 0.69,
        distanceFromPlanetX: 100,
        velocity: new Vector(0, 16),
        direction: -Math.PI / 2,
        r: 5,
        mass: 70,
        color: "#dae34b",
        name: 'debil-3'
      }),
    ]
  }),new Planet({
    x: cX + 370,
    y: cY,
    r: 14,
    color: "#002eff",
    mass: 600,
    velocity: new Vector(0, 0),
    speed: 4,
    direction: -Math.PI / 2,
    name: "da",
    moons: [
      new Moon({
        speed: 0.69,
        distanceFromPlanetX: 60,
        velocity: new Vector(0, 16),
        direction: -Math.PI / 2,
        r: 2,
        mass: 70,
        color: "#f6d7d7",
        name: 'da-1'
      }),new Moon({
        speed: 0.6,
        distanceFromPlanetX: 100,
        velocity: new Vector(0, 16),
        direction: -Math.PI / 2,
        r: 4.5,
        mass: 110,
        color: "#dae34b",
        name: 'da-2'
      }),
    ]
  }),new Planet({
    x: cX + 500,
    y: cY,
    r: 4,
    color: "#ffbb00",
    mass: 400,
    velocity: new Vector(0, 0),
    speed: 2.75,
    direction: -Math.PI / 2,
    name: "terekon",
  }),new Planet({
    x: cX + 630,
    y: cY,
    r: 6,
    color: "#981000",
    mass: 550,
    velocity: new Vector(0, 0),
    speed: 2.75,
    direction: -Math.PI / 2,
    name: "planetka",
  }),
];

export const getInitialStar = (x: number, y: number) =>
  new Star({ x, y, r: 30, color: "#FFBF00", mass: 10000 });
