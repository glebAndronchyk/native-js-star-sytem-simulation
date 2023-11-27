import { PickerComponent } from "./Picker.component.ts";
import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";
import { Vector } from "../../../utils/Vector.ts";
import { Planet } from "../../logic/Planet.ts";
import { getFormValues } from "../../../utils/getFormValues.ts";

export class PlanetPickerComponent extends PickerComponent {
  constructor() {
    super(
      "Pick planet",
      "Planet picker",
      `
            <input type="text" name="name" placeholder="Planet name" />
            <input type="text" name="color" placeholder="Color" />
            <input type="number" name="mass" placeholder="Planet mass" />
            <input type="number" name="r" placeholder="Planet radius" />
            <input type="number" name="x" placeholder="Planet x" />
            <input type="number" name="y" placeholder="Planet y" />
            <input type="number" name="speed" step="0.01" placeholder="Planet speed" />            
    `,
      (form) => {
        const formValues = getFormValues(form.elements);

        const canvas =
          document.querySelector<StarSystemCanvasComponent>("canvas");
        if (canvas) {
          const cX = canvas.width / 2;
          const cY = canvas.height / 2;
          canvas.planets.push(
            new Planet({
              x: cX + +formValues.x,
              y: cY + +formValues.y,
              r: +formValues.r,
              color: formValues.color,
              mass: +formValues.mass,
              velocity: new Vector(0, 0),
              speed: +formValues.speed,
              direction: -Math.PI / 2,
              name: formValues.name,
            }),
          );
        }
      },
    );
  }
}

customElements.define("planet-picker", PlanetPickerComponent, {
  extends: "div",
});
