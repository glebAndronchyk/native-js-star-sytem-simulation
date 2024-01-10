export class GlobalState {
  G = 0.001;
  withDebugger = false;
  isAnimationPaused = false;

  toggleDebugger = () => (this.withDebugger = !this.withDebugger);
  togglePlay = () => (this.isAnimationPaused = !this.isAnimationPaused);
  setG = (value: number) => (this.G = value);
}

export const globalState = new GlobalState();
