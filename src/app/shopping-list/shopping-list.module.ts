import { NgModule,  } from '@angular/core';

import { SharedModule } from '../shared/shares.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule,
  ]
})
export class ShoppingListModule{

}