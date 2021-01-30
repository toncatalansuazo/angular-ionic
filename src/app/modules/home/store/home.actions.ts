import { createAction, props } from '@ngrx/store';
import { Alert } from '../alert/alert.model';

enum AlertActionsType {
    FIND_ALERTS = '[HOME] ALERTS',
    FIND_ALERTS_SUCCESS = '[HOME] ALERTS SUCCESS',
    FIND_ALERTS_FAILED = '[HOME] ALERTS FAILED'
}

export const findAlerts = createAction(AlertActionsType.FIND_ALERTS);
export const findAlertSuccess = createAction(AlertActionsType.FIND_ALERTS_SUCCESS,
    props<{ alerts: Alert[] }>());
