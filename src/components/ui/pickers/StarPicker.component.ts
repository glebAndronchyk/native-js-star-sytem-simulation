import { PickerComponent } from "./Picker.component.ts";
import { getFormValues } from "../../../utils/getFormValues.ts";
import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";

export class StarPickerComponent extends PickerComponent {
  constructor() {
    const canvas = document.querySelector<StarSystemCanvasComponent>("canvas");

    if (!canvas) {
      throw new Error("Component were not initialized yet");
    }

    const submitCallback = (form: HTMLFormElement) => {
      const formValues = getFormValues(form.elements);

      const { mass, r, color } = formValues as any;

      canvas.star!.mass = +mass || canvas.star!.mass;
      canvas.star!.r = +r || canvas.star!.r;
      canvas.star!.color = color || canvas.star!.color;
    };

    const formMountCallback = (form: HTMLFormElement) => {
      for (let field of form.elements) {
        field.addEventListener("input", () => {
          const formValues = getFormValues(form.elements);

          const { r, color } = formValues as any;

          const cX = canvas.width / 2;
          const cY = canvas.height / 2;

          canvas.skeletons.starSkeleton.setValues({
            visible: true,
            x: cX,
            y: cY,
            r: +r,
            color: color || "white",
          });
        });
      }
    };

    const formUnmountCallback = () => canvas.skeletons.starSkeleton.reset();

    super(
      "Pick star",
      "Star picker",
      `
            <input type="text" name="color" placeholder="Color" />
            <input type="number" name="mass" placeholder="Star mass" />
            <input type="number" name="r" placeholder="Star radius" />
    `,
      submitCallback,
      formMountCallback,
      formUnmountCallback,
    );
  }
}

customElements.define("star-picker", StarPickerComponent, { extends: "div" });
