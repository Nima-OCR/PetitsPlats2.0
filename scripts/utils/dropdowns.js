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
  } else if (type === 'Appareils') {
    appareilsDropdown(input, icon, inputDivElement, customInput, chevron);
  } else if (type === 'Ustensiles') {
    ustensilesDropdown(input, icon, inputDivElement, customInput, chevron);
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
