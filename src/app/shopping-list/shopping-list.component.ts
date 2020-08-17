import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    console.log("this.store.select('shoppingList'): ", this.store.select('shoppingList'));
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe(data => {
    //   console.log("data: ", data)
    // })
  }

  onEditIngredient(idx: number){
    this.shoppingListService.startEditIngredient.next(idx);
  }

  ngOnDestroy(){
  }
}
