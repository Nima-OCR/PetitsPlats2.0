import {recipes} from "../../data/recipes.js";

// Fonction pour créer un élément avec une classe
function createElementWithClass(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

// Fonction pour créer la section de menu déroulant
export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  dropdownSection.id = 'dropdown';

  const ingredientsBlock = createBlock('Ingredients');
  const appareilsBlock = createBlock('Appareils');
  const ustensilesBlock = createBlock('Ustensiles');

  dropdownSection.appendChild(ingredientsBlock);
  dropdownSection.appendChild(appareilsBlock);
  dropdownSection.appendChild(ustensilesBlock);
}

// Crée un bloc de dropdown chaque type du menu déroulant
function createBlock(type) {

  const block = createElementWithClass('div', `dropdown__block dropdown__block--${type}`);
  const inputWrapper = createElementWithClass('div', 'dropdown__input-wrapper');
  const input = createElementWithClass('input', `dropdown__input dropdown__input--${type}`);
  input.type = 'text';
  input.placeholder = type;

  const chevron = createElementWithClass('i', 'fa-solid fa-chevron-down');

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(chevron);
  block.appendChild(inputWrapper);

  const inputDivElement = createElementWithClass('div', `dropdown__${type.toLowerCase()}-div`);
  block.appendChild(inputDivElement);

  const divSearchInputElement  = createElementWithClass('div', `dropdown__${type.toLowerCase()}-search`);
  inputDivElement.appendChild(divSearchInputElement);

  const customInput  = createElementWithClass('input', `dropdown__${type.toLowerCase()}-input`);
  customInput.type = 'text';
  customInput.placeholder = `Chercher un ${type.toLowerCase()}`;
  customInput.style.display = 'none';
  divSearchInputElement.appendChild(customInput);

  const icon  = createElementWithClass('i', `fas fa-search dropdown__${type.toLowerCase()}-search__icon`);
  icon.style.display = 'none';
  divSearchInputElement.appendChild(icon);

  const ingredientsListDiv  = createElementWithClass('div', `dropdown__${type.toLowerCase()}-list`);
  const appliancesListDiv  = createElementWithClass('div', `dropdown__${type.toLowerCase()}-list`);
  const ustensilsListDiv  = createElementWithClass('div', `dropdown__${type.toLowerCase()}-list`);

  if (type === 'Ingredients') {
    const ingredients = getIngredients();
    createListElements(ingredients, ingredientsListDiv);
    block.appendChild(ingredientsListDiv);
    toggleDropdown(input, icon, inputDivElement, customInput, chevron, ingredientsListDiv);

  }
  else if (type === 'Appareils') {
    const appliances = getAppliances();
    createListElements(appliances, appliancesListDiv);
    block.appendChild(appliancesListDiv);
    toggleDropdown(input, icon, inputDivElement, customInput, chevron, appliancesListDiv);
  } else if (type === 'Ustensiles') {
    const ustensils = getUstensils();
    createListElements(ustensils, ustensilsListDiv);
    block.appendChild(ustensilsListDiv);
    toggleDropdown(input, icon, inputDivElement, customInput, chevron, ustensilsListDiv);
  }
  return block;
}

// Affiche ou masquage la liste déroulante
function toggleDropdown(input, icon, inputDivElement, customInput, chevron, listDiv) {
  let isInputVisible = false;

  input.addEventListener('click', () => {
    if (isInputVisible) {
      icon.style.display = 'none';
      inputDivElement.style.display = 'none';
      customInput.style.display = 'none';
      chevron.classList.remove('up');
      listDiv.style.display = 'none';
    } else {
      icon.style.display = 'block';
      inputDivElement.style.display = 'block';
      customInput.style.display = 'block';
      inputDivElement.style.border = '1px solid lightgrey';
      chevron.classList.add('up');
      listDiv.style.display = 'block';
    }
    isInputVisible = !isInputVisible;
  });
}

// Crée un élément pour chaque item
function createListElements(data, container) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const element  = createElementWithClass('p', ``);
    element.textContent = item;
    container.appendChild(element);
  }
}

// Extrait les ingrédients et retourne une liste d'ingrédients sans doublons
function getIngredients() {
  const ingredients = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
  }
  return ingredients;
}

// Extrait les appareils et retourne une liste d'appareils sans doublons
function getAppliances() {
  const appliances = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const appliance = recipe.appliance;
    if (!appliances.includes(appliance)) {
      appliances.push(appliance);
    }
  }
  return appliances;
}

// Extrait les ustensiles et retourne une liste d'ustensiles sans doublons
function getUstensils() {
  const ustensils = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.ustensils) {
      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ustensil = recipe.ustensils[j];
        if (!ustensils.includes(ustensil)) {
          ustensils.push(ustensil);
        }
      }
    }
  }
  return ustensils;
}
