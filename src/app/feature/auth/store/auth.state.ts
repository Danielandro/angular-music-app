import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthActions } from './auth.actions';

export interface AuthStateModel {
  accessToken: string;
  expires: number; // when token expires - default is never (I think!)
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    accessToken: null,
    expires: null
  }
})
export class AuthState {
  // add activatedRoute or RouteSnapshot to retrieve token + expires from url
  constructor() { }

  @Selector()
  public static getState(state: AuthStateModel) {
    return state;
  }

  @Action(AuthActions.FetchAccessToken)
  fetch({ }: StateContext<AuthStateModel>) {
    // triggered in
  }

}
