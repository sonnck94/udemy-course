import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService{
  private recipes: Recipe[] = [
    new Recipe(
      'A Test recipe',
      'Recipe description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'
    ),
    new Recipe(
      'A Test recipe 2',
      'Recipe description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>(); // default property is public

  getRecipes(){
    return [...this.recipes];
  }
}
