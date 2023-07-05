import {getItemsByType} from "./dataUtils.js";


/**
 * Affiche les éléments filtrés dans le DOM.
 *
 * @param {Object[]} recipeList - La liste des recettes.
 * @param {string} advancedSearchFiltersByType - Le type de filtre de recherche avancée (ingredient, appliance, ustensils).
 * @param {HTMLElement} container - Le conteneur HTML dans lequel afficher les éléments filtrés.
 * @param {string} query - La requête de recherche.
 */
export function displayFilteredItems(recipeList, advancedSearchFiltersByType, container, query) {
  container.innerHTML = "";

  let displayItems = getItemsByType(recipeList, advancedSearchFiltersByType);

  if (displayItems.length === 0) {
    if (query.trim() !== "") {
      const noResultsElement = document.createElement("p");
      noResultsElement.textContent = "Aucun résultat trouvé.";
      container.appendChild(noResultsElement);
    }
  } else {
    displayItems.sort((a, b) => a.localeCompare(b, "fr"));

    for (const displayItem of displayItems) {
      const itemElement = document.createElement("p");
      itemElement.textContent = displayItem;
      container.appendChild(itemElement);
    }
  }
}


/**
 * Affiche les résultats de recherche dans le DOM en masquant ou affichant les recettes correspondantes.
 *
 * @param {Object[]} displayedRecipes - Les recettes à afficher.
 */
export function displaySearchResults(displayedRecipes) {
  const recipeArticles = document.querySelectorAll(".recipe-article");

  for (const article of recipeArticles) {
    article.style.display = "none";
  }

  if (displayedRecipes.length === 0) {
    for (const article of recipeArticles) {
      article.style.display = "block";
    }
  } else {
    for (const displayedRecipe of displayedRecipes) {
      const recipeElement = document.getElementById(displayedRecipe.id);
      if (recipeElement) {
        recipeElement.style.display = "block";
      }
    }
  }
}
