export class PickerComponent extends HTMLDivElement {
  abortController = new AbortController();

  constructor(
    private buttonName = "picker",
    private pickerTitle = "picker",
    private html_formBody = "",
    private submitCallback: (form: HTMLFormElement, e: SubmitEvent) => void,
    private isOpen = false,
  ) {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<button class="picker-button">${this.buttonName}</button>`;

    this.registerPickerButtonListener();
  }

  private mountPickerBody() {
    this.innerHTML = `
    ${this.innerHTML}
    <div class="picker">
        <div class="picker-header">
            <h2>${this.pickerTitle}</h2>
        </div>
        <form id="picker-form">
            ${this.html_formBody}            
            <button id="add-planet-button" type="submit">Pick</button>
        </form>
    </div>
    `;

    this.registerFormSubmitListener();
  }

  private unmountPickerBody() {
    const pickerBody = this.querySelector(".picker");

    if (pickerBody) {
      pickerBody.remove();
    }
  }

  private registerFormSubmitListener() {
    const form = this.querySelector("#picker-form") as HTMLFormElement;
    if (form) {
      form.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          this.submitCallback(form, e);
        },
        { signal: this.abortController.signal },
      );
    }
  }

  private registerPickerButtonListener() {
    const pickerButton = this.querySelector(".picker-button");
    if (pickerButton) {
      pickerButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.mountPickerBody();
        } else {
          this.unmountPickerBody();
        }
      });
    }
  }
}

customElements.define("item-picker", PickerComponent, {
  extends: "div",
});
