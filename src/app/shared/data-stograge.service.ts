import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

const BASE_URL = "https://angular-2ce4e.firebaseio.com/";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(private http: HttpClient,
    private recipeService: RecipeService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put(BASE_URL + 'recipes.json', recipes)
      .subscribe(
        data => console.log(data),
      );
  }
  getRicepes(){
    return this.http.get(BASE_URL + 'recipes.json').pipe(
      map((data: {[key: number]: Recipe}) => {
        let tmpRecipes = [];
        for(let key in data){
          tmpRecipes.push({...data[key]})
        }
        return tmpRecipes;
      })
    ).subscribe(recipes => {
      this.recipeService.setRecipes(recipes)
    })
  }
}