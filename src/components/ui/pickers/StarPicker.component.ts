import { PickerComponent } from "./Picker.component.ts";
import { getFormValues } from "../../../utils/getFormValues.ts";
import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";

export class StarPickerComponent extends PickerComponent {
  constructor() {
    super(
      "Pick star",
      "Star picker",
      `
            <input type="text" name="color" placeholder="Color" />
            <input type="number" name="mass" placeholder="Star mass" />
            <input type="number" name="r" placeholder="Star radius" />
    `,
      (form) => {
        const formValues = getFormValues(form.elements);

        const canvas =
          document.querySelector<StarSystemCanvasComponent>("canvas");
        if (canvas && canvas.star) {
          const { mass, r, color } = formValues as any;

          canvas.star.mass = +mass || canvas.star.mass;
          canvas.star.r = +r || canvas.star.r;
          canvas.star.color = color || canvas.star.color;
        }
      },
    );
  }
}

customElements.define("star-picker", StarPickerComponent, { extends: "div" });
