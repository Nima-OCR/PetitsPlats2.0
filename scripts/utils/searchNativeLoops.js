import { recipes } from "../../data/recipes.js";
import { addSearchEventListener, findMatchingRecipes, updateList } from "./searchUtils.js";
import { displayFilteredItems, displaySearchResults } from "./displayUtils.js";
import { appliancesData, ingredientsData, ustensilsData } from "./dataUtils.js";

export let previousRecipes = [];

export function searchRecipes(query) {
  const ingredientsInput = document.querySelector(".dropdown__ingredients-input");
  const appliancesInput = document.querySelector(".dropdown__appareils-input");
  const ustensilsInput = document.querySelector(".dropdown__ustensiles-input");

  const ingredientsList = document.querySelector(".dropdown__ingredients-list");
  const appliancesList = document.querySelector(".dropdown__appareils-list");
  const ustensilsList = document.querySelector(".dropdown__ustensiles-list");

  let matchingRecipes = [];

  if (query.trim().length < 3) {
    if (query.trim().length === 0) {
      ingredientsInput.value = "";
      appliancesInput.value = "";
      ustensilsInput.value = "";

      const tags = document.querySelectorAll('.tag-visible');
      tags.forEach(tag => {
        tag.classList.remove('tag-visible');
        tag.removeAttribute("style");
      });

      const addedTags = document.querySelectorAll('.selected-tag');
      addedTags.forEach(tag => {
        tag.remove();
      });

      matchingRecipes = findMatchingRecipes(query);
      displaySearchResults(matchingRecipes);

      displayFilteredItems(recipes, "ingredient", ingredientsList, query);
      displayFilteredItems(recipes, "appliance", appliancesList, query);
      displayFilteredItems(recipes, "ustensils", ustensilsList, query);
    }
    return;
  }

  matchingRecipes = findMatchingRecipes(query);
  displaySearchResults(matchingRecipes);

  displayFilteredItems(matchingRecipes, "ingredient", ingredientsList, query);
  displayFilteredItems(matchingRecipes, "appliance", appliancesList, query);
  displayFilteredItems(matchingRecipes, "ustensils", ustensilsList, query);

  previousRecipes = [...matchingRecipes];
  console.log("(searchRecipes) Recettes correspondantes précédentes: ", previousRecipes);
  return matchingRecipes;
}

document.addEventListener("DOMContentLoaded", () => {
  addSearchEventListener(".dropdown__ingredients-input", ingredientsData, ".dropdown__ingredients-list", updateList);
  addSearchEventListener(".dropdown__appareils-input", appliancesData, ".dropdown__appareils-list", updateList);
  addSearchEventListener(".dropdown__ustensiles-input", ustensilsData, ".dropdown__ustensiles-list", updateList);
});
