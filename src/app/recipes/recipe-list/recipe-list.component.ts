import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  // providers: [RecipeService], // create new instance of Service each times Component instance created
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  constructor(private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['/recipes/new']);
  }
}
