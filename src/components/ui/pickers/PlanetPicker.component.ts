import { PickerComponent } from "./Picker.component.ts";

export class PlanetPickerComponent extends PickerComponent {
  constructor() {
    super("Pick planet", "Planet picker", `<div>Something will be here</div>`);
  }
}

customElements.define("planet-picker", PlanetPickerComponent, {
  extends: "div",
});
