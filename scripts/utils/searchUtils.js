import { recipes } from "../../data/recipes.js";
import { createFilterTag } from "./filterTag.js";

export function textIncludes(item, query) {
  const lowerCaseItem = item.toLowerCase();
  return lowerCaseItem.includes(query);
}

let storedMatchingRecipes = [];

export function findMatchingRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const matchingRecipes = [];

  recipes.forEach(recipe => {
    const ingredients = recipe.ingredients;
    const appliance = recipe.appliance.toLowerCase();
    let ustensils = [];

    recipe.ustensils.forEach(utensil => {
      ustensils.push(utensil.toLowerCase());
    });

    if (lowerCaseQuery.length >= 3) {
      if (
        textIncludes(recipe.name, lowerCaseQuery) ||
        textIncludes(recipe.description, lowerCaseQuery) ||
        appliance.includes(lowerCaseQuery)
      ) {
        matchingRecipes.push(recipe);
      } else {
        ingredients.forEach(ingredientObj => {
          const ingredient = ingredientObj.ingredient.toLowerCase();
          if (ingredient.includes(lowerCaseQuery)) {
            matchingRecipes.push(recipe);
            return;
          }
        });

        ustensils.forEach(utensil => {
          if (utensil.includes(lowerCaseQuery)) {
            matchingRecipes.push(recipe);
            return;
          }
        });
      }
    }
  });

  storedMatchingRecipes = matchingRecipes;

  console.log("(findMatchingRecipes) Les recettes correspondantes :", storedMatchingRecipes);

  return storedMatchingRecipes;
}

export function addSearchEventListener(inputSelector, data, listSelector, updateListFunc) {
  const input = document.querySelector(inputSelector);
  input.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    const matchingSet = new Set();

    if (query === "") {
      data.forEach(item => {
        matchingSet.add(item);
      });
    } else {
      data.forEach(item => {
        if (item.toLowerCase().startsWith(query)) {
          matchingSet.add(item);
        }
      });
    }

    const matchingItems = [...matchingSet].sort((a, b) => a.localeCompare(b, "fr"));

    console.log(`(addSearchEventListener) Résultats correspondants à la recherche '${query}':`, matchingItems);

    updateListFunc(matchingItems, listSelector, query, inputSelector);

  });
}

export function updateList(filteredItems, listSelector, query, inputSelector) {
  const listContainer = document.querySelector(listSelector);
  listContainer.innerHTML = "";

  const matchingItems = filteredItems.filter(item => item.toLowerCase().includes(query));

  console.log(`(updateList) Résultats filtrés pour la requête '${query}':`, matchingItems);

  if (matchingItems.length > 0) {
    const itemsContainer = document.querySelector(listSelector);

    matchingItems.forEach(item => {
      const itemElement = createFilterTag(item, document.querySelector(inputSelector), itemsContainer);
      listContainer.appendChild(itemElement);
    });
  }
}
