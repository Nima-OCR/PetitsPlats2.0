import {createRecipeCard} from "../factories/reciepes.js";



    export function displayRecipe(recipe) {
  // Créez la carte de recette
  const recipeCard = createRecipeCard(recipe);

  // Trouvez l'élément parent dans le DOM
  const recipeSection = document.querySelector('#recipe-section');

  // Ajoutez la carte de recette à l'élément parent
  recipeSection.appendChild(recipeCard);
}

