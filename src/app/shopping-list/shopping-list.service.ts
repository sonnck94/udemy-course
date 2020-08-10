import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService{
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10),
    new Ingredient("Mango", 5),
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditIngredient = new Subject<number>();

  getIngredients(){
    return [...this.ingredients];
  }
  getIngredient(idx: number){
    return this.ingredients[idx];
  }
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }
  updateIngredient(idx, ingredient: Ingredient){
    if(this.ingredients[idx]){
      this.ingredients[idx] = ingredient;
      this.ingredientsChanged.next([...this.ingredients]);
    }
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next([...this.ingredients]);
  }
  deleleIngredient(idx: number){
    console.log("index", idx);
    
    if(this.ingredients[idx]){
      let a = this.ingredients.splice(idx,1);
      console.log(a);
      console.log(this.ingredients);
            
      // this.ingredientsChanged.next([...this.ingredients])
    }
  }
}
