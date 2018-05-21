import { Action } from 'redux';
import * as types from './types';
import { Artist, Track } from './api-interfaces';
import { Palette } from 'node-vibrant/lib/color';

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

export interface PaletteGeneratedAction extends Action {
  palette: Palette;
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

export function clearTracks(): Action {
  return {
    type: types.CLEAR_TRACKS,
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

export function artistPaletteGenerated(palette: Palette): PaletteGeneratedAction {
  return {
    type: types.SET_ARTIST_PALETTE,
    palette,
  };
}

export function trackPaletteGenerated(palette: Palette): PaletteGeneratedAction {
  return {
    type: types.SET_TRACK_PALETTE,
    palette,
  };
}
