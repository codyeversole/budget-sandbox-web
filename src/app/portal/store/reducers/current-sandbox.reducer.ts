import { createReducer, on } from '@ngrx/store';
import * as CurrentSandboxActions from '../actions/current-sandbox.actions';
import { SandboxModel } from '../../models/sandbox-model';

export const currentSandboxReducer = createReducer(
    undefined as SandboxModel | undefined,
    on(CurrentSandboxActions.updateCurrentSandbox, (_state: SandboxModel | undefined, {sandbox}): SandboxModel | undefined => (sandbox)),
    on(CurrentSandboxActions.updateCurrentSandboxDetailsOnly, (_state: SandboxModel | undefined, {sandbox}): SandboxModel | undefined => (sandbox)),
);