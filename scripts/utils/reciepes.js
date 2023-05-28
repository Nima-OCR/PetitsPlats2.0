import {recipesOld} from "../../data/recipesOld.js";

export function createRecipeCard() {

  const mainElement = document.querySelector('main');
  const section = document.getElementById('recipes');
  section.id = 'recipes';


  for (const recipe of recipesOld) {
    const { id, name, servings, ingredients, time, description} = recipe;

    const article = document.createElement('article');
    article.className = 'recipe-article';
    article.setAttribute('id', id);

    const image = document.createElement('img');
    if(id < 10) {
      image.src = `assets/images/Recette0${id}.jpg`;
    } else {
      image.src = `assets/images/Recette${id}.jpg`;
    }
    image.alt = `${name} image`;
    image.className = 'recipe-card__image';

    const content = document.createElement('div');
    content.className = 'recipe-card__content';

    const ingredientsElem = document.createElement('ul');
    ingredientsElem.className = 'recipe-card__ingredients';
    for (const ingredient of ingredients) {
      const ingredientElem = document.createElement('li');
      const ingredientSpanElem = document.createElement('span');
      ingredientSpanElem.className = 'recipe-card__ingredient-name';
      ingredientSpanElem.textContent = `${ingredient.ingredient} : `;
      ingredientElem.appendChild(ingredientSpanElem);
      ingredientElem.appendChild(document.createTextNode(`${ingredient.quantity || ''} ${ingredient.unit || ''}`));
      ingredientsElem.appendChild(ingredientElem);
    }


    const recipeDescription = document.createElement('p');
    recipeDescription.className = 'recipe-card__description';
    recipeDescription.textContent = description;

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

    const servingsElem = document.createElement('p');
    servingsElem.className = 'recipe-card__servings';
    servingsElem.textContent = `Portions : ${servings}`;


    content.appendChild(ingredientsElem);
    content.appendChild(recipeDescription);


    article.appendChild(content);
    article.appendChild(image);
    article.appendChild(titleDurationElem);

    article.appendChild(content);
    section.appendChild(article);

  }

  mainElement.appendChild(section);
}
