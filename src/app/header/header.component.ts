import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-stograge.service';
import { RecipeService } from '../recipes/recipe.service';
@Component({
  selector: `app-header`,
  templateUrl: './header.component.html',
  styles: [
    `.nav-link:hover{
      cursor: pointer;
    }`
  ]
})
export class HeaderComponent{
  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService){

  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.getRicepes();
  }
}
