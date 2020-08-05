import { Component, OnInit, Input, } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { LoggingService } from '../../../logging.service';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  // providers: [LoggingService]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private loggingService: LoggingService, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelect(){
    this.loggingService.selectRecipe();
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
