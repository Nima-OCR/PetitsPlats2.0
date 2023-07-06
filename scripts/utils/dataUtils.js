import {recipes} from "../../data/recipes.js";

export let ingredientsData = [];
export let appliancesData = [];
export let ustensilsData = [];

export function getItemsByType(recipeList, advancedSearchFiltersByType) {
  let filteredItemsByType = new Set();
  let elementType = "";

  recipeList.forEach(recipe => {
    if (advancedSearchFiltersByType === "appliance") {
      filteredItemsByType.add(recipe.appliance);
      appliancesData.push(recipe.appliance);
      elementType = "Appareils";
    } else if (advancedSearchFiltersByType === "ingredient") {
      recipe.ingredients.forEach(ingredientObj => {
        const ingredient = ingredientObj.ingredient.toLowerCase();
        filteredItemsByType.add(ingredient);
        ingredientsData.push(ingredient);
      });
      elementType = "Ingrédients";
    } else if (advancedSearchFiltersByType === "ustensils") {
      recipe.ustensils.forEach(utensil => {
        const lowercaseUtensil = utensil.toLowerCase();
        filteredItemsByType.add(lowercaseUtensil);
        ustensilsData.push(lowercaseUtensil);
      });
      elementType = "Ustensiles";
    }
  });

  console.log(`(getItemsByType) ${elementType} ajoutés :`, Array.from(filteredItemsByType).join(", "));

  return Array.from(filteredItemsByType);
}

export function getItems(type) {
  let items = [];

  recipes.forEach(recipe => {
    if (type === "ingredient") {
      recipe.ingredients.forEach(ingredientObj => {
        const ingredient = ingredientObj.ingredient;
        if (!items.includes(ingredient)) {
          items.push(ingredient);
        }
      });
    } else if (type === "ustensil") {
      recipe.ustensils.forEach(utensil => {
        const lowercaseUstensil = utensil.toLowerCase();
        if (!items.includes(lowercaseUstensil)) {
          items.push(lowercaseUstensil);
        }
      });
    } else if (type === "appliance") {
      if (!items.includes(recipe.appliance)) {
        items.push(recipe.appliance);
      }
    }
  });

  items.sort((a, b) => a.localeCompare(b, "fr"));

  console.log(`(getItems) Liste des '${type}':`, items);

  return items;
}
