import {recipes} from "../../data/recipes.js";

function createElement(type, className, textContent) {
  const element = document.createElement(type);
  element.className = className;
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

export function createRecipeCard(recipe) {
  const {id, name, ingredients, time, description} = recipe;

  // Article
  const article = createElement('article', 'recipe-article');
  article.setAttribute('id', id);

  // Img
  const image = createElement('img', 'recipe-card__image');
  if (id < 10) {
    image.src = `assets/images/Recette0${id}.jpg`;
  } else {
    image.src = `assets/images/Recette${id}.jpg`;
  }
  image.alt = `${name} image`;

  // title-duration
  const titleDurationElem = createElement('div', 'recipe-card__title-duration');
  const title = createElement('h2', 'recipe-card__title', name);
  const duration = createElement('p', 'recipe-card__duration', `${time} min`);

  titleDurationElem.appendChild(title);
  titleDurationElem.appendChild(duration);

  // content
  const content = createElement('div', 'recipe-card__content');
  const titleDivElem = createElement('div', 'recipe-card__ingredients-title');
  content.appendChild(titleDivElem);

  const titleElem = createElement('h2', null, 'Recettes');
  titleDivElem.appendChild(titleElem);

  const recipeDescription = createElement('p', 'recipe-card__description', description);
  titleDivElem.appendChild(recipeDescription);


  // Title ingredients
  const titleQtyElem = createElement('h2', 'recipe-card__ingredients-title-qty', 'Ingrédients');

  // List ingredients
  const ingredientsElem = createElement('ul', 'recipe-card__ingredients');

  for (const ingredient of ingredients) {
    const ingredientElem = createElement('li');
    const ingredientNameElem = createElement('span', 'recipe-card__ingredient-name', `${ingredient.ingredient} : `);
    ingredientElem.appendChild(ingredientNameElem);

    const ingredientQuantityElem = createElement('span', 'recipe-card__ingredient-quantity', (ingredient.quantity || ingredient.unit ? `${ingredient.quantity || ''} ${ingredient.unit || ''}` : "-"));
    ingredientElem.appendChild(ingredientQuantityElem);
    ingredientsElem.appendChild(ingredientElem);
  }

  article.appendChild(image);
  article.appendChild(titleDurationElem);
  article.appendChild(content);

  titleDivElem.appendChild(recipeDescription);

  content.appendChild(titleQtyElem);
  content.appendChild(ingredientsElem);

  return article;
}

  export function renderRecipes(recipes) {
  const mainElement = document.querySelector('main');
  const section = document.getElementById('recipes');
  section.innerHTML = '';
  for (const recipe of recipes) {
    section.appendChild(createRecipeCard(recipe));
  }
  mainElement.appendChild(section);
}

renderRecipes(recipes);

