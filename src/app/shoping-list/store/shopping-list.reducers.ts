import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';

export interface AppState {
shoppingList: State
}

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

export const initialState: State = {
ingredients: [
	new Ingredient('Apples', 5),
	new Ingredient('Tomatoes', 10),
],
editedIngredient: null,
editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			}
		case ShoppingListActions.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			}
		case ShoppingListActions.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[state.editedIngredientIndex];
			const updatedIngredient = {
				...ingredient, ...action.payload.ingredient
			}
			const ingredients = [...state.ingredients];
			ingredients[state.editedIngredientIndex] = updatedIngredient;
			return {
				...state, ingredients: ingredients,
				editedIngredient: null,
				editedIngredientIndex: -1
			}
		case ShoppingListActions.DELETE_INGREDIENT:
			const ingredientsForDelete = [...state.ingredients];
			ingredientsForDelete.splice(state.editedIngredientIndex, 1)
			return {
				...state, ingredients: ingredientsForDelete,
				editedIngredient: null,
				editedIngredientIndex: -1
			}
			case ShoppingListActions.START_EDIT: 
			const editedIngredient = {...state.ingredients[action.payload]}
			return {
				...state,
				editedIngredient: editedIngredient,
				editedIngredientIndex: action.payload
			}
			case ShoppingListActions.STOP_EDIT: 
			return {
				...state,
				editedIngredient: null,
				editedIngredientIndex: -1
			}
		default: return state;
	}
}
