import { StarSystemCanvasComponent } from "./StarSystemCanvas.component.ts";

export const playButtonListener = (canvas: StarSystemCanvasComponent) => {
  const playButton = document.querySelector(
    ".play-button",
  ) as HTMLButtonElement;

  if (!playButton) {
    throw new Error("Component were not initialized yet");
  }

  playButton.addEventListener("click", () => {
    canvas.handleAnimationPlay();
  });
};
