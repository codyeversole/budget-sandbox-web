import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { BucketClientService } from '../../services/clients/bucket-client.service';
import { loadBuckets } from '../actions/buckets.actions';
import { currentSandboxChange } from '../actions/current-sandbox.actions';
 
@Injectable()
export class BucketsEffects {
 
  loadBuckets$ = createEffect(() => { return this.actions$.pipe(
    ofType(loadBuckets, currentSandboxChange),
    exhaustMap(() => this.bucketClient.getAll()
      .pipe(
        map(buckets => {
            console.log(buckets)
            return ({ type: '[Component] Buckets Success', payload: buckets })
    }),
        catchError((error) => {
            console.log(error);
            return  of({ type: '[Component] Buckets Error' });
        })
      ))
    ) }
  );
 
  constructor(
    private actions$: Actions,
    private bucketClient: BucketClientService
  ) {}
}