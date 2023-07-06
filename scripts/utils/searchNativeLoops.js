import { recipes } from "../../data/recipes.js";
import {addSearchEventListener, findMatchingRecipes, updateList} from "./searchUtils.js";
import {displayFilteredItems, displaySearchResults} from "./displayUtils.js";
import {appliancesData, ingredientsData, ustensilsData} from "./dataUtils.js";

/**
 * Effectue une recherche de recettes et affiche les résultats correspondants.
 *
 * @param {string} query - La requête de recherche.
 * @returns {Array} - Les recettes correspondantes à la requête de recherche.
 */
export let previousRecipes = []; // Déclarer une variable pour stocker les recettes correspondantes précédentes

export function searchRecipes(query) {
  const ingredientsInput = document.querySelector(".dropdown__ingredients-input");
  const appliancesInput = document.querySelector(".dropdown__appareils-input");
  const ustensilsInput = document.querySelector(".dropdown__ustensiles-input");

  const ingredientsList = document.querySelector(".dropdown__ingredients-list");
  const appliancesList = document.querySelector(".dropdown__appareils-list");
  const ustensilsList = document.querySelector(".dropdown__ustensiles-list");

  let matchingRecipes = []; // Variable locale pour stocker les recettes correspondantes à la requête

  if (query.trim().length < 3) {
    if (query.trim().length === 0) {
      ingredientsInput.value = "";
      appliancesInput.value = "";
      ustensilsInput.value = "";

      const tags = document.querySelectorAll('.tag-visible');
      for (const tag of tags) {
        tag.classList.remove('tag-visible');
        tag.removeAttribute("style");
      }

      // Supprimer tous les éléments ajoutés
      const addedTags = document.querySelectorAll('.selected-tag');
      for (const tag of addedTags) {
        tag.remove();
      }
      matchingRecipes = findMatchingRecipes(query);
      displaySearchResults(matchingRecipes);
      // console.log("Recettes correspondantes : ", matchingRecipes);

      displayFilteredItems(recipes, "ingredient", ingredientsList, query);
      displayFilteredItems(recipes, "appliance", appliancesList, query);
      displayFilteredItems(recipes, "ustensils", ustensilsList, query);
    }
    return;
  }

  matchingRecipes = findMatchingRecipes(query);
  displaySearchResults(matchingRecipes);
  // console.log("Recettes correspondantes : ", matchingRecipes);


  displayFilteredItems(matchingRecipes, "ingredient", ingredientsList, query);
  displayFilteredItems(matchingRecipes, "appliance", appliancesList, query);
  displayFilteredItems(matchingRecipes, "ustensils", ustensilsList, query);

  previousRecipes = [...matchingRecipes]; // Mettre à jour les recettes correspondantes précédentes
  console.log("(searchRecipes) Recettes correspondantes précédentes: ", previousRecipes);
  return matchingRecipes;
}








/**
 * Ajoute un écouteur d'événement à un élément d'entrée de recherche.
 *
 * @param {string} inputSelector - Sélecteur de l'élément d'entrée de recherche.
 * @param {Array<string>} data - Les données à utiliser pour la recherche.
 * @param {string} listSelector - Sélecteur de la liste des résultats de recherche.
 * @param {Function} updateListFunc - Fonction de mise à jour de la liste des résultats de recherche.
 */
document.addEventListener("DOMContentLoaded", () => {
  addSearchEventListener(".dropdown__ingredients-input", ingredientsData, ".dropdown__ingredients-list", updateList);
  addSearchEventListener(".dropdown__appareils-input", appliancesData, ".dropdown__appareils-list", updateList);
  addSearchEventListener(".dropdown__ustensiles-input", ustensilsData, ".dropdown__ustensiles-list", updateList);
});



