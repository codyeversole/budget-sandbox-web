import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    template: ''
})
export class PanelFormBaseComponent<T> {
    @Input() item: T | undefined;
    @Output() formChanged = new EventEmitter<FormGroup>();
    @Output() saved = new EventEmitter<void>();
}