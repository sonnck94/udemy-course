import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10),
  ];
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  getIngredients(){
    return [...this.ingredients];
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit([...this.ingredients]);
  }
}
