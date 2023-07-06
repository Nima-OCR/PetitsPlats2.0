import {recipes} from "../../data/recipes.js";

/**
 * Récupère les éléments de type spécifié à partir de la liste de recettes.
 * Cette fonction est utilisée pour filtrer les éléments affichés dans la liste déroulante.
 * @param {Array} recipeList - La liste de recettes.
 * @param {string} advancedSearchFiltersByType - Le type de filtre de recherche avancée.
 * @returns {Array} - Les éléments correspondants au type spécifié.
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

  console.log(`(getItemsByType) ${elementType} ajoutés :`, [...filteredItemsByType].join(", "));

  return [...filteredItemsByType];
}



/**
 * Récupère tous les éléments (ingredient, ustensil ou appliance) à partir
 * de la liste de recettes indépendamment du contexte de filtrage.
 *
 * @param {string} type - Le type d'élément (ingredient, ustensil, appliance).
 * @returns {Array} - Les éléments du type spécifié.
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

  console.log(`(getItems) Liste des '${type}':`, items);
  return items;
}
