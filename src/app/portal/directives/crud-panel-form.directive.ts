import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPanelFormHost]',
})
export class CrudPanelFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}