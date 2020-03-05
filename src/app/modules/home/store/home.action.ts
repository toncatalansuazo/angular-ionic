import { Action } from '@ngrx/store';
import { Alert } from '../alert/alert.model';

export const SET_ALERTS = '[HOME] set alert';

export class SetAlertsAction implements Action {
    readonly type = SET_ALERTS;
    constructor(public payload: Alert[]) {}
}

export type HomeActions = SetAlertsAction;
