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

    if (type === 'Ingredients') {
      const ingredientInputDivElement = document.createElement('div');
      ingredientInputDivElement.className = 'dropdown__ingredient-div';
      block.appendChild(ingredientInputDivElement);

      const divSearchInputElement = document.createElement('div');
      divSearchInputElement.className = 'dropdown__ingredient-search';
      ingredientInputDivElement.appendChild(divSearchInputElement);


      const ingredientInput = document.createElement('input');
      ingredientInput.type = 'text';
      ingredientInput.className = 'dropdown__ingredient-input';
      ingredientInput.placeholder = 'Chercher une recette';
      ingredientInput.style.display = 'none';
      divSearchInputElement.appendChild(ingredientInput);

      const icon = document.createElement('i');
      icon.className = 'fas fa-search dropdown__ingredient-search__icon';
      icon.style.display = 'none';
      divSearchInputElement.appendChild(icon);

      let isIngredientInputVisible = false;

      input.addEventListener('click', () => {
        if (isIngredientInputVisible) {
          icon.style.display = 'none'; // cache la loupe lorsque le menu est fermé
          ingredientInputDivElement.style.display = 'none';
          ingredientInput.style.display = 'none';
          dropdownList.classList.remove('show');
          chevron.classList.remove('up');
        } else {
          icon.style.display = 'block'; // affiche la loupe lorsque le menu est déroulé
          ingredientInputDivElement.style.display = 'block';
          ingredientInput.style.display = 'block';
          divSearchInputElement.style.margin = "15px 0px 15px 0px";
          divSearchInputElement.style.border = "1px solid lightgrey";
          dropdownList.classList.add('show');
          chevron.classList.add('up');
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
