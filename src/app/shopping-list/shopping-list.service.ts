import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
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
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    console.log("ShoppingListService:addIngredients", this.ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
