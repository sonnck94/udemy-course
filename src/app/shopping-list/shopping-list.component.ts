import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import  * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    console.log("this.store.select('shoppingList'): ", this.store.select('shoppingList'));
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe(data => {
    //   console.log("data: ", data)
    // })
  }

  onEditIngredient(idx: number){
    // this.shoppingListService.startEditIngredient.next(idx);
    this.store.dispatch(new ShoppingListActions.StartEdit(idx));
  }

  ngOnDestroy(){
  }
}
