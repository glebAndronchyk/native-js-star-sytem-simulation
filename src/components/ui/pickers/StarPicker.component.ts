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
          canvas.star.mass = +formValues.mass || canvas.star.mass;
          canvas.star.r = +formValues.r || canvas.star.r;
          canvas.star.color = formValues.color || canvas.star.color;
        }
      },
    );
  }
}

customElements.define("star-picker", StarPickerComponent, { extends: "div" });
