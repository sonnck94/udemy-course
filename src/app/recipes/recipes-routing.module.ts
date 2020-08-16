import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeResolveService } from './recipe-resolve.service';

const routes : Routes = [
  {
    path: 'recipes', 
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
    {path: 'new', component: RecipeEditComponent},
    {
      path: ':id', 
      component: RecipeDetailComponent,
      resolve: [RecipeResolveService],
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipeResolveService],
    },
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule{

}