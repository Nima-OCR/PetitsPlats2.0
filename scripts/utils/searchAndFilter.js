

    export function searchRecipes(recipes, searchTerm) {
  const normalizedTerm = searchTerm.toLowerCase();

  return recipes.filter(recipe => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase()).join(' ');

    return recipeTitle.includes(normalizedTerm) ||
      recipeDescription.includes(normalizedTerm) ||
      recipeIngredients.includes(normalizedTerm);
  });
}

    export function filterItems(items, searchTerm) {
  let normalizedTerm = searchTerm.toLowerCase();
  return items.filter(item => item.includes(normalizedTerm));
}
