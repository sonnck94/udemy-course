import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action{
  type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action{
  type = UPDATE_INGREDIENT
  
  constructor(public payload: {idx: number, ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action{
  type = DELETE_INGREDIENT;

  constructor(public payload: number){}
}

export type ShoppingListActionsTypes = 
  AddIngredient 
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient;