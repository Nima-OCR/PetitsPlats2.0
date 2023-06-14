import { recipes } from "../../data/recipes.js";

// Permet de vérifier si une partie du texte correspond à la recherche effectuée par l'utilisateur.
function textIncludes(item, query) {
  const lowerCaseItem = item.toLowerCase();
  return lowerCaseItem.includes(query);
}

// Vérification de correspondance d'une recette avec une requête
function isQueryContainedInRecipe(name, ingredients, description, query) {
  if (textIncludes(name, query)) {
    return true;
  }

  for (let i = 0; i < ingredients.length; i++) {
    if (textIncludes(ingredients[i].ingredient, query)) {
      return true;
    }
  }

  if (textIncludes(description, query)) {
    return true;
  }

  return false;
}

// Cette fonction masque toutes les recettes
function hideAllElements(className) {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'none';
  }
}


// Met à jour l'interface utilisateur avec les résultats de la recherche.
function updateSearchResults(results) {
  hideAllElements('recipe-article');

  if (!results.length) {
    // Affiche toutes les recettes si aucun résultat n'est trouvé
    for (let i = 0; i < recipes.length; i++) {
      const recipeElement = document.getElementById(recipes[i].id);
      if (recipeElement) {
        recipeElement.style.display = 'block';
      }
    }
  } else {
    // Affiche les recettes correspondantes aux résultats de recherche
    for (let i = 0; i < results.length; i++) {
      const recipeElement = document.getElementById(results[i].id);
      if (recipeElement) {
        recipeElement.style.display = 'block';
      }
    }
  }
}

// Effectue la recherche de recettes en fonction de l'input fournie
export function searchRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const searchResults = [];

  if (lowerCaseQuery.length === 0) {
    // Affiche toutes les recettes si la recherche est vide
    updateSearchResults(recipes);
    return;
  }

  if (lowerCaseQuery.length < 3) {
    return; // La recherche n'est pas effectuée si elle contient moins de 3 caractères
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    if (
      textIncludes(recipe.name, lowerCaseQuery) ||
      isQueryContainedInRecipe(recipe.name, recipe.ingredients, recipe.description, lowerCaseQuery)
    ) {
      searchResults.push(recipe);
    }
  }

  updateSearchResults(searchResults);
}
