import { StarSystemCanvasComponent } from "./components/ui/StarSystemCanvas.component.ts";
import {
  getInitialPlanets,
  getInitialStar,
} from "./utils/getInitialComponents.ts";
import { debuggerButtonListener } from "./components/ui/DebuggerButton.listener.ts";
import { playButtonListener } from "./components/ui/PlayButton.listener.ts";

export const init = () => {
  const canvas = document.querySelector<StarSystemCanvasComponent>("canvas");

  if (!canvas) {
    throw new Error("Canvas was not initialized");
  }

  const canvasMiddlePoint: [number, number] = [
    canvas.width / 2,
    canvas.height / 2,
  ];

  canvas.planets = [...getInitialPlanets(...canvasMiddlePoint)];
  canvas.star = { ...getInitialStar(...canvasMiddlePoint) };

  initializeModelControls(canvas);

  canvas.update();
};

const initializeModelControls = (canvas: StarSystemCanvasComponent) => {
  debuggerButtonListener();
  playButtonListener(canvas);

  // Should do this in order to receive actual components data on render
  const ul = document.createElement("ul", { is: "model-components-list" });
  document.querySelector(".model-controls")?.append(ul);
};
