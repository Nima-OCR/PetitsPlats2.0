import { recipesOld } from "../../data/recipesOld.js";

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

// Cette fonction met à jour l'interface utilisateur avec les résultats de la recherche. Si aucun résultat n'est trouvé, affiche toutes les recettes.
function updateSearchResults(results) {
  hideAllRecipes();

  if (results.length === 0) {
    // Afficher toutes les recettes si aucun résultat n'est trouvé
    for (let i = 0; i < recipesOld.length; i++) {
      const recipeElement = document.getElementById(recipesOld[i].id);
      if (recipeElement) {
        recipeElement.style.display = 'block';
      }
    }
  } else {
    // Afficher les recettes correspondantes aux résultats de recherche
    for (let i = 0; i < results.length; i++) {
      const recipeElement = document.getElementById(results[i].id);
      if (recipeElement) {
        recipeElement.style.display = 'block';
      }
    }
  }
}

// Cette fonction effectue la recherche de recettes en fonction de la chaîne de recherche fournie
export function searchRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const searchResults = [];

  if (lowerCaseQuery.length === 0) {
    // Afficher toutes les recettes si la chaîne de recherche est vide
    updateSearchResults(recipesOld);
    return;
  }

  if (lowerCaseQuery.length < 3) {
    return; // La recherche n'est pas effectuée si la chaîne de recherche contient moins de 3 caractères
  }

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

  updateSearchResults(searchResults);
}

// Cette fonction masque toutes les recettes de l'interface utilisateur
export function hideAllRecipes() {
  const recipes = document.getElementsByClassName('recipe-article');
  for (let i = 0; i < recipes.length; i++) {
    recipes[i].style.display = 'none';
  }
}
