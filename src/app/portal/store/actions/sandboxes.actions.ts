import { createAction, props } from '@ngrx/store';
import { SandboxModel } from '../../models/sandbox-model';

export const loadSandboxes = createAction(
    '[Component] Sandboxes'
);

export const loadSandboxesSuccess = createAction(
    '[Component] Sandboxes Success',
    props<{ payload: SandboxModel[] }>()
);

export const loadSandboxesError = createAction(
    '[Component] Sandboxes Error'
);