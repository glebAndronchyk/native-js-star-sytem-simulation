// TODO: understand the logic

export class Vector {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#y = y;
    this.#x = x;
  }

  getX = () => this.#x;
  getY = () => this.#y;

  setAngle(angle: number) {
    const length = this.getLength();
    this.#x = Math.cos(angle) * length;
    this.#y = Math.sin(angle) * length;
  }
  getAngle = () => Math.atan2(this.#x, this.#y);

  setLength(length: number) {
    const angle = this.getAngle();
    this.#x = Math.cos(angle) * length;
    this.#y = Math.sin(angle) * length;
  }
  getLength = () => Math.sqrt(this.#x * this.#x + this.#y * this.#y);

  addTo(x: number, y: number) {
    this.#x += x;
    this.#y += y;
  }
}
