import {recipesOld} from "../../data/recipesOld.js";

export function createRecipeCard() {

  const mainElement = document.querySelector('main');
  const section = document.getElementById('recipes');
  section.id = 'recipes';


  for (const recipe of recipesOld) {
    const { id, name, ingredients, time, description} = recipe;

    // Article
    const article = document.createElement('article');
    article.className = 'recipe-article';
    article.setAttribute('id', id);

    // Img
    const image = document.createElement('img');
    if(id < 10) {
      image.src = `assets/images/Recette0${id}.jpg`;
    } else {
      image.src = `assets/images/Recette${id}.jpg`;
    }
    image.alt = `${name} image`;
    image.className = 'recipe-card__image';

    // title-duration
    const titleDurationElem = document.createElement('div');
    titleDurationElem.className = 'recipe-card__title-duration';

    const title = document.createElement('h2');
    title.className = 'recipe-card__title';
    title.textContent = name;

    const duration = document.createElement('p');
    duration.className = 'recipe-card__duration';
    duration.textContent = `${time} min`;

    // Ajout des éléments h2 et p à la div
    titleDurationElem.appendChild(title);
    titleDurationElem.appendChild(duration);

    // content
    const content = document.createElement('div');
    content.className = 'recipe-card__content';

    const titleDivElem = document.createElement('div');
    titleDivElem.className = 'recipe-card__ingredients-title';
    content.appendChild(titleDivElem);

    const titleElem = document.createElement('h2');
    titleElem.textContent = 'Recettes';
    titleDivElem.appendChild(titleElem);

    const recipeDescription = document.createElement('p');
    recipeDescription.className = 'recipe-card__description';
    recipeDescription.textContent = description;

    // Title ingredients
    const titleQtyElem = document.createElement('h2');
    titleQtyElem.textContent = 'Ingrédients';
    titleQtyElem.className = 'recipe-card__ingredients-title-qty';

    // List ingredients
    const ingredientsElem = document.createElement('ul');
    ingredientsElem.className = 'recipe-card__ingredients';

    for (const ingredient of ingredients) {
      const ingredientElem = document.createElement('li');
      const ingredientNameElem = document.createElement('span');
      ingredientNameElem.className = 'recipe-card__ingredient-name';
      ingredientNameElem.textContent = `${ingredient.ingredient} : `;
      ingredientElem.appendChild(ingredientNameElem);

      const ingredientQuantityElem = document.createElement('span');
      ingredientQuantityElem.className = 'recipe-card__ingredient-quantity';
      ingredientQuantityElem.textContent = (ingredient.quantity || ingredient.unit ? `${ingredient.quantity || ''} ${ingredient.unit || ''}` : "-");

      ingredientElem.appendChild(ingredientQuantityElem);
      ingredientsElem.appendChild(ingredientElem);
    }


    article.appendChild(image);
    article.appendChild(titleDurationElem);
    article.appendChild(content);

    titleDivElem.appendChild(recipeDescription);

    content.appendChild(titleQtyElem);
    content.appendChild(ingredientsElem);

    section.appendChild(article);


  }

  mainElement.appendChild(section);
}
