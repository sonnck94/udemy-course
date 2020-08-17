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
        let updatedIngredient = state.ingredients[state.editedIngredientIdx];
        updatedIngredient = {...action.payload}
        let ingredients = [...state.ingredients];
        ingredients[state.editedIngredientIdx] = updatedIngredient;

        return {
          ...state,
          ingredients: ingredients,
          editedIngredient: null,
          editedIngredientIdx: -1,
        }
      case ShoppingListActions.DELETE_INGREDIENT:
        let newIngredients = state.ingredients.filter((i, idx) => idx !== state.editedIngredientIdx);

        return {
          ...state,
          ingredients: newIngredients,
        }
      case ShoppingListActions.START_EDIT:
        let idx = action.payload;
        return {
          ...state,
          editedIngredient: {...state.ingredients[idx] },
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