import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'A Test recipe',
  //     'Recipe description',
  //     'https://placedog.net/200',
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("French Fries", 20),
  //     ]
  //   ),
  //   new Recipe(
  //     2,
  //     'A Test recipe 2',
  //     'Recipe description',
  //     'https://placedog.net/200',
  //     [
  //       new Ingredient("Buns", 1),
  //       new Ingredient("Meat", 1),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromShoppingList.AppState>){};

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes])
  }
  getRecipes(){
    return [...this.recipes];
  }
  getRecipe(id: number){
    return this.recipes.find(recipe => recipe.id === id);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe){
    let id = this.recipes.length + 1;
    recipe.id = id;
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes])
  }
  updateRecipe(id, recipe: Recipe){
    this.recipes = this.recipes.map(r => {
      if(r.id == id){
        return recipe;
      }else{
        return r;
      }
    })
    this.recipesChanged.next([...this.recipes]);
  }
  deleteRecipe(id){
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.recipesChanged.next([...this.recipes]);
  }
}
