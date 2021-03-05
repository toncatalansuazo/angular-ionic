import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AlertService } from 'src/app/core/http/alert/alert.service';
import * as fromHomeActions from './home.actions';
@Injectable()
export class HomeEffects {
    loadAlert$ = createEffect(() => this.actions$.pipe(
        ofType(fromHomeActions.findAlerts),
        exhaustMap(() => this.alertService.getAlerts().pipe(
            map(alerts => fromHomeActions.findAlertSuccess({ alerts })),
            catchError((err) => of(err))
        ))
    ));

    constructor(private actions$: Actions,
                private alertService: AlertService) {
    }
}
