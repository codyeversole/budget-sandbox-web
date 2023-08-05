import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPanelTableHost]',
})
export class CrudPanelTableDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}