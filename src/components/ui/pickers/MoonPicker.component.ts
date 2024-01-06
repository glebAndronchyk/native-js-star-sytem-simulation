import { PickerComponent } from "./Picker.component.ts";
import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";
import { ModelComponentsListComponent } from "../lists/ModelComponentsList.component.ts";
import { getFormValues } from "../../../utils/getFormValues.ts";
import { Vector } from "../../../utils/Vector.ts";
import { Moon } from "../../logic/Moon.ts";

export class MoonPickerComponent extends PickerComponent {
  constructor() {
    const canvas = document.querySelector<StarSystemCanvasComponent>("canvas");

    if (!canvas) {
      throw new Error("Component were not initialized yet");
    }

    const { moonSkeleton } = canvas.skeletonView.skeletons;

    const submitCallback = (form: HTMLFormElement) => {
      const componentsList = document.querySelector(
        ".model-components-list",
      ) as ModelComponentsListComponent;
      const formValues = getFormValues(form.elements);
      const planetIdx = +(this.getAttribute("planet-idx") as string);

      const { r, color, mass, speed, name } = formValues as any;

      if (!r || !mass || !speed) {
        return;
      }

      canvas.planets[planetIdx].moons?.push(
        new Moon({
          distanceFromPlanet: 50,
          r: +r,
          color: color || "white",
          mass: +mass,
          velocity: new Vector(0, 0),
          speed: +speed,
          direction: -Math.PI / 2,
          name: name || "Moon",
        }),
      );
      componentsList.render();
    };

    const formMountCallback = (form: HTMLFormElement) => {
      for (let field of form.elements) {
        field.addEventListener("input", () => {
          const formValues = getFormValues(form.elements);
          const planetIdx = +(this.getAttribute("planet-idx") as string);

          const { r, color, distanceFromPlanet } = formValues as any;

          moonSkeleton.setValues({
            visible: true,
            x: 0,
            y: 0,
            r: +r,
            color: color || "white",
            relatedObjectIndex: planetIdx,
            customOffset: +distanceFromPlanet || 50,
          });
        });
      }
    };

    const formUnmountCallback = () => moonSkeleton.reset();

    super(
      "Pick moon",
      "Moon picker",
      `
            <input type="text" name="name" placeholder="Moon name" />
            <input type="text" name="color" placeholder="Color" />
            <input type="number" name="mass" placeholder="Moon mass" />
            <input type="number" name="r" placeholder="Moon radius" />
            <input type="number" name="distanceFromPlanet" placeholder="Distance From Planet" />
            <input type="number" name="speed" step="0.01" placeholder="Moon speed" />            
    `,
      submitCallback,
      formMountCallback,
      formUnmountCallback,
      -50,
    );
  }
}

customElements.define("moon-picker", MoonPickerComponent, {
  extends: "div",
});
