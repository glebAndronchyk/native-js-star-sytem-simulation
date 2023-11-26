import { StarSystemCanvasComponent } from "./components/ui/StarSystemCanvas.component.ts";
import {
  getInitialPlanets,
  getInitialStar,
} from "./utils/getInitialComponents.ts";
import { debuggerButtonListener } from "./components/ui/DebuggerButton.listener.ts";

export const init = () => {
  const canvas = document.querySelector<StarSystemCanvasComponent>("canvas");

  if (!canvas) {
    throw new Error("Canvas was not initialized");
  }

  debuggerButtonListener(canvas);

  const canvasMiddlePoint: [number, number] = [
    canvas.width / 2,
    canvas.height / 2,
  ];

  canvas.planets = [...getInitialPlanets(...canvasMiddlePoint)];
  canvas.star = { ...getInitialStar(...canvasMiddlePoint) };

  canvas.update();
};
