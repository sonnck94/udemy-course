import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeResolveService } from './recipes/recipe-resolve.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

const ROUTES: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
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
  {path: 'auth', component: AuthComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
