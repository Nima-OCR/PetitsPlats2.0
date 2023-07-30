
import {recipes} from "../../data/recipes.js";
import {createRecipeCard} from "../factories/reciepes.js";
import {getItemsByType} from "./dataExtraction.js";
import {createAndDisplayElements} from "./elementDisplay.js";
import {searchRecipes} from "./searchAndFilter.js";

export function displayFormSection() {
  const section = document.createElement("section");
  section.classList.add("form-section");

  const form = document.createElement("form");
  form.classList.add("form-section__form");
  form.setAttribute("action", "/search");
  form.setAttribute("method", "get");

  const input = document.createElement("input");
  input.classList.add("form-section__input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Rechercher une recette, un ingrédient, ...");
  input.setAttribute("tabindex", "0");
  input.setAttribute("aria-label", "Rechercher une recette, un ingrédient, ...");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-search", "form-section__input-icon");

  form.appendChild(input);
  form.appendChild(icon);
  section.appendChild(form);

  const headerElement = document.querySelector("header");
  headerElement.appendChild(section);

  document.querySelector('.form-section__input').addEventListener('input', function(e) {
    let searchTerm = e.target.value;

    // Obtenez des références à vos éléments de liste déroulante
    const ingredientSection = document.querySelector('.dropdown__ingredients-list');
    const appliancesSection = document.querySelector('.dropdown__appareils-list');
    const utensilsSection = document.querySelector('.dropdown__ustensiles-list');

    if (searchTerm.length === 0) {
      // Réinitialisez l'affichage des recettes
      const recipeSection = document.querySelector('#recipes');
      while(recipeSection.firstChild) {
        recipeSection.removeChild(recipeSection.firstChild);
      }

      // Affichez toutes les recettes originales
      recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeSection.appendChild(recipeCard);
      });

      // Réinitialisez l'affichage des éléments de liste déroulante
      ingredientSection.innerHTML = '';
      appliancesSection.innerHTML = '';
      utensilsSection.innerHTML = '';

      // Affichez tous les ingrédients, appareils et ustensiles d'origine
      let originalIngredients = getItemsByType(recipes, 'ingredients');
      let originalAppliances = getItemsByType(recipes, 'appliances');
      let originalUtensils = getItemsByType(recipes, 'utensils');
      createAndDisplayElements('ingredients', originalIngredients);
      createAndDisplayElements('appareils', originalAppliances);
      createAndDisplayElements('ustensiles', originalUtensils);

      return;
    }

    if (searchTerm.length < 3) {
      return;
    }

    let searchResults = searchRecipes(recipes, searchTerm);

    if (searchResults.length === 0) {
      const recipeSection = document.querySelector('#recipes');
      recipeSection.innerHTML = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc...`;
      return;
    }

    let ingredients = getItemsByType(searchResults, 'ingredients');
    let appliances = getItemsByType(searchResults, 'appliances');
    let utensils = getItemsByType(searchResults, 'utensils');

    // Affiche le contenu de chaque tableau unique dans la console
    console.log('Ingrédients :', ingredients);
    console.log('Appareils :', appliances);
    console.log('Ustensiles :', utensils);

    // Mettre à jour les éléments de la page avec les nouveaux tableaux.
    createAndDisplayElements('ingredients', ingredients);
    createAndDisplayElements('appareils', appliances);
    createAndDisplayElements('ustensiles', utensils);

    // Trouvez l'élément parent dans le DOM où vous voulez afficher les recettes
    const recipeSection = document.querySelector('#recipes');

    // Supprimez les recettes précédentes affichées
    while(recipeSection.firstChild) {
      recipeSection.removeChild(recipeSection.firstChild);
    }

    // Affichez chaque recette qui correspond à la recherche de l'utilisateur
    searchResults.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      recipeSection.appendChild(recipeCard);
    });
  });
}
