import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10),
    new Ingredient("Mango", 5),
  ],
  count: 10,
}

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActionsTypes
  ){
    console.log("action.type: ", action.type);
    
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload],
        }
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            ...action.payload,
          ]
        }
      case ShoppingListActions.UPDATE_INGREDIENT:
        let updatedIngredient = state.ingredients[action.payload.idx];
        console.log("action.payload.idx", action.payload.idx);
        updatedIngredient = {...action.payload.ingredient}
        let ingredients = [...state.ingredients];
        ingredients[action.payload.idx] = updatedIngredient;

        return {
          ...state,
          ingredients: ingredients,
        }
      case ShoppingListActions.DELETE_INGREDIENT:
        let newIngredients = state.ingredients.filter((i, idx) => idx !== action.payload);

        return {
          ...state,
          ingredients: newIngredients,
        } 
      default:
        return state;  
    }
}