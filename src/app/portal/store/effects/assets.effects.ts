import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AssetClientService } from '../../services/clients/asset-client.service';
import { loadAssets } from '../actions/assets.actions';
import { currentSandboxChange } from '../actions/current-sandbox.actions';
 
@Injectable()
export class AssetsEffects {
 
  loadAssets$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadAssets, currentSandboxChange),
    exhaustMap(() => this.assetClient.getAll()
      .pipe(
        map(assets => {
            console.log(assets)
            return ({ type: '[Component] Assets Success', payload: assets })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] Assets Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private assetClient: AssetClientService
  ) {}
}