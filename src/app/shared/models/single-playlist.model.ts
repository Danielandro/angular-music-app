// import { BasePlaylist, Creator } from './base-playlist.interface';
import { BasePlaylist, Creator } from "./playlist.models";

export interface SinglePlaylist extends BasePlaylist {
  description: string;
  duration: number;
  is_loved_track: boolean;
  collaborative: boolean;
  fans: number;
  share: string;
  creator: Creator;
  type: string;
  tracks: Tracks;
}

export interface Tracks {
  data: PlaylistTrack[];
  checksum: string;
}

export interface PlaylistTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version?: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  time_add: number;
  artist: Creator;
  album: Album;
  type: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  cove_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  tracklist: string;
  type: string;
}
