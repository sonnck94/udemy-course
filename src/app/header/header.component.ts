import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: `app-header`,
  templateUrl: './header.component.html',
  styles: [
    `.nav-link:hover{
      cursor: pointer;
    }`
  ]
})
export class HeaderComponent{
}
