import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const START_EDIT = 'START_EDIT'
export const STOP_EDIT = 'STOP_EDIT'

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
  
  constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action{
  type = DELETE_INGREDIENT;

  constructor(public payload?){}
}

export class StartEdit implements Action{
  type = START_EDIT

  constructor(public payload: number){}
}

export class StopEdit implements Action{
  type = STOP_EDIT;
  constructor(public payload: any | null){}
}

export type ShoppingListActionsTypes = 
  AddIngredient 
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;