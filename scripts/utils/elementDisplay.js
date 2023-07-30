import {recipes} from "../../data/recipes.js";
import {getItemsByType} from "./dataExtraction.js";
import {filterItems, searchRecipes} from "./searchAndFilter.js";


    export function createAndDisplayElements(type, items) {
      // Trouver l'élément parent pour le type (ingrédients, appareils ou ustensiles)
      const parentElement = document.querySelector(`.dropdown__${type}-list`);

      // Supprimer tous les enfants existants de l'élément parent
      while (parentElement.firstChild) {
        parentElement.firstChild.remove();
      }

      // Créer et ajouter de nouveaux enfants à l'élément parent
      items.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = item;

        // Ajouter la classe 'tag'
        itemElement.classList.add('tag');

        parentElement.appendChild(itemElement);
      });

    }

    export function handleInput(inputSelector, type) {
      document.querySelector(inputSelector).addEventListener('input', function(e) {
        let searchTerm = e.target.value;

        let searchResults = searchRecipes(recipes, searchTerm);

        let items = getItemsByType(searchResults, type);

        let filteredItems = filterItems(items, searchTerm);

        // Mettre à jour les éléments de la page avec les nouveaux tableaux.
        createAndDisplayElements(type, filteredItems);
      });
    }

