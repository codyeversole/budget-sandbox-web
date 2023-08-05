import { createAction, props } from '@ngrx/store';
import { SandboxModel } from '../../models/sandbox-model';

export const updateCurrentSandbox = createAction(
    '[Component] Update Current Sandbox',
    props<{ sandbox: SandboxModel | undefined }>()
);

export const updateCurrentSandboxDetailsOnly = createAction(
    '[Component] Update Current Sandbox Details Only',
    props<{ sandbox: SandboxModel | undefined }>()
);

export const currentSandboxChange = createAction(
    '[Component] Current Sandbox Change',
);
