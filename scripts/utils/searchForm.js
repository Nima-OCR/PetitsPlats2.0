import {searchRecipes} from "./searchNativeLoops.js";

export function displayFormSection() {
  const section = document.createElement("section");
  section.classList.add("form-section");

  const form = document.createElement("form");
  form.classList.add("form-section__form");
  form.setAttribute("action", "/search");
  form.setAttribute("method", "get");

  const input = document.createElement("input");
  input.classList.add("form-section__input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Rechercher une recette, un ingrédient, ...");
  input.setAttribute("tabindex", "0");
  input.setAttribute("aria-label", "Rechercher une recette, un ingrédient, ...");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-search", "form-section__input-icon");

  form.appendChild(input);
  form.appendChild(icon);
  section.appendChild(form);

  const mainElement = document.querySelector("main");
  mainElement.appendChild(section);

  input.addEventListener("input", (event) => {
    const query = event.target.value;
    searchRecipes(query);
  });
}




