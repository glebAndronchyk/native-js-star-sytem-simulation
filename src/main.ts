import "./style.css";

import { init } from "./init.ts";

import "./components/ui/StarSystemCanvas.component.ts";

import "./components/ui/pickers/Picker.component.ts";
import "./components/ui/pickers/PlanetPicker.component.ts";
import "./components/ui/pickers/StarPicker.component.ts";
import "./components/ui/pickers/MoonPicker.component.ts";
import "./components/ui/pickers/customPickers/GlobalsPicker.component.ts";

import "./components/ui/lists/ModelComponentsList.component.ts";

document.addEventListener("DOMContentLoaded", () => init());
