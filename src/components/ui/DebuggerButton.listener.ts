import { StarSystemCanvasComponent } from "./StarSystemCanvas.component.ts";
import "./styles/DebuggerButtonStyle.css";

export const debuggerButtonListener = (canvas: StarSystemCanvasComponent) => {
  const debuggerButton = document.querySelector(
    ".debugger-button",
  ) as HTMLButtonElement;

  if (!debuggerButton) {
    throw new Error("Component were not initialized yet");
  }

  debuggerButton.addEventListener("click", ({ target }) => {
    const debuggerButtonTextContentBase = "Debugger mode:";
    debuggerButton.textContent = `${debuggerButtonTextContentBase} ${
      (target! as HTMLElement).innerText.includes("on") ? "off" : "on"
    }`;

    canvas.planets.map((planet) => {
      planet.moons?.map((moon) => {
        moon.withDebugger = !moon.withDebugger;
      });
      planet.withDebugger = !planet.withDebugger;
    });
  });
};
