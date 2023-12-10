import { MovableBody } from "../../logic/MovableBody.ts";

export class DebuggerHelper {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(body: MovableBody, { window = true, vectors = true } = {}) {
    window && this.drawDebugger(body);
    vectors && this.drawMainVectors(body, 6, 100);
  }

  private drawDebugger(body: MovableBody) {
    const { x, y, content, name, titleColor } = {
      x: body.x + body.r,
      y: body.y + body.r,
      name: body.name,
      titleColor: body.color,
      content: [`x: ${body.x}`, `y: ${body.y}`],
    };

    this.drawWindow(x, y);
    this.drawTitle(x, y, name, titleColor);
    this.drawContent(x, y, content);
  }

  private drawMainVectors(
    { velocity, x, y, gravity }: MovableBody,
    velocityScale: number,
    gravityScale: number,
  ) {
    // Velocity
    const vX = velocity.getX() * velocityScale + x;
    const vY = velocity.getY() * velocityScale + y;
    this.drawVector(x, y, vX, vY, "red");

    // Gravity
    const gX = gravity.getX() * gravityScale + x;
    const gY = gravity.getY() * gravityScale + y;
    this.drawVector(x, y, gX, gY, "darkgreen");
  }

  private drawVector(
    cX: number,
    cY: number,
    x: number,
    y: number,
    color: string,
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(cX, cY);
    this.ctx.lineWidth = 4;
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  private drawWindow(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(x, y, 200, 300);
    this.ctx.globalAlpha = 1;
  }

  private drawTitle(x: number, y: number, name: string, titleColor: string) {
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = titleColor;
    this.ctx.fillText(name, x + 15, y + 25, 200);
    this.ctx.font = "15px Arial";
  }

  private drawContent(x: number, y: number, content: string[]) {
    this.ctx.fillStyle = "red";
    content.map((str, index) => {
      const xOffset = x + 15;
      const yOffset = y + 45 * (index + 1);
      this.ctx.fillText(str, xOffset, yOffset, 200);
    });
  }
}
