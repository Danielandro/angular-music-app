import { State, Selector, StateContext, Action } from '@ngxs/store';
import { EntityState, createEntityAdapter } from 'ngxs-entity';
// import { UserPlaylist } from 'src/app/shared/models/user-playlist.model';
import { UserPlaylistActions } from "./user-playlist.actions";
import { Injectable } from '@angular/core';
import { MusicApiService } from 'src/app/core/services/music-api.service';
import { tap, catchError } from 'rxjs/operators';
// import { ErrorData } from 'src/app/shared/models/base-playlist.interface';
import { UserPlaylist, ErrorData, UserPlaylistAdapter } from "../../../../shared/models/playlist.models";

// add other state properties here
export interface UserPlaylistStateModel extends EntityState<UserPlaylist> {
  loaded: boolean;
  fetchError: ErrorData | null;
}

// create adapter. Tell it which model to use for entities.
// Access adapter methods and sort order of entites in store
const adapter = createEntityAdapter<UserPlaylist>();
// get adapter helper methods
const { selectAll } = adapter.getSelectors();

@State<UserPlaylistStateModel>({
  name: 'userPlaylist',
  defaults: adapter.getInitialState({
    loaded: false,
    fetchError: null
  })
})
@Injectable()
export class UserPlaylistState {

  constructor(
    private musicApiService: MusicApiService,
    private UserPlaylistAdapter: UserPlaylistAdapter) { }

  // SELECTORS
  @Selector()
  public static getState(state: UserPlaylistStateModel) {
    return state;
  }

  @Selector()
  public static isLoaded(state: UserPlaylistStateModel) {
    return state.loaded;
  }

  @Selector()
  public static selectError(state: UserPlaylistStateModel) {
    return state.fetchError;
  }

  @Selector()
  public static selectPlaylists(state: UserPlaylistStateModel) {
    return selectAll(state);
  }


  // ACTIONS
  @Action(UserPlaylistActions.FetchUserPlaylists)
  fetchPlaylists({ dispatch }: StateContext<UserPlaylistStateModel>) {
    return this.musicApiService.getUserPlaylists()
      .pipe(
        tap((res) => {
          // check if error occured
          if (res.error) {
            return dispatch(new UserPlaylistActions.FetchFailed(res.error));
          } else {
            //use adapter here to convert data into  UserPlaylist[]
            const playlists = res.data.map(item => this.UserPlaylistAdapter.adapt(item));
            return dispatch(new UserPlaylistActions.FetchSuccessful(playlists));
          }

        })
      );
  }

  @Action(UserPlaylistActions.FetchSuccessful)
  fetchSuccessful({ getState, patchState }: StateContext<UserPlaylistStateModel>, { payload }: UserPlaylistActions.FetchSuccessful) {
    const state = getState();

    patchState({
      ...adapter.addAll(payload, state),
      loaded: true,
      fetchError: null
    });
  }

  @Action(UserPlaylistActions.FetchFailed)
  fetchFailed({ getState, patchState }: StateContext<UserPlaylistStateModel>, { payload }: UserPlaylistActions.FetchFailed) {
    const state = getState();
    const err = payload.error;

    patchState({
      ...state,
      fetchError: err
    });

  }
}
