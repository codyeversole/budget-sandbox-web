import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    template: ''
})
export class PanelTableBaseComponent<T> {
    @Output() edited = new EventEmitter<{item: T, id: number}>();
}