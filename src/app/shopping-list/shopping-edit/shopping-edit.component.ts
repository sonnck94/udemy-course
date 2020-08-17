import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  editIngredientSubscription: Subscription;
  editIdxItem: number;
  editMode: boolean = false;
  ingredient: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
    private store: Store) { }

  ngOnInit(): void {
    this.editIngredientSubscription = this.shoppingListService.startEditIngredient.subscribe(
      idx => {
        this.editIdxItem = idx;
        this.editMode = true;
        this.ingredient = this.shoppingListService.getIngredient(idx);
        if(this.ingredient){
          this.shoppingForm.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount,
          })
        }
      },
    )
  }

  onSubmit(){
    let ingredient = new Ingredient(
      this.shoppingForm.value.name,
      this.shoppingForm.value.amount,
    );
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editIdxItem, ingredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({idx: this.editIdxItem, ingredient: ingredient}));
    }else{
      // this.shoppingListService.addIngredient(ingredient)
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient))
    }
    this.editMode = false;
    this.shoppingForm.reset();

  }
  onDelete(){
    // this.shoppingListService.deleleIngredient(this.editIdxItem);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editIdxItem));
  }

  onClear(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editIngredientSubscription.unsubscribe();
  }
}
