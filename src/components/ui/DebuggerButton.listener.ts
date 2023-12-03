import { globalState } from "../../state/global.ts";

export const debuggerButtonListener = () => {
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

    globalState.toggleDebugger();
  });
};
