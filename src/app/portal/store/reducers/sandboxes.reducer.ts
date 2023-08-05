import { createReducer, on } from '@ngrx/store';
import * as SandboxActions from '../actions/sandboxes.actions';
import { SandboxModel } from '../../models/sandbox-model';

const initialState: SandboxModel[] = [];

export const sandboxesReducer = createReducer(
    initialState,
    on(SandboxActions.loadSandboxes, (state: SandboxModel[]): SandboxModel[] => (state)),
    on(SandboxActions.loadSandboxesSuccess, (_state: SandboxModel[], {payload}): SandboxModel[] => (payload)),
    on(SandboxActions.loadSandboxesError, (): SandboxModel[] => ([])),
);