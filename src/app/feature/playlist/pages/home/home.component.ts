import { Component, OnInit } from '@angular/core';
import { MusicApiService } from 'src/app/services/music-api.service';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist';
import { UserPlaylist } from 'src/app/shared/models/user-playlists.model';
import { Select } from '@ngxs/store';
import { UserPlaylistState } from '../../store/user-playlist/user-playlist.state';

@Component({
  selector: "app-home",
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = "Your Playlists";
  @Select(UserPlaylistState.selectPlaylists) userPlaylists$: Observable<UserPlaylist[]>;
  @Select(UserPlaylistState.selectError) fetchError: Observable<boolean>;

  constructor(private musicApiService: MusicApiService) { }

  ngOnInit(): void {

  }

}
