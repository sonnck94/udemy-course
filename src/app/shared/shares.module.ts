import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropDownDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownDirective,
  ]
})
export class SharedModule{

}