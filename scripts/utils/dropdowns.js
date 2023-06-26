import {getItems, searchRecipes} from "./searchNativeLoops.js";

let currentOpenDropdown = null;
let isInputVisible = false;

function createElementWithClass(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

function createListElements(data, container) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const element = createElementWithClass('p', 'tag');
    element.textContent = item;
    container.appendChild(element);
  }
}

function closeDropdown(dropdown) {

  const { icon, inputDivElement, customInput, chevron, listDiv } = dropdown;
  icon.style.display = 'none';
  inputDivElement.style.display = 'none';
  customInput.style.display = 'none';
  chevron.classList.remove('fa-solid--up');
  listDiv.style.display = 'none';
  isInputVisible = false;
}

function toggleDropdown(input, icon, inputDivElement, customInput, chevron, listDiv) {


  const dropdown = { input, icon, inputDivElement, customInput, chevron, listDiv };

  input.addEventListener('click', () => {
    if (isInputVisible && dropdown === currentOpenDropdown) { // Si l'input est visible et que le dropdown est le même que celui sur lequel on a cliqué
      closeDropdown(dropdown);
      currentOpenDropdown = null; // Réinitialise le dropdown actuel
    } else {
      if (currentOpenDropdown) { // Si le dropdown est ouvert
        closeDropdown(currentOpenDropdown); // Ferme le dropdown actuel
      }
      icon.style.display = 'block';
      inputDivElement.style.display = 'block';
      customInput.style.display = 'block';
      inputDivElement.style.border = '1px solid lightgrey';
      chevron.classList.add('fa-solid--up');
      listDiv.style.display = 'block';
      currentOpenDropdown = dropdown; // Définit le dropdown actuel comme celui sur lequel on a cliqué
      isInputVisible = true;
    }
  });
}

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

function createBlock(type) {
  let dataType;
  if (type === 'Ingredients') {
    dataType = 'ingredient';
  } else if (type === 'Appareils') {
    dataType = 'appliance';
  } else if (type === 'Ustensiles') {
    dataType = 'ustensil';
  }
  const data = getItems(dataType);
  return createDropdownBlock(type, data);
}

export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  const ingredientsBlock = createBlock('Ingredients');
  const appareilsBlock = createBlock('Appareils');
  const ustensilsBlock = createBlock('Ustensiles');

  dropdownSection.appendChild(ingredientsBlock);
  dropdownSection.appendChild(appareilsBlock);
  dropdownSection.appendChild(ustensilsBlock);

  const dropdownTitle = createElementWithClass('h2', 'dropdown__title');
  dropdownTitle.textContent = '1500 recettes';
  dropdownSection.appendChild(dropdownTitle);
}
