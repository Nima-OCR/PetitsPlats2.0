export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  dropdownSection.id = 'dropdown';

  function createBlock(type) {

    const block = document.createElement('div');
    block.className = `dropdown__block dropdown__block--${type}`;

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'dropdown__input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = `dropdown__input dropdown__input--${type}`;
    input.placeholder = type;

    const chevron = document.createElement('i');
    chevron.className = 'fa-solid fa-chevron-down';

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

    let isInputVisible = false;

    input.addEventListener('click', () => {
      if (isInputVisible) {
        icon.style.display = 'none';
        inputDivElement.style.display = 'none';
        customInput.style.display = 'none';
        dropdownList.classList.remove('show');
        chevron.classList.remove('up');
      } else {
        icon.style.display = 'block';
        inputDivElement.style.display = 'block';
        customInput.style.display = 'block';
        divSearchInputElement.style.border = '1px solid lightgrey';
        dropdownList.classList.add('show');
        chevron.classList.add('up');
      }
      isInputVisible = !isInputVisible;
    });

    return block;
  }

  const ingredientsBlock = createBlock('Ingredients');
  const appareilsBlock = createBlock('Appareils');
  const ustensilesBlock = createBlock('Ustensiles');

  dropdownSection.appendChild(ingredientsBlock);
  dropdownSection.appendChild(appareilsBlock);
  dropdownSection.appendChild(ustensilesBlock);

  const mainElement = document.querySelector('main');
  mainElement.appendChild(dropdownSection);
}
