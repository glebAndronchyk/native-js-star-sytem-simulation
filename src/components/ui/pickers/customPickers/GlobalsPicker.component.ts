import { globalState } from "../../../../state/global.ts";
import "../../styles/GlobalsPickerStyle.css";

export class GlobalsPickerComponent extends HTMLDivElement {
  connectedCallback() {
    this.innerHTML = `
      <form class="globals-picker">
        <div>
            <label for="G">G</label>
            <input type="number" name="G" value=${globalState.G} />
        </div>
        <button type="submit">Set</button>
      </form>
    `;

    this.registerFormSubmitListener();
  }

  registerFormSubmitListener() {
    const form = this.querySelector(".globals-picker") as HTMLFormElement;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const { G } = form.elements as any;
        globalState.setG(+G.value);
      });
    }
  }
}

customElements.define("globals-picker", GlobalsPickerComponent, {
  extends: "div",
});
