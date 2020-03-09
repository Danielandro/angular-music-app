import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
// import { UserPlaylist } from 'src/app/shared/models/user-playlist.model';
import { UserPlaylist } from "src/app/shared/models/playlist.models";

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistItemComponent implements OnInit {
  @Input() playlist: UserPlaylist;
  constructor() { }

  ngOnInit(): void {
  }

}
