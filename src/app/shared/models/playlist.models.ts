import { Adapter } from "../../core/adapter";
import { Injectable } from "@angular/core";

//BASE PLAYLIST
export interface BasePlaylistResponseData {
  data: BasePlaylist[];
  total: number;
  error?: PlaylistError;
}

// DONE
export interface BasePlaylist {
  id: number;
  title: string;
  is_public: boolean;
  nb_tracks: number;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum: string;
  tracklist: string;
  creation_date: Date;
  type: string;
}

export interface Creator {
  id: number,
  name: string,
  tracklist: string,
  type: string;
}

export class PlaylistError {
  constructor(public error: ErrorData, ) { }

}

export class ErrorData {
  constructor(
    public type: string,
    public message: string,
    public code: number) { }

}

// USER PLAYLIST
export interface UserPlaylistResponseData extends BasePlaylistResponseData {
  data: UserPlaylist[];
  checksum: string;
}

export class UserPlaylist implements BasePlaylist {
  constructor(
    // from parent
    public id: number,
    public title: string,
    public is_public: boolean,
    public nb_tracks: number,
    public link: string,
    public picture: string,
    public picture_small: string,
    public picture_medium: string,
    public picture_big: string,
    public picture_xl: string,
    public checksum: string,
    public tracklist: string,
    public creation_date: Date,
    public type: string,
    // from child
    public duration: number,
    public is_loved_track: boolean,
    public collaborative: boolean,
    public fans: number,
    public time_add: number,
    public time_mod: number,
    public creator: Creator
  ) { }
}

@Injectable({
  providedIn: "root"
})
export class UserPlaylistAdapter implements Adapter<UserPlaylist> {
  adapt(item: any): UserPlaylist {
    return new UserPlaylist(
      item.id,
      item.title,
      item.is_public,
      item.nb_tracks,
      item.link,
      item.picture,
      item.picture_small,
      item.picture_medium,
      item.picture_big,
      item.picture_xl,
      item.checksum,
      item.tracklist,
      item.creation_date,
      item.type,
      // from child
      item.duration,
      item.is_loved_track,
      item.collaborative,
      item.fans,
      item.time_add,
      item.time_mod,
      item.creator
    );
  }
}
