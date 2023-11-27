import { Planet } from "../components/logic/Planet.ts";
import { Star } from "../components/logic/Star.ts";
import { Vector } from "./Vector.ts";
// import { Moon } from "../components/logic/Moon.ts";

export const getInitialPlanets = (cX: number, cY: number) => [
  // new Planet({
  //   x: cX + 300,
  //   y: cY,
  //   r: 10,
  //   color: "#ff00a6",
  //   mass: 15,
  //   velocity: new Vector(0, 9),
  //   direction: -Math.PI / 2,
  //   speed: 6,
  // }),
  // new Planet({
  //   x: cX + 300,
  //   y: cY + 450,
  //   r: 10,
  //   color: "#18cd57",
  //   mass: 1000,
  //   velocity: new Vector(11, 0),
  //   direction: -Math.PI / 2,
  //   name: "p1",
  //   // moons: [
  //   //   new Moon({
  //   //     speed: 3,
  //   //     mass: 10,
  //   //     color: "#1860cd",
  //   //     r: 4,
  //   //     x: cX + 520,
  //   //     y: cY,
  //   //     velocity: new Vector(5, 0),
  //   //     direction: -Math.PI / 2,
  //   //   }),
  //   // ],
  //   speed: 2,
  // }),
  new Planet({
    x: cX + 250,
    y: cY,
    r: 10,
    color: "#00ffd9",
    mass: 1000,
    velocity: new Vector(0, 5),
    speed: 6,
    direction: -Math.PI / 2,
    name: "p2",
    // moons: [
    //   new Moon({
    //     speed: 3,
    //     mass: 10,
    //     color: "#18cd57",
    //     r: 4,
    //     x: cX + 320,
    //     y: cY,
    //     velocity: new Vector(11, 0),
    //     direction: -Math.PI / 2,
    //   }),
    // ],
  }),
  // new Planet({
  //   x: cX + 150,
  //   y: cY,
  //   r: 50,
  //   color: "#FFBF00",
  //   mass: 6,
  //   velocity: new Vector(0, 16),
  //   direction: -Math.PI / 2,
  //   speed: 4,
  //   name: "p3",
  // }),
  // new Planet({
  //   x: cX + 200,
  //   y: cY - 500,
  //   r: 10,
  //   color: "#c4b4b4",
  //   mass: 60000,
  //   velocity: new Vector(0, 0),
  //   direction: -Math.PI / 2,
  //   speed: 3,
  //   name: "p4",
  // }),
  // // new Planet(
  // //   {
  // //     x: cX + 200,
  // //     y: cY,
  // //     r: 10,
  // //     color: "#FFBF00",
  // //     mass: 1,
  // //     velocity: new Vector(0, 0),
  // //   },
  // //   5,
  // //   -Math.PI / 2,
  // // ),
  // // new Planet(
  // //   {
  // //     x: cX + 300,
  // //     y: cY,
  // //     r: 10,
  // //     color: "#FFBF00",
  // //     mass: 1,
  // //     velocity: new Vector(0, 0),
  // //   },
  // //   5,
  // //   -Math.PI / 2,
  // // ),
];

export const getInitialStar = (x: number, y: number) =>
  new Star({ x, y, r: 20, color: "#FFBF00", mass: 110000 });
