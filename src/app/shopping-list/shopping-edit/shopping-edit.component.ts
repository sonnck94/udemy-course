import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  @ViewChild('inputIngredientName') ingredientNameRef: ElementRef;
  @ViewChild('inputIngredientAmout') ingredientAmoutRef: ElementRef;
  editIngredientSubscription: Subscription;
  editIdxItem: number;
  editMode: boolean = false;
  ingredient: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

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
        console.log(this.ingredient);        
      },      
    )
  }

  onSubmit(){
    let ingredient = new Ingredient(
      this.shoppingForm.value.name,
      this.shoppingForm.value.amount,
    );
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editIdxItem, ingredient)
    }else{
      this.shoppingListService.addIngredient(ingredient)
    }
    this.editMode = false;  
    this.shoppingForm.reset();
    
  }
  onDelete(){
    this.shoppingListService.deleleIngredient(this.editIdxItem);
  }

  onClear(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editIngredientSubscription.unsubscribe();
  }
}
