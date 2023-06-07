import {recipesOld} from "../../data/recipesOld.js";

// Cette fonction vérifie si une chaîne de caractères (item) contient une autre chaîne (query)
function doesMatch(item, query) {
  const lowerCaseItem = item.toLowerCase();
  return lowerCaseItem.includes(query);
}

// Cette fonction vérifie si un des ingrédients d'une recette contient la chaîne de recherche (query)
function ingredientsMatchQuery(ingredients, query) {
  for (let i = 0; i < ingredients.length; i++) {
    if (doesMatch(ingredients[i].ingredient, query)) {
      return true;
    }
  }
  return false;
}

// Cette fonction crée un élément de type 'div' pour une recette, contenant le nom de la recette
function createRecipeElement(recipe) {
  const recipeElement = document.createElement("div");
  recipeElement.textContent = recipe.name;
  return recipeElement;
}


// Cette fonction met à jour l'interface utilisateur avec les résultats de la recherche. Si aucun résultat n'est trouvé, un message est affiché à l'utilisateur.
function updateSearchResults(results) {
  hideAllRecipes();

  for (let i = 0; i < results.length; i++) {
    const recipeElement = document.getElementById(results[i].id);
    if (recipeElement) {
      recipeElement.style.display = 'block';
    }
  }
}



// Cette fonction cherche les recettes qui correspondent à la recherche dans le nom, les ingrédients et la description et contient au moins 3 caractères.
export function searchRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const searchResults = [];

  if (lowerCaseQuery.length === 0) {
    updateSearchResults(recipesOld);
    return;
  }

  if (lowerCaseQuery.length >= 3) {
    for (let i = 0; i < recipesOld.length; i++) {
      const recipe = recipesOld[i];

      if (
        doesMatch(recipe.name, lowerCaseQuery) ||
        ingredientsMatchQuery(recipe.ingredients, lowerCaseQuery) ||
        doesMatch(recipe.description, lowerCaseQuery)
      ) {
        searchResults.push(recipe);
      }
    }
  }

  updateSearchResults(searchResults);
}


function hideAllRecipes() {
  const recipes = document.getElementsByClassName('recipe-article');
  for (let i = 0; i < recipes.length; i++) {
    recipes[i].style.display = 'none';
  }
}
