/**
 * Crée et affiche la section de formulaire dans l'élément main.
 */
export function displayFormSection() {
  // Création de la section
  const section = document.createElement("section");
  section.classList.add("form-section");

  // Création du formulaire
  const form = document.createElement("form");
  form.classList.add("form-section__form");
  form.setAttribute("action", "/search");
  form.setAttribute("method", "get");

  // Création de l'input
  const input = document.createElement("input");
  input.classList.add("form-section__input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Rechercher une recette");
  input.setAttribute("tabindex", "0");
  input.setAttribute("aria-label", "Rechercher une recette");

  // Création de l'icône de recherche
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-search", "form-section__input-icon");

  // Ajout de l'input et de l'icône au formulaire
  form.appendChild(input);
  form.appendChild(icon);

  // Ajout du formulaire à la section
  section.appendChild(form);

  // Ajout de la section à l'élément main
  const mainElement = document.querySelector("main");
  mainElement.appendChild(section);
}
