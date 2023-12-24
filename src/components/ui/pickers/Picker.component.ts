import "../styles/PickerComponentStyle.css";

export class PickerComponent extends HTMLDivElement {
  private isOpen = false;

  constructor(
    private buttonName = "picker",
    private pickerTitle = "picker",
    private html_formBody = "",
    private submitCallback: (form: HTMLFormElement, e: SubmitEvent) => void,
    private formMountCallback?: (form: HTMLFormElement) => void,
    private formUnmountCallback?: () => void,
    private offsetPx = 0,
  ) {
    super();
  }

  private toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  connectedCallback() {
    // Mounts picker button when parent div element connects to DOM
    this.append(this.createPickerButton());
  }

  private mountPickerBody() {
    const { parent } = this.getAtomicComponents();

    this.append(parent);
  }

  private unmountPickerBody() {
    const pickerBody = this.querySelector(".picker");

    if (pickerBody) {
      this.formUnmountCallback && this.formUnmountCallback();
      pickerBody.remove();
    }
  }

  private getAtomicComponents() {
    const pickerDiv = this.createPickerDiv();
    const pickerTitle = this.createPickerTitle();
    const form = this.createForm();

    pickerDiv.append(pickerTitle, form);

    return { parent: pickerDiv, pickerTitle, form };
  }

  private createPickerButton() {
    const pickerButton = document.createElement("button");
    pickerButton.classList.add("picker-button");
    pickerButton.innerText = this.buttonName;

    pickerButton.addEventListener("click", () => {
      this.toggleOpen();
      if (this.isOpen) {
        this.mountPickerBody();
      } else {
        this.unmountPickerBody();
      }
    });

    return pickerButton;
  }

  private createForm() {
    const form = document.createElement("form");
    form.classList.add("picker-form");
    form.innerHTML = `
      ${this.html_formBody}            
      <button id="pick-button" type="submit">Pick</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitCallback(form, e);
      this.toggleOpen();
      this.unmountPickerBody();
    });

    this.formMountCallback && this.formMountCallback(form);

    return form;
  }

  private createPickerTitle() {
    const pickerTitle = document.createElement("div");
    pickerTitle.classList.add("picker-header");
    pickerTitle.innerHTML = `<h2>${this.pickerTitle}</h2>`;

    return pickerTitle;
  }

  private createPickerDiv() {
    const { top, left } = this.getBoundingClientRect();

    const leftPos = left + this.offsetPx;

    const pickerDiv = document.createElement("div");
    pickerDiv.classList.add("picker");
    pickerDiv.style.left = `${leftPos + 10}px`;
    pickerDiv.style.top = `${top + 30}px`;

    return pickerDiv;
  }
}

customElements.define("item-picker", PickerComponent, {
  extends: "div",
});
