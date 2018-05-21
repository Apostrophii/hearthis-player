import { Action } from 'redux';
import * as types from './types';
import { Artist, Track } from './api-interfaces';

export interface ArtistsReceivedAction extends Action {
  artists: Artist[];
}

export interface SelectArtistAction extends Action {
  artist: Artist;
}

export interface TracksReceivedAction extends Action {
  tracks: Track[];
}

export interface SelectTrackAction extends Action {
  track: Track;
}

export interface SetVolumeAction extends Action {
  level: number;
}

export function fetchArtists(): Action {
  return {
    type: types.FETCH_ARTISTS,
  };
}

export function artistsReceived(artists: Artist[]): ArtistsReceivedAction {
  return {
    type: types.ARTISTS_RECEIVED,
    artists,
  };
}

export function selectArtist(artist: Artist): SelectArtistAction {
  return {
    type: types.SELECT_ARTIST,
    artist,
  };
}

export function deselectArtist(): Action {
  return {
    type: types.DESELECT_ARTIST,
  };
}

export function fetchTracks(): Action {
  return {
    type: types.FETCH_TRACKS,
  };
}

export function tracksReceived(tracks: Track[]): TracksReceivedAction {
  return {
    type: types.TRACKS_RECEIVED,
    tracks,
  };
}

export function selectTrack(track: Track): SelectTrackAction {
  return {
    type: types.SELECT_TRACK,
    track,
  };
}

export function deselectTrack(): Action {
  return {
    type: types.DESELECT_TRACK,
  };
}

export function playTrack(): Action {
  return {
    type: types.PLAY_TRACK,
  };
}

export function pauseTrack(): Action {
  return {
    type: types.PAUSE_TRACK,
  };
}

export function setVolume(level: number): SetVolumeAction {
  return {
    type: types.SET_VOLUME,
    level,
  };
}
