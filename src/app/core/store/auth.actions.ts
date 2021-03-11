import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/login/User';


export enum AuthActionTypes {
    LOGIN = '[Auth] LOGIN',
    LOGIN_SUCCESS = '[Auth] LOGIN SUCCESS',
    LOGIN_FAILED = '[Auth] LOGIN FAILED',
    SET_UNAUTHENTICATED = '[Auth] set Unauthenticated'
}


export const login = createAction(
    AuthActionTypes.LOGIN,
    props<{ user: User }>()
);
export const loginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS,
    props<{ email: string }>()
);
export const loginFailed = createAction(AuthActionTypes.LOGIN_FAILED,
    props<{ error: any }>()
);
export const unAuthenticate = createAction(AuthActionTypes.SET_UNAUTHENTICATED);

// export class Authenticated implements Action {
//     readonly type = LOGIN;
// }
// export class Unauthenticated implements Action {
//     readonly type = SET_UNAUTHENTICATED;
// }
// export type AuthActions = Authenticated | Unauthenticated;
