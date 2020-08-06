import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputIngredientName') ingredientNameRef: ElementRef;
  @ViewChild('inputIngredientAmout') ingredientAmoutRef: ElementRef;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let ingredient = new Ingredient(
      this.ingredientNameRef.nativeElement.value,
      this.ingredientAmoutRef.nativeElement.value,
    );

    this.shoppingListService.addIngredient(ingredient)
    this.onClear();
  }
  onClear(){
    this.ingredientNameRef.nativeElement.value = "";
    this.ingredientAmoutRef.nativeElement.value = "";
  }
}
