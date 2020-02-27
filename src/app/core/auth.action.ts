import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] set Unauthenticated';

export class Authenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}
export class Unauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}
export type AuthActions = Authenticated | Unauthenticated;
