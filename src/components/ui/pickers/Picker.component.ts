export class PickerComponent extends HTMLDivElement {
  constructor(
    private buttonName = "picker",
    private pickerTitle = "picker",
    private html_content = "",
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
        <div>
            ${this.html_content}
        </div>
    </div>
    `;

    this.registerOutsideClickListener();
  }

  private unmountPickerBody() {
    const pickerBody = this.querySelector(".picker");

    if (pickerBody) {
      pickerBody.remove();
    }
  }

  private registerOutsideClickListener() {
    const listener = (e: MouseEvent) => {
      if (e.target !== this) {
        this.isOpen = false;
        this.unmountPickerBody();
        window.removeEventListener("click", listener);
      }
    };

    window.addEventListener("click", listener);
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
