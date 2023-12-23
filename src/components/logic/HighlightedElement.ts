export class HighlightedElement {
  x: number | null = null;
  y: number | null = null;

  reset() {
    this.x = null;
    this.y = null;
  }

  highlight(x: number, y: number | null = null) {
    this.x = x;
    this.y = y;
  }
}
