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

/**
 * Fonction exécutée lorsque le contenu de la page est chargé.
 */
document.addEventListener('DOMContentLoaded', () => {
  const ingredientsList = document.querySelector('.dropdown__ingredients-list');
  const appliancesList = document.querySelector('.dropdown__appareils-list');
  const utensilsList = document.querySelector('.dropdown__ustensiles-list');


  const ingredientsInput = document.querySelector('.dropdown__ingredients-input');
  const appliancesInput = document.querySelector('.dropdown__appareils-input');
  const utensilsInput = document.querySelector('.dropdown__ustensiles-input');
  const style = `
    width: 203px;
    height: 53px;
    background-color: #FFD15B;
    border-radius: 10px;
    align-items: center;
    padding: 17px 18px;
    margin-top: 15px;
    display: flex;
    gap: 60px;
    justify-content: space-between;
    font-family: 'Manrope', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
  `;

  /**
   * Crée une nouvelle div pour le filtre.
   *
   * @param {string} ingredientName - Le nom de l'ingrédient.
   * @param {HTMLElement} ingredientElement - L'élément HTML de l'ingrédient.
   * @returns {HTMLDivElement} - La nouvelle div créée.
   */
  function createFilterTag(ingredientName, ingredientElement) {
    const tagDiv = document.createElement('div');
    tagDiv.textContent = ingredientName;
    tagDiv.style.cssText = style;



    const closeButton = createCloseButton(tagDiv, ingredientElement);

    tagDiv.appendChild(closeButton);
    return tagDiv;
  }

  function createCloseButton(tagDiv, ingredientElement) {
    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
      tagDiv.remove();
      ingredientElement.style.backgroundColor = "";
    });

    return closeButton;
  }


  function searchAndRenderRecipes(query = '') {
    searchRecipes(query);
    createListElements(getItems('ingredient'), ingredientsList);

  }

  ingredientsInput.addEventListener('input', (event) => {
    attachInputListener(ingredientsInput, ingredientsList, 'ingredient');

  });

  appliancesInput.addEventListener('input', (event) => {
    attachInputListener(appliancesInput, appliancesList, 'appliance');

  });

  utensilsInput.addEventListener('input', (event) => {
    attachInputListener(utensilsInput, utensilsList, 'utensil');
  });

  function attachInputListener(input, list, type) {
    input.addEventListener('input', (event) => {
      const query = event.target.value;
      searchAndRenderRecipes(query);
      searchRecipes(query);
      if (list) {
        const items = list.querySelectorAll('p');
        addListItemsEventListeners(items, type, list, createFilterTag);
      }
    });
  }

  function filterRecipesByTag(tagValue) {
    console.log('recettes filtrées par tag:', tagValue);
    searchAndRenderRecipes(tagValue);
  }

  function addListItemsEventListeners(listItems, type, listContainer, createFilterTag) {
    for (let i = 0; i < listItems.length; i++) {
      const element = listItems[i];
      element.style.cursor = 'pointer';

      element.addEventListener('click', (e) => {
        console.log(`Clicked on ${type}`);
        const itemName = e.target.textContent;

        e.target.style.backgroundColor = '#FFD15B';
        const tagDiv = createFilterTag(itemName, e.target);
        listContainer.insertAdjacentElement('afterend', tagDiv);

        filterRecipesByTag(itemName);
      });
    }
  }
});
