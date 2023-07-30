

    export const getItemsByType = (recipes, type) => {

  // Vérifie si recipes est un tableau et n'est pas vide
  if (!Array.isArray(recipes) || !recipes.length) {
    console.error('Le tableau des recettes est invalide ou vide');
    return [recipes]; // Change here
  }

  // Extrait les tableaux d'ingrédients, d'appareils et d'ustensiles
  const ingredients = recipes.flatMap(recipe =>
    recipe.ingredients.map(ingredientObj => ingredientObj.ingredient.toLowerCase())
  );
  const appliances = recipes.map(recipe => recipe.appliance.toLowerCase());
  const utensils = recipes.flatMap(recipe => recipe.ustensils.map(utensil => utensil.toLowerCase()));

  // Supprime les doublons et trie
  const uniqueIngredients = [...new Set(ingredients)].sort((a, b) => a.localeCompare(b, 'fr'));
  const uniqueAppliances = [...new Set(appliances)].sort((a, b) => a.localeCompare(b, 'fr'));
  const uniqueUtensils = [...new Set(utensils)].sort((a, b) => a.localeCompare(b, 'fr'));



  // Retourne le tableau d'ingrédients, d'appareils ou d'ustensiles en fonction du type
  if (type === 'ingredients') {
    return uniqueIngredients;
  } else if (type === 'appliances') {
    return uniqueAppliances;
  } else if (type === 'utensils') {
    return uniqueUtensils;
  } else {
    console.error(`Type invalide : ${type}`);
    return [];
  }
};
