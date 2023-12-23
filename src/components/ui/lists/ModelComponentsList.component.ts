import { StarSystemCanvasComponent } from "../StarSystemCanvas.component.ts";
import { Planet } from "../../logic/Planet.ts";
import { Moon } from "../../logic/Moon.ts";

export class ModelComponentsListComponent extends HTMLUListElement {
  canvas = document.querySelector("canvas") as StarSystemCanvasComponent;

  connectedCallback() {
    const { SectionTitle, Section, canvas } = this;

    this.innerHTML = `
      ${SectionTitle("STAR")}
      ${SectionTitle(`mass - ${canvas.star?.mass}`)}
      ${SectionTitle("PLANETS")}
      ${Section(canvas.planets)}
    `;

    this.classList.add("model-components-list");
    this.setButtonListeners();
  }

  private setButtonListeners() {
    const buttons = this.querySelectorAll("button");

    buttons.forEach((button) => {
      const [parentIdx, bodyIdx, level, action] = button.id.split("-");

      const handleDelete = () =>
        this.deleteCallback(bodyIdx, parentIdx, +level);
      const handleHighlight = () =>
        this.highlightCallback(+bodyIdx, +parentIdx, +level);

      button.addEventListener(
        "click",
        action === "delete" ? handleDelete : handleHighlight,
      );
    });
  }

  private deleteCallback(bodyIdx: string, parentIdx: string, level: number) {
    switch (level) {
      case 0:
        this.canvas.planets.splice(+bodyIdx, 1);
        break;
      case 1:
        this.canvas.planets[+parentIdx].moons?.splice(+bodyIdx, 1);
    }
  }

  private highlightCallback(bodyIdx: number, parentIdx: number, level: number) {
    switch (level) {
      case 0:
        this.canvas.setHighlightedElement(bodyIdx);
        break;
      case 1:
        this.canvas.setHighlightedElement(bodyIdx, parentIdx);
    }
  }

  private Section = (
    bodies: (Planet | Moon)[],
    parentIdx = 0,
    level = 0,
  ): string => {
    return bodies
      .map((body, index) => {
        const idBase = `${parentIdx}-${index}-${level}`;

        return `
          <li style="margin-left: ${level * 0.75}rem">
                <span style="color: ${body.color}">${body.name}</span>
                <button id="${idBase}-delete" class="delete-btn">Delete</button>
                <button id="${idBase}-highlight" class="hightlight-btn">Highlight</button>
                ${
                  "moons" in body && body.moons
                    ? this.Section(body.moons, index, level + 1)
                    : ""
                }
           </li>     
        `;
      })
      .join("");
  };

  private SectionTitle = (title: string) => `
    <li>
      <span>${title}</span>
    </li>
  `;
}

customElements.define("model-components-list", ModelComponentsListComponent, {
  extends: "ul",
});
