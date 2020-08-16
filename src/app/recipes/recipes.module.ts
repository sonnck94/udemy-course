import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shares.module';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    RecipesRoutingModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class RecipesModule{

}