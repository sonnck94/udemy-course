import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A Test recipe',
      'Recipe description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
      [
        new Ingredient("Meat", 1),
        new Ingredient("French Fries", 20),
      ]
    ),
    new Recipe(
      2,
      'A Test recipe 2',
      'Recipe description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
      [
        new Ingredient("Buns", 1),
        new Ingredient("Meat", 1),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService){};

  getRecipes(){
    return [...this.recipes];
  }
  getRecipe(id: number){
    return this.recipes.find(recipe => recipe.id === id);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
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
