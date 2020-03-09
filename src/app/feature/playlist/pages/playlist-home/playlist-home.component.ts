import { Component, OnInit } from '@angular/core';
import { MusicApiService } from 'src/app/core/services/music-api.service';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist';
// import { UserPlaylist } from 'src/app/shared/models/user-playlist.model';
import { Select } from '@ngxs/store';
import { UserPlaylistState } from '../../store/user-playlist/user-playlist.state';
// import { ErrorData } from 'src/app/shared/models/base-playlist.interface';
import { UserPlaylist, ErrorData } from "../../../../shared/models/playlist.models";

@Component({
  selector: "app-home",
  templateUrl: './playlist-home.component.html',
  styleUrls: ['./playlist-home.component.scss']
})
export class PlaylistHomeComponent implements OnInit {
  pageTitle = "Your Playlists";
  @Select(UserPlaylistState.selectPlaylists) userPlaylists$: Observable<UserPlaylist[]>;
  @Select(UserPlaylistState.selectError) fetchError$: Observable<ErrorData>;

  constructor(private musicApiService: MusicApiService) { }

  ngOnInit(): void {

  }

}
