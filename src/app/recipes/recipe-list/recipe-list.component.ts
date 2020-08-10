import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  // providers: [RecipeService], // create new instance of Service each times Component instance created
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSub: Subscription;
  constructor(private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes,
    )

  }
  onNewRecipe(){
    this.router.navigate(['/recipes/new']);
  }
  ngOnDestroy(){
    this.recipesSub.unsubscribe();
  }
}
