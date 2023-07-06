import {displaySearchResults} from "./displayUtils.js";
import {previousRecipes} from "./searchNativeLoops.js";

/**
 * Crée un élément de tag filtrant pour les recettes.
 *
 * @param {string} itemName - Le nom de l'élément de tag.
 * @param {HTMLElement} itemContainer - Le conteneur de l'élément de tag.
 * @param {HTMLElement} targetContainer - Le conteneur cible pour afficher les tags sélectionnés.
 * @returns {HTMLElement} - L'élément de tag créé.
 */
export function createFilterTag(itemName, itemContainer, targetContainer) {
  const selectedItemsSet = new Set();
  const itemElement = document.createElement("p");
  itemElement.textContent = itemName;
  itemElement.style.cursor = "pointer";
  itemElement.classList.add("tag");

  let selectedTags = [];

  itemElement.addEventListener("click", () => {
    const clickedText = itemName;

    if (!selectedTags.includes(clickedText)) {
      selectedTags.push(clickedText);
      console.log("(createFilterTag) Tags actuellement sélectionnés : ", selectedTags);
    }

    // Filtrer les recettes en fonction des tags sélectionnés
    const displayedRecipes = [];
    for (const recipe of previousRecipes) {
      const lowerCaseTags = selectedTags.map(tag => tag.toLowerCase());
      let isMatching = false;

      // Vérifier si au moins un ingrédient correspond à un tag
      for (const ingredientObj of recipe.ingredients) {
        const ingredient = ingredientObj.ingredient.toLowerCase();
        for (const tag of lowerCaseTags) {
          if (ingredient.includes(tag)) {
            isMatching = true;
            break;
          }
        }
        if (isMatching) {
          break;
        }
      }

      // Vérifier si l'appareil correspond à un tag
      if (!isMatching) {
        if (lowerCaseTags.includes(recipe.appliance.toLowerCase())) {
          isMatching = true;
        }
      }

      // Vérifier si au moins un ustensile correspond à un tag
      for (const utensil of recipe.ustensils) {
        if (lowerCaseTags.includes(utensil.toLowerCase())) {
          isMatching = true;
          break;
        }
      }

      // Vérifier si le nom ou la description correspond à un tag
      if (!isMatching) {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        for (const tag of lowerCaseTags) {
          if (name.includes(tag) || description.includes(tag)) {
            isMatching = true;
            break;
          }
        }
      }

      if (isMatching) {
        displayedRecipes.push(recipe);
      }
    }

    console.log("(createFilterTag) Recettes actuellement affichées : ", displayedRecipes);

    displaySearchResults(displayedRecipes);

    if (itemElement.classList.contains("selected")) {
      return;
    }

    itemElement.style.backgroundColor = "#FFD15B";
    itemElement.style.padding = "5px";
    itemElement.classList.add("selected");

    const selectedItemDiv = document.createElement("div");
    selectedItemDiv.classList.add("selected-tag");
    const tags = `
      width: 100%;
      height: 53px;
      background-color: #FFD15B;
      border-radius: 10px;
      align-items: center;
      padding: 17px 18px;
      margin-top: 15px;
      display: flex;
      gap: 60px;
      justify-content: space-between;
      font-family: Manrope, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
    `;

    selectedItemDiv.setAttribute("style", tags);

    const itemText = document.createElement("span");
    itemText.classList.add("tag-visible");
    itemText.textContent = itemName;

    const closeButton = document.createElement("span");
    closeButton.classList.add("tag-visible");
    closeButton.textContent = "X";
    closeButton.style.cursor = "pointer";

    closeButton.addEventListener("click", () => {
      console.log("(createFilterTag) Tag supprimé :", itemName);

      selectedItemDiv.remove();
      itemElement.style.backgroundColor = "";
      itemElement.classList.remove("selected");
      selectedItemsSet.delete(itemName);

      // Affiche les recettes précédentes
      console.log("(createFilterTag) Recettes précédentes : ", previousRecipes);
      displaySearchResults(previousRecipes);

    });

    selectedItemDiv.appendChild(itemText);
    selectedItemDiv.appendChild(closeButton);

    targetContainer.insertAdjacentElement("afterend", selectedItemDiv);

    selectedItemsSet.add(itemName);
  });

  return itemElement;
}
