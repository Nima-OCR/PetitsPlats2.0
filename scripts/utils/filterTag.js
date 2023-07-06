import { displaySearchResults } from "./displayUtils.js";
import { previousRecipes } from "./searchNativeLoops.js";

export function createFilterTag(itemName, itemContainer, targetContainer) {
  const selectedItemsSet = new Set();
  const itemElement = document.createElement("p");
  itemElement.textContent = itemName;
  itemElement.style.cursor = "pointer";
  itemElement.classList.add("tag");

  let selectedTags = [];

  itemElement.addEventListener("click", () => {
    const clickedText = itemName;

    if (!selectedTags.includes(clickedText)) {
      selectedTags.push(clickedText);
      console.log("(createFilterTag) Tags actuellement sélectionnés : ", selectedTags);
    }

    const displayedRecipes = previousRecipes.filter(recipe => {
      const lowerCaseTags = selectedTags.map(tag => tag.toLowerCase());
      let isMatching = false;

      recipe.ingredients.forEach(ingredientObj => {
        const ingredient = ingredientObj.ingredient.toLowerCase();
        if (lowerCaseTags.some(tag => ingredient.includes(tag))) {
          isMatching = true;
        }
      });

      if (!isMatching && lowerCaseTags.includes(recipe.appliance.toLowerCase())) {
        isMatching = true;
      }

      if (!isMatching && recipe.ustensils.some(utensil => lowerCaseTags.includes(utensil.toLowerCase()))) {
        isMatching = true;
      }

      if (!isMatching) {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        if (lowerCaseTags.some(tag => name.includes(tag) || description.includes(tag))) {
          isMatching = true;
        }
      }

      return isMatching;
    });

    console.log("(createFilterTag) Recettes actuellement affichées : ", displayedRecipes);

    displaySearchResults(displayedRecipes);

    if (itemElement.classList.contains("selected")) {
      return;
    }

    itemElement.style.backgroundColor = "#FFD15B";
    itemElement.style.padding = "5px";
    itemElement.classList.add("selected");

    const selectedItemDiv = document.createElement("div");
    selectedItemDiv.classList.add("selected-tag");
    const tags = `
      width: 100%;
      height: 53px;
      background-color: #FFD15B;
      border-radius: 10px;
      align-items: center;
      padding: 17px 18px;
      margin-top: 15px;
      display: flex;
      gap: 60px;
      justify-content: space-between;
      font-family: Manrope, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
    `;

    selectedItemDiv.setAttribute("style", tags);

    const itemText = document.createElement("span");
    itemText.classList.add("tag-visible");
    itemText.textContent = itemName;

    const closeButton = document.createElement("span");
    closeButton.classList.add("tag-visible");
    closeButton.textContent = "X";
    closeButton.style.cursor = "pointer";

    closeButton.addEventListener("click", () => {
      console.log("(createFilterTag) Tag supprimé :", itemName);

      selectedItemDiv.remove();
      itemElement.style.backgroundColor = "";
      itemElement.classList.remove("selected");
      selectedItemsSet.delete(itemName);

      console.log("(createFilterTag) Recettes précédentes : ", previousRecipes);
      displaySearchResults(previousRecipes);
    });

    selectedItemDiv.appendChild(itemText);
    selectedItemDiv.appendChild(closeButton);

    targetContainer.insertAdjacentElement("afterend", selectedItemDiv);

    selectedItemsSet.add(itemName);
  });

  return itemElement;
}
