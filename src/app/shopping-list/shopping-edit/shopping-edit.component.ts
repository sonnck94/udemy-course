import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputIngredientName') ingredientNameRef: ElementRef;
  @ViewChild('inputIngredientAmout') ingredientAmoutRef: ElementRef;

  @Output() addShoppingOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){    
    this.addShoppingOutput.emit({
      name: this.ingredientNameRef.nativeElement.value, 
      amount: this.ingredientAmoutRef.nativeElement.value,
    })
    this.onClear();
  }
  onClear(){
    this.ingredientNameRef.nativeElement.value = "";
    this.ingredientAmoutRef.nativeElement.value = "";
  }
}
