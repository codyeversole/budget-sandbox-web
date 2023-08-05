import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { SandboxClientService } from '../../services/clients/sandbox-client.service';
import { loadSandboxes } from '../actions/sandboxes.actions';
 
@Injectable()
export class SandboxesEffects {
 
  loadSandboxes$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadSandboxes),
    exhaustMap(() => this.sandboxClient.getAll()
      .pipe(
        map(sandboxes => {
            console.log(sandboxes)
            return ({ type: '[Component] Sandboxes Success', payload: sandboxes })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] Sandboxes Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private sandboxClient: SandboxClientService
  ) {}
}