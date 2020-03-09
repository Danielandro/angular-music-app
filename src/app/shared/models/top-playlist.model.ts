// import { BasePlaylist, BasePlaylistResponseData } from './base-playlist.interface';
import { BasePlaylist, BasePlaylistResponseData } from "./playlist.models";

export interface TopPlaylistResponseData extends BasePlaylistResponseData {
  data: TopPlaylist[];
}

export interface TopPlaylist extends BasePlaylist {
  user: User;
  type: string;
}

export interface User {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}
