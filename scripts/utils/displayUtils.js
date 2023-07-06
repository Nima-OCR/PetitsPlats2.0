import {getItemsByType} from "./dataUtils.js";

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
    displayItems.sort((a, b) => a.localeCompare(b, "fr")).forEach(displayItem => {
      const itemElement = document.createElement("p");
      itemElement.textContent = displayItem;
      container.appendChild(itemElement);
    });
  }
}

export function displaySearchResults(displayedRecipes) {
  const recipeArticles = Array.from(document.querySelectorAll(".recipe-article"));

  recipeArticles.forEach(article => {
    article.style.display = "none";
  });

  if (displayedRecipes.length === 0) {
    recipeArticles.forEach(article => {
      article.style.display = "block";
    });
  } else {
    displayedRecipes.forEach(displayedRecipe => {
      const recipeElement = document.getElementById(displayedRecipe.id);
      if (recipeElement) {
        recipeElement.style.display = "block";
      }
    });
  }
}
