import { Injectable } from "@angular/core";
import { SandboxModel } from "../models/sandbox-model";
import { Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCurrentSandbox } from "../store/selectors/current-sandbox.selector";
import { currentSandboxChange, updateCurrentSandbox, updateCurrentSandboxDetailsOnly } from "../store/actions/current-sandbox.actions";

@Injectable({
    providedIn: 'root',
})
export class SandboxService {
    private currentSandbox$: Observable<SandboxModel | undefined> = this.store.select(selectCurrentSandbox);
    private previousSandbox: SandboxModel | undefined = undefined;

    public currentSandbox: SandboxModel | undefined = undefined;

    constructor(private store: Store) {
        this.currentSandbox$.subscribe(currentSandbox => {
            this.currentSandbox = currentSandbox;

            if(currentSandbox?.sandboxId != this.previousSandbox?.sandboxId) {
                this.previousSandbox = currentSandbox;  
                this.store.dispatch(currentSandboxChange());
            }            
        });
    }

    public setCurrentSandboxDirectly(sandbox: SandboxModel | undefined): void {
        this.store.dispatch(updateCurrentSandbox({sandbox: sandbox}));
    }

    public setCurrentSandbox(sandboxes: SandboxModel[]): void {
        this.currentSandbox$.pipe(take(1)).subscribe(currentSandbox => {
            if(currentSandbox) {
                const newSandbox = sandboxes.find(b => b.sandboxId == currentSandbox?.sandboxId);
                if(newSandbox) {
                    this.store.dispatch(updateCurrentSandboxDetailsOnly({sandbox: newSandbox}));
                } else if (sandboxes.length > 0) {
                    this.store.dispatch(updateCurrentSandbox({sandbox: sandboxes[0]}));
                } else {
                    this.store.dispatch(updateCurrentSandbox({sandbox: undefined}));
                }
            } else {
                if (sandboxes.length > 0) {
                    this.store.dispatch(updateCurrentSandbox({sandbox: sandboxes[0]}));
                } else {
                    this.store.dispatch(updateCurrentSandbox({sandbox: undefined}));
                }
            }
        });
    }
}