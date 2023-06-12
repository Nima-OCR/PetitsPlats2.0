import {recipes} from "../../data/recipes.js";




function createElementWithClass(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

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

  const dropdownList = document.createElement('ul');
  dropdownList.className = `dropdown__list dropdown__list--${type}`;

  block.appendChild(dropdownList);

  const inputDivElement = document.createElement('div');
  inputDivElement.className = `dropdown__${type.toLowerCase()}-div`;
  block.appendChild(inputDivElement);

  const ingredientsListDiv = document.createElement('div');
  ingredientsListDiv.className = `dropdown__${type.toLowerCase()}-ingredients`;


  const divSearchInputElement = document.createElement('div');
  divSearchInputElement.className = `dropdown__${type.toLowerCase()}-search`;
  inputDivElement.appendChild(divSearchInputElement);

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.className = `dropdown__${type.toLowerCase()}-input`;
  customInput.placeholder = `Chercher un ${type.toLowerCase()}`;
  customInput.style.display = 'none';
  divSearchInputElement.appendChild(customInput);

  const icon = document.createElement('i');
  icon.className = `fas fa-search dropdown__${type.toLowerCase()}-search__icon`;
  icon.style.display = 'none';
  divSearchInputElement.appendChild(icon);

  if (type === 'Ingredients') {

    ingredientsDropdown(input, icon, inputDivElement, customInput, chevron);
    const allIngredients = getIngredients();
    const ingredientsListDiv = document.createElement('div');
    ingredientsListDiv.className = `dropdown__${type.toLowerCase()}-list`;
    ingredientsListDiv.style.display = 'block';

    createListElements(allIngredients, ingredientsListDiv);
    block.appendChild(ingredientsListDiv);

  } else if (type === 'Appareils') {
    appareilsDropdown(input, icon, inputDivElement, customInput, chevron);
    const appliances = getAppliances();
    const appliancesListDiv = document.createElement('div');
    appliancesListDiv.className = `dropdown__${type.toLowerCase()}-list`;
    appliancesListDiv.style.display = 'block';
    createListElements(appliances, appliancesListDiv);
    block.appendChild(appliancesListDiv);


  } else if (type === 'Ustensiles') {
    ustensilesDropdown(input, icon, inputDivElement, customInput, chevron);
    const ustensils = getUstensils();
    const ustensilsListDiv = document.createElement('div');
    ustensilsListDiv.className = `dropdown__${type.toLowerCase()}-list`;
    ustensilsListDiv.style.display = 'block';
    createListElements(ustensils, ustensilsListDiv);
    block.appendChild(ustensilsListDiv);
  }

  return block;
}

function ingredientsDropdown(input, icon, inputDivElement, customInput, chevron) {
  inputVisibility(input, icon, inputDivElement, customInput, chevron);
}

function appareilsDropdown(input, icon, inputDivElement, customInput, chevron) {
  inputVisibility(input, icon, inputDivElement, customInput, chevron);
}

function ustensilesDropdown(input, icon, inputDivElement, customInput, chevron) {
  inputVisibility(input, icon, inputDivElement, customInput, chevron);
}

function inputVisibility(input, icon, inputDivElement, customInput, chevron) {
  let isInputVisible = false;

  input.addEventListener('click', () => {
    if (isInputVisible) {
      icon.style.display = 'none';
      inputDivElement.style.display = 'none';
      customInput.style.display = 'none';
      chevron.classList.remove('up');
    } else {
      icon.style.display = 'block';
      inputDivElement.style.display = 'block';
      customInput.style.display = 'block';
      inputDivElement.style.border = '1px solid lightgrey';
      chevron.classList.add('up');
    }
    isInputVisible = !isInputVisible;
  });
}



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





function createListElements(data, container) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const element = document.createElement('p');
    element.textContent = item;
    container.appendChild(element);
  }
}
