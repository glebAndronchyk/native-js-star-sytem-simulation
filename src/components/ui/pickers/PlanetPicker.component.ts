import { PickerComponent } from "./Picker.component.ts";
import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";
import { Vector } from "../../../utils/Vector.ts";
import { Planet } from "../../logic/Planet.ts";
import { getFormValues } from "../../../utils/getFormValues.ts";
import { ModelComponentsListComponent } from "../lists/ModelComponentsList.component.ts";

export class PlanetPickerComponent extends PickerComponent {
  constructor() {
    const canvas = document.querySelector<StarSystemCanvasComponent>("canvas");

    if (!canvas) {
      throw new Error("Component were not initialized yet");
    }

    const { planetSkeleton } = canvas.skeletonView.skeletons;

    const submitCallback = (form: HTMLFormElement) => {
      const componentsList = document.querySelector(
        ".model-components-list",
      ) as ModelComponentsListComponent;
      const formValues = getFormValues(form.elements);

      const cX = canvas.width / 2;
      const cY = canvas.height / 2;

      const { x, y, r, color, mass, speed, name } = formValues as any;

      canvas.planets.push(
        new Planet({
          x: cX + (+x || 0),
          y: cY + (+y || 0),
          r: +r || 0,
          color: color || "white",
          mass: +mass || 0,
          velocity: new Vector(0, 0),
          speed: +speed || 0,
          direction: -Math.PI / 2,
          name: name || "Planet",
        }),
      );
      componentsList.render();
    };

    const formMountCallback = (form: HTMLFormElement) => {
      for (let field of form.elements) {
        field.addEventListener("input", () => {
          const formValues = getFormValues(form.elements);

          const { x, y, r, color } = formValues as any;

          const skeletonX = canvas.width / 2 + (+x || 0);
          const skeletonY = canvas.height / 2 + (+y || 0);

          planetSkeleton.setValues({
            visible: true,
            x: skeletonX,
            y: skeletonY,
            r: +r,
            color: color || "white",
          });
        });
      }
    };

    const formUnmountCallback = () => planetSkeleton.reset();

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
      submitCallback,
      formMountCallback,
      formUnmountCallback,
    );
  }
}

customElements.define("planet-picker", PlanetPickerComponent, {
  extends: "div",
});
