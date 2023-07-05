import {recipes} from "../../data/recipes.js";

/**
 * Obtient les éléments d'une liste de recettes en fonction du type spécifié.
 *
 * @param {Object[]} recipeList - La liste des recettes.
 * @param {string} advancedSearchFiltersByType - Le type de filtre de recherche avancée (ingredient, appliance, ustensils).
 * @returns {string[]} - Les éléments filtrés par type.
 */
export let ingredientsData = [];
export let appliancesData = [];
export let ustensilsData = [];

export function getItemsByType(recipeList, advancedSearchFiltersByType) {
  const filteredItemsByType = new Set();
  let elementType = "";

  if (advancedSearchFiltersByType === "appliance") {
    elementType = "Appareils";
  } else if (advancedSearchFiltersByType === "ingredient") {
    elementType = "Ingrédients";
  } else if (advancedSearchFiltersByType === "ustensils") {
    elementType = "Ustensiles";
  }

  for (const recipe of recipeList) {
    if (advancedSearchFiltersByType === "appliance") {
      const appliance = recipe.appliance;
      filteredItemsByType.add(appliance);
      appliancesData.push(appliance);
    } else if (advancedSearchFiltersByType === "ingredient") {
      for (const ingredientObj of recipe.ingredients) {
        const ingredient = ingredientObj.ingredient.toLowerCase();
        if (ingredient) {
          filteredItemsByType.add(ingredient);
          ingredientsData.push(ingredient);
        }
      }
    } else if (advancedSearchFiltersByType === "ustensils") {
      for (const utensil of recipe.ustensils) {
        const lowercaseUtensil = utensil.toLowerCase();
        filteredItemsByType.add(lowercaseUtensil);
        ustensilsData.push(lowercaseUtensil);
      }
    }
  }

  console.log(`${elementType} ajoutés :`, [...filteredItemsByType].join(", "));

  return [...filteredItemsByType];
}



/**
 * Obtient les éléments par type à partir des recettes.
 *
 * @param {string} type - Le type d'éléments à récupérer (ingredient, ustensil, appliance).
 * @returns {string[]} Les éléments correspondants au type spécifié.
 */
export function getItems(type) {
  const items = [];

  for (const recipe of recipes) {
    if (type === "ingredient") {
      for (const ingredientObj of recipe.ingredients) {
        const ingredient = ingredientObj.ingredient;
        if (!items.includes(ingredient)) {
          items.push(ingredient);
        }
      }
    } else if (type === "ustensil") {
      for (const ustensil of recipe.ustensils) {
        const lowercaseUstensil = ustensil.toLowerCase();
        if (!items.includes(lowercaseUstensil)) {
          items.push(lowercaseUstensil);
        }
      }
    } else if (type === "appliance") {
      const appliance = recipe.appliance;
      if (!items.includes(appliance)) {
        items.push(appliance);
      }
    }
  }

  items.sort((a, b) => a.localeCompare(b, "fr"));

  return items;
}
