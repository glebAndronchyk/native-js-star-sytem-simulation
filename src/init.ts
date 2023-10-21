// TODO: use canvas web component

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

window.addEventListener("resize", () => {
  resize();
});

interface DrawCircleProps {
  x: number;
  y: number;
  r: number;
  color: string;
}

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const drawCircle = ({ x, y, r, color }: DrawCircleProps) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
};

const getPlanets = (cX: number, cY: number) => [
  { x: cX + 100, y: cY, color: "#FFBF00", r: 10 },
  { x: cX + 200, y: cY, color: "#FFBF00", r: 15 },
  { x: cX + 300, y: cY, color: "#FFBF00", r: 5 },
];

export const init = () => {
  resize();
  const planets = getPlanets(canvas.width / 2, canvas.height / 2);

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle({
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: 20,
      color: "#FFBF00",
    });

    planets.map(planet => drawCircle(planet));

    // requestAnimationFrame(update);
  };

  update();
};
