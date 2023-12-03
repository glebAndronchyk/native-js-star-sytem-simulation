import { StarSystemCanvasComponent } from "./StarSystemCanvas.component.ts";
import { globalState } from "../../state/global.ts";

export const playButtonListener = (canvas: StarSystemCanvasComponent) => {
  const playButton = document.querySelector(
    ".play-button",
  ) as HTMLButtonElement;

  if (!playButton) {
    throw new Error("Component were not initialized yet");
  }

  playButton.addEventListener("click", () => {
    globalState.togglePlay();
    if (!globalState.isAnimationPaused) {
      canvas.update();
    }
  });
};
