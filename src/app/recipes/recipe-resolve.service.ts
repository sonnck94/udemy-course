import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-stograge.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolveService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length == 0){
      return this.dataStorageService.getRicepes();
    }else{
      return recipes;
    }
  }
}