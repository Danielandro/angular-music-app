import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
import { Artist } from '../../shared/models/artist';
import { SinglePlaylist } from '../../shared/models/single-playlist.model';
import { TopPlaylistResponseData, TopPlaylist } from "../../shared/models/top-playlist.model";
// import { UserPlaylistResponseData, UserPlaylist } from "../../shared/models/user-playlist.model";
import { CoreModule } from '../core.module';
import { Store } from '@ngxs/store';
import { UserPlaylistActions } from 'src/app/feature/playlist/store/user-playlist/user-playlist.actions';
// import { ErrorData, PlaylistError } from 'src/app/shared/models/base-playlist.interface';
import { UserPlaylistResponseData, PlaylistError } from "../../shared/models/playlist.models";

@Injectable({
  providedIn: CoreModule
})
export class MusicApiService {
  musicApiUrl = "https://api.deezer.com";
  resultsLimit = 10;
  resultsOffset = 0; // offset for pagination

  constructor(private http: HttpClient, private store: Store) { }

  // getTopArtists(): Observable<Artist[]> {
  //   return this.http.get<Artist[]>(`${this.musicApiUrl}/chart/0/artists/`)
  //     .pipe(
  //       tap((res) => console.log("Top 10 Artists: ", res))
  //     );
  // }

  getPlaylist(): Observable<SinglePlaylist> {
    return this.http.get<SinglePlaylist>(`${this.musicApiUrl}/playlist/908622995`).
      pipe(
        tap(res => console.log("Playlist: ", res)),
        catchError(err => this.handleError(err))
      );
  }

  getTopPlaylists(
    limit: number = this.resultsLimit,
    offset: number = this.resultsOffset): Observable<TopPlaylist[]> {
    return this.http.get<TopPlaylistResponseData>(`${this.musicApiUrl}/chart/0/playlists?index=${offset}&limit=${limit}`)
      .pipe(
        map(res => res.data),
        catchError(err => this.handleError(err))
      );
  }

  getUserPlaylists(
    limit: number = this.resultsLimit,
    offset: number = this.resultsOffset): Observable<UserPlaylistResponseData> {
    return this.http.get<UserPlaylistResponseData>(`api/user/3236861244/playlists`)
      .pipe(
        tap(data => console.log("User Playlists: ", data)),
        // catches any client side errors
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: HttpErrorResponse) {
    let message: string;
    let type: string;
    let code: number;

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly!
      message = `An error occured: ${err.error.message}`;

    } else {
      // The backend returned an unsuccessful response code.
      message = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    type = err.statusText;
    code = err.status;
    this.store.dispatch(new UserPlaylistActions.FetchFailed({ error: { type, message, code } } as PlaylistError));
    return throwError(message);
  }
}


// https://connect.deezer.com/oauth/auth.php?app_id=398684&redirect_uri=localhost:4200&perms=basic_access,email
