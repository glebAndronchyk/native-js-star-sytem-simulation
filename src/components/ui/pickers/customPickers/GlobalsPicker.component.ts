import { globalState } from "../../../../state/global.ts";
import "../../styles/GlobalsPickerStyle.css";

export class GlobalsPickerComponent extends HTMLFormElement {
  connectedCallback() {
    this.innerHTML = `
        <div>
            <label for="G">G</label>
            <input type="number" name="G" value=${globalState.G} />
        </div>
        <button type="submit">Set</button>
    `;

    this.classList.add("globals-picker");
    this.registerFormSubmitListener();
  }

  registerFormSubmitListener() {
    this.addEventListener("submit", (e) => {
      e.preventDefault();
      const { G } = this.elements as any;
      globalState.setG(+G.value);
    });
  }
}

customElements.define("globals-picker", GlobalsPickerComponent, {
  extends: "form",
});
