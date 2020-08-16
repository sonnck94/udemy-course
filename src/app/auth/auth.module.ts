import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule, } from '../shared/shares.module';
@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent},
    ])
  ]
})
export class AuthModule{

}