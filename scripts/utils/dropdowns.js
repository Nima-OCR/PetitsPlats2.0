export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  dropdownSection.id = 'dropdown';

  function createDropdownBlock(type) {
    const block = document.createElement('div');
    block.className = 'dropdown__block dropdown__block--' + type;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'dropdown__input dropdown__input--' + type;
    input.placeholder = type;

    block.appendChild(input);

    return block;
  }

  const ingredientBlock = createDropdownBlock('Ingredients');
  const deviceBlock = createDropdownBlock('Appareils');
  const utensilBlock = createDropdownBlock('Ustensiles');

  dropdownSection.appendChild(ingredientBlock);
  dropdownSection.appendChild(deviceBlock);
  dropdownSection.appendChild(utensilBlock);

  const mainElement = document.querySelector('main');
  mainElement.appendChild(dropdownSection);
}
