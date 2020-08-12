import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

const BASE_URL = "https://angular-2ce4e.firebaseio.com/";

@Injectable({ providedIn: 'root' })
export class DataStorageService{
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put(BASE_URL + 'recipes.json', recipes)
      .subscribe(
        data => console.log(data),
      );
  }
  getRicepes(){
    return this.http.get<Recipe[]>(
      'https://angular-2ce4e.firebaseio.com/recipes.json',
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}