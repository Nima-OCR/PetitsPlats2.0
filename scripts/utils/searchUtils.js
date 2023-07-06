import {recipes} from "../../data/recipes.js";
import {createFilterTag} from "./filterTag.js";

/**
 * Vérifie si un texte contient une requête.
 *
 * @param {string} item - Le texte à vérifier.
 * @param {string} query - La requête à rechercher dans le texte.
 * @returns {boolean} - Renvoie true si le texte contient la requête, sinon false.
 */
export function textIncludes(item, query) {
  const lowerCaseItem = item.toLowerCase(); // Convertit le texte en minuscules
  return lowerCaseItem.includes(query); // Vérifie si le texte contient la requête spécifiée
}


/**
 * Trouve des recettes correspondant à une requête donnée. Cherche dans les noms, descriptions,
 * ingrédients, appareils et ustensiles de cuisine des recettes.
 * Une correspondance est trouvée si la requête est incluse dans l'une de ces propriétés de la recette.
 * Pour être considéré, la requête doit avoir une longueur d'au moins 3 caractères.
 *
 * @param {string} query - La requête de recherche.
 * @returns {Array} Un tableau de recettes correspondant à la requête.
 * Si aucune correspondance n'est trouvée, un tableau vide est retourné.
 */

let storedMatchingRecipes = []; // Stocke les recettes correspondantes

export function findMatchingRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const matchingRecipes = [];

  for (const recipe of recipes) {
    const ingredients = recipe.ingredients;
    const appliance = recipe.appliance.toLowerCase();
    let ustensils = [];

    for (const utensil of recipe.ustensils) {
      ustensils.push(utensil.toLowerCase());
    }

    if (lowerCaseQuery.length >= 3) {
      if (
        textIncludes(recipe.name, lowerCaseQuery) ||
        textIncludes(recipe.description, lowerCaseQuery) ||
        appliance.includes(lowerCaseQuery)
      ) {
        matchingRecipes.push(recipe);
      } else {
        for (const ingredientObj of ingredients) {
          const ingredient = ingredientObj.ingredient.toLowerCase();
          if (ingredient.includes(lowerCaseQuery)) {
            matchingRecipes.push(recipe);
            break;
          }
        }

        for (const utensil of ustensils) {
          if (utensil.includes(lowerCaseQuery)) {
            matchingRecipes.push(recipe);
            break;
          }
        }
      }
    }
  }

  storedMatchingRecipes = matchingRecipes;

  console.log("(findMatchingRecipes) Les recettes correspondantes :", storedMatchingRecipes);

  return storedMatchingRecipes;
}



/**
 * Ajoute un écouteur d'événement de recherche à un élément d'entrée.
 *
 * @param {string} inputSelector - Sélecteur de l'élément d'entrée.
 * @param {Array} data - Les données à partir desquelles les correspondances seront recherchées.
 * @param {string} listSelector - Sélecteur de la liste des éléments à afficher.
 * @param {Function} updateListFunc - Fonction de mise à jour de la liste des éléments à afficher.
 */
export function addSearchEventListener(inputSelector, data, listSelector, updateListFunc) {
  const input = document.querySelector(inputSelector);
  input.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    const matchingSet = new Set();

    if (query === "") {
      // Si le champ de recherche est vide, récupérer les items sans doublons
      for (const item of data) {
        matchingSet.add(item);
      }
    } else {
      // Sinon, chercher les items correspondant à la requête
      for (const item of data) {
        if (item.toLowerCase().startsWith(query)) {
          matchingSet.add(item);
        }
      }
    }

    const matchingItems = [...matchingSet].sort((a, b) => a.localeCompare(b, "fr"));

    console.log(`(addSearchEventListener) Résultats correspondants à la recherche '${query}':`, matchingItems);

    updateListFunc(matchingItems, listSelector, query);

  });
}


/**
 * Met à jour la liste des éléments à afficher en fonction des éléments filtrés.
 *
 * @param {Array} filteredItems - Les éléments filtrés.
 * @param {string} listSelector - Sélecteur de la liste des éléments à afficher.
 * @param {string} query - La requête de recherche.
 * @param {string} inputSelector - Sélecteur de l'élément d'entrée de recherche.
 */
export function updateList(filteredItems, listSelector, query, inputSelector) {
  const listContainer = document.querySelector(listSelector);
  listContainer.innerHTML = "";

  const matchingItems = [];

  for (const item of filteredItems) {
    if (item.toLowerCase().includes(query)) {
      matchingItems.push(item);
    }
  }

  console.log(`(updateList) Résultats filtrés pour la requête '${query}':`, matchingItems);

  if (matchingItems.length > 0) {
    const itemsContainer = document.querySelector(listSelector);

    for (const item of matchingItems) {
      const itemElement = createFilterTag(item, document.querySelector(inputSelector), itemsContainer);
      listContainer.appendChild(itemElement);
    }
  }
}
