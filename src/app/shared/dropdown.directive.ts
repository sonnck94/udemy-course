import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective{
  @HostBinding('class.show') isShow: boolean = false;

  @HostListener('click') onClick(){
    console.log("OnClick directive");
    
    this.isShow = !this.isShow;
  }
}