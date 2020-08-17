import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface State{
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIdx: number,
}
export interface AppState{
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10),
    new Ingredient("Mango", 5),
  ],
  editedIngredient: null,
  editedIngredientIdx: -1,
}

export function shoppingListReducer(
    state: State = initialState,
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
      case ShoppingListActions.START_EDIT:
        let idx = action.payload;
        let ingredient = state.ingredients[idx];

        return {
          ...state,
          editedIngredient: {...ingredient},
          editedIngredientIdx: idx,
        }
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIdx: -1,
        }  
      default:
        return state;  
    }
}