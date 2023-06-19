
// Obtenez les éléments d'ingrédients
const ingredientItems = document.querySelectorAll('.dropdown__ingredients-list p');

// Vérifiez si un tag d'ingrédient a déjà été ajouté
let tagIngredientAlreadyAdded = false;

// Conteneur de tags d'ingrédients
const tagIngredientWrapper = document.querySelector('.tag__ingredients--wrapper');

function addTagFilterIngredients() {
  if (tagIngredientAlreadyAdded === false) {
    tagIngredientAlreadyAdded = true;

    for (let element of ingredientItems) {
      element.addEventListener('click', (e) => {
        const tagIngredientContainer = document.createElement('div');
        tagIngredientContainer.setAttribute('class', 'tag__ingredient');

        const tagIngredient = document.createElement('li');
        tagIngredient.innerText = e.target.innerText;
        tagIngredient.classList.add('tag-blue');

        const deleteTagIcon = document.createElement('span');
        deleteTagIcon.className = 'deleteIcon';

        const deleteIconImg = document.createElement('i');
        deleteIconImg.className = 'fa-regular fa-circle-xmark';
        deleteIconImg.style.cursor = 'pointer';
        deleteIconImg.style.width = '20px';

        deleteIconImg.addEventListener('click', () => {
          tagIngredientContainer.remove();
          // searchLive(); appel à la fonction de recherche en direct si nécessaire
          return false;
        });

        tagIngredientWrapper.appendChild(tagIngredientContainer);
        tagIngredientContainer.appendChild(tagIngredient);
        tagIngredientContainer.appendChild(deleteTagIcon);
        deleteTagIcon.appendChild(deleteIconImg);

        // searchLive(); appel à la fonction de recherche en direct si nécessaire
      });
    }
  }
}

addTagFilterIngredients(); // appel de la fonction
