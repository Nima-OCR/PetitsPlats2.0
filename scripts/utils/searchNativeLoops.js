import { recipes } from "../../data/recipes.js";

function textIncludes(item, query) {
  const lowerCaseItem = item.toLowerCase();
  return lowerCaseItem.includes(query);
}

function setElementsVisibility(className, displayStyle) {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = displayStyle;
  }
}

function updateSearchResults(results) {
  setElementsVisibility('recipe-article', 'none');

  if (!results.length) {
    setElementsVisibility('recipe-article', 'block');

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
  container.innerHTML = '';

  let hasResults = false;
  let displayedItems = [];

  for (let i = 0; i < matchingRecipes.length; i++) {
    const recipe = matchingRecipes[i];
    let items;

    // Si l'itemType est 'appliance', nous devons le traiter comme une chaîne de caractères
    if (itemType === 'appliance') {
      items = [recipe[itemType].toLowerCase()]; // Créer un tableau avec un seul élément converti en minuscules
    } else {
      items = [];
      for(let i = 0; i < recipe[itemType].length; i++) {
        if (typeof recipe[itemType][i] === 'string') {
          items.push(recipe[itemType][i].toLowerCase());
        } else {
          items.push(recipe[itemType][i].ingredient.toLowerCase());
        }
      }

    }

    for (let j = 0; j < items.length; j++) {
      const item = items[j];

      if (!displayedItems.includes(item)) {
        const itemElement = document.createElement('p');
        itemElement.textContent = item;
        container.appendChild(itemElement);
        displayedItems.push(item);
        hasResults = true;
      }
    }
  }

  if (!hasResults) {
    const noResultsElement = document.createElement('p');
    noResultsElement.textContent = 'Aucun résultat trouvé.';
    container.appendChild(noResultsElement);
  }
}

export function searchRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const matchingRecipes = [];

  if (lowerCaseQuery.length === 0) {
    updateSearchResults(matchingRecipes);
    searchItems(matchingRecipes, 'ingredients', document.querySelector('.dropdown__ingredients-list'));

    // Nous appelons la fonction avec l'appareil
    searchItems(matchingRecipes, 'appliance', document.querySelector('.dropdown__appareils-list'));

    searchItems(matchingRecipes, 'ustensils', document.querySelector('.dropdown__ustensiles-list'));
    return;
  }

  if (lowerCaseQuery.length < 3) {
    return;
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredients = recipe.ingredients;

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

  updateSearchResults(matchingRecipes);
  searchItems(matchingRecipes, 'ingredients', document.querySelector('.dropdown__ingredients-list'));
  searchItems(matchingRecipes, 'appliance', document.querySelector('.dropdown__appareils-list'));
  searchItems(matchingRecipes, 'ustensils', document.querySelector('.dropdown__ustensiles-list'));
}
