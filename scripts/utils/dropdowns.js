export function createDropdownSection() {
  const dropdownSection = document.getElementById('dropdown');
  dropdownSection.id = 'dropdown';

  function createDropdownBlock(type) {
    const block = document.createElement('div');
    block.className = 'dropdown__block dropdown__block--' + type;

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'dropdown__input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'dropdown__input dropdown__input--' + type;
    input.placeholder = type;

    const chevron = document.createElement('i');
    chevron.className = 'fa-solid fa-chevron-down';

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(chevron);
    block.appendChild(inputWrapper);

    const dropdownList = document.createElement('ul');
    dropdownList.className = 'dropdown__list dropdown__list--' + type;

    block.appendChild(dropdownList);

    if (type === 'Ingredients' || 'Appareils' || 'Ustensiles') {
      const ingredientInput = document.createElement('input');
      ingredientInput.type = 'text';
      ingredientInput.className = 'dropdown__ingredient-input';
      ingredientInput.placeholder = 'Chercher une recette';
      ingredientInput.style.display = 'none';

      block.appendChild(ingredientInput);

      let isIngredientInputVisible = false;

      input.addEventListener('click', () => {
        if (isIngredientInputVisible) {
          ingredientInput.style.display = 'none';
          dropdownList.classList.remove('show');
        } else {
          ingredientInput.style.display = 'block';
          dropdownList.classList.add('show');
        }

        isIngredientInputVisible = !isIngredientInputVisible;
      });
    } else {
      input.addEventListener('click', () => {
        dropdownList.classList.toggle('show');
      });
    }

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
