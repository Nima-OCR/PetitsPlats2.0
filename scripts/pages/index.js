import {createHeaderLogo} from "../utils/header.js";
import {displayFormSection} from "../utils/searchForm.js";
import {createDropdownSection} from "../utils/dropdowns.js";
import {createRecipeCard} from "../factories/reciepes.js";
import {recipes} from "../../data/recipes.js";

let recipe = recipes[0];

// Appel à la fonction
createHeaderLogo();
displayFormSection();
createDropdownSection();
createRecipeCard(recipe);
