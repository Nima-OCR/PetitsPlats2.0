import {recipes} from "../../data/recipes.js";

let currentOpenDropdown = null;
let isInputVisible = false;

// Créer des éléments avec une classe
function createElementWithClass(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

// Extrait les ingrédients
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

// Extrait les appareils
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

// Extrait les ustensiles
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

// Crée un élément pour chaque item
function createListElements(data, container) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const element = createElementWithClass('p', '');
    element.textContent = item;
    container.appendChild(element);
  }
}

// Fermeture des dropdowns
function closeDropdown(dropdown) {
  const {icon, inputDivElement, customInput, chevron, listDiv} = dropdown;
  icon.style.display = 'none';
  inputDivElement.style.display = 'none';
  customInput.style.display = 'none';
  chevron.classList.remove('fa-solid--up');
  listDiv.style.display = 'none';
  isInputVisible = false;
}

// Affiche ou masquage la liste déroulante
function toggleDropdown(input, icon, inputDivElement, customInput, chevron, listDiv) {
  const dropdown = {input, icon, inputDivElement, customInput, chevron, listDiv};

  input.addEventListener('click', () => {
    if (isInputVisible && dropdown === currentOpenDropdown) {
      closeDropdown(dropdown);
      currentOpenDropdown = null;
    } else {
      if (currentOpenDropdown) {
        closeDropdown(currentOpenDropdown);
      }
      icon.style.display = 'block';
      inputDivElement.style.display = 'block';
      customInput.style.display = 'block';
      inputDivElement.style.border = '1px solid lightgrey';
      chevron.classList.add('fa-solid--up');
      listDiv.style.display = 'block';
      currentOpenDropdown = dropdown;
      isInputVisible = true;
    }
  });
}

// Crée un bloc de dropdown
function createDropdownBlock(type, data) {
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

  const divSearchInputElement = createElementWithClass('div', `dropdown__${type.toLowerCase()}-search`);
  inputDivElement.appendChild(divSearchInputElement);

  const customInput = createElementWithClass('input', `dropdown__${type.toLowerCase()}-input`);
  customInput.type = 'text';
  customInput.placeholder = `Chercher un ${type.toLowerCase()}`;
  customInput.style.display = 'none';
  divSearchInputElement.appendChild(customInput);

  const icon = createElementWithClass('i', `fas fa-search dropdown__${type.toLowerCase()}-search__icon`);
  icon.style.display = 'none';
  divSearchInputElement.appendChild(icon);

  const listDiv = createElementWithClass('div', `dropdown__${type.toLowerCase()}-list`);
  createListElements(data, listDiv);
  block.appendChild(listDiv);

  toggleDropdown(input, icon, inputDivElement, customInput, chevron, listDiv);

  return block;
}

// Récupère les données et crée le bloc de dropdown
function createBlock(type) {
  let data;

  if (type === 'Ingredients') {
    data = getIngredients();
  } else if (type === 'Appareils') {
    data = getAppliances();
  } else if (type === 'Ustensiles') {
    data = getUstensils();
  }

  return createDropdownBlock(type, data);
}

// Fonction pour créer la section de menu déroulant
export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  // dropdownSection.id = 'dropdown';

  const ingredientsBlock = createBlock('Ingredients');
  const appareilsBlock = createBlock('Appareils');
  const ustensilesBlock = createBlock('Ustensiles');

  dropdownSection.appendChild(ingredientsBlock);
  dropdownSection.appendChild(appareilsBlock);
  dropdownSection.appendChild(ustensilesBlock);

  const dropdownTitle = createElementWithClass('h2', 'dropdown__title');
  dropdownTitle.textContent = '1500 recettes';
  dropdownSection.appendChild(dropdownTitle);
}
