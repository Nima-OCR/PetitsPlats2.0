import { recipes } from "../../data/recipes.js";

function textIncludes(item, query) {
  const lowerCaseItem = item.toLowerCase();
  return lowerCaseItem.includes(query);
}

function getItemsByType(matchingRecipes, itemType) {
  const items = [];

  for (let i = 0; i < matchingRecipes.length; i++) {
    const recipe = matchingRecipes[i];

    if (itemType === 'appliance') {
      items.push(recipe.appliance);
    } else if (itemType === 'ingredient') {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient;
        if (ingredient) {
          items.push(ingredient.toLowerCase());
        }
      }
    } else if (itemType === 'ustensil') {
      items.push(...recipe.ustensils);
    }
  }

  return [...new Set(items)];
}

function displaySearchResults(results) {
  const recipeArticles = document.getElementsByClassName('recipe-article');

  for (let i = 0; i < recipeArticles.length; i++) {
    recipeArticles[i].style.display = 'none';
  }

  if (results.length === 0) {
    for (let i = 0; i < recipeArticles.length; i++) {
      recipeArticles[i].style.display = 'block';
    }
  } else {
    for (let i = 0; i < results.length; i++) {
      const recipeElement = document.getElementById(results[i].id);
      if (recipeElement) {
        recipeElement.style.display = 'block';
      }
    }
  }
}

function searchItems(matchingRecipes, itemType, container) {
  const items = getItemsByType(matchingRecipes, itemType);

  if (items.length === 0) {
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'Aucun résultat trouvé.';
    container.appendChild(noResultsElement);
  } else {
    for (let i = 0; i < items.length; i++) {
      const itemElement = document.createElement('p');
      itemElement.textContent = items[i];
      container.appendChild(itemElement);
    }
  }
}

export function findMatchingRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const matchingRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredients = recipe.ingredients;

    if (lowerCaseQuery.length >= 3) {
      if (textIncludes(recipe.name, lowerCaseQuery)) {
        matchingRecipes.push(recipe);
      } else {
        for (let j = 0; j < ingredients.length; j++) {
          const ingredient = ingredients[j].ingredient.toLowerCase();
          if (ingredient.includes(lowerCaseQuery)) {
            matchingRecipes.push(recipe);
            break;
          }
        }
      }
    }
  }

  return matchingRecipes;
}

export function getItems(type) {
  const items = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (type === 'ingredient') {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient;
        if (!items.includes(ingredient)) {
          items.push(ingredient);
        }
      }
    } else if (type === 'ustensil') {
      for (let j = 0; j < recipe.ustensils.length; j++) {
        const utensil = recipe.ustensils[j];
        if (!items.includes(utensil)) {
          items.push(utensil);
        }
      }
    } else if (type === 'appliance') {
      const appliance = recipe.appliance;
      if (!items.includes(appliance)) {
        items.push(appliance);
      }
    }
  }
  return items;
}

export function searchRecipes(query) {
  const matchingRecipes = findMatchingRecipes(query);
  displaySearchResults(matchingRecipes);

  const ingredientsList = document.querySelector('.dropdown__ingredients-list');
  const appliancesList = document.querySelector('.dropdown__appareils-list');
  const ustensilsList = document.querySelector('.dropdown__ustensiles-list');

  ingredientsList.innerHTML = '';
  appliancesList.innerHTML = '';
  ustensilsList.innerHTML = '';

  searchItems(matchingRecipes, 'ingredient', ingredientsList);
  searchItems(matchingRecipes, 'appliance', appliancesList);
  searchItems(matchingRecipes, 'ustensil', ustensilsList);
}
