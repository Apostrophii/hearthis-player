import { Reducer, combineReducers } from 'redux';
import * as types from './types';
import { Artist, Track } from './api-interfaces';
import { State } from './state';

const artists: Reducer<State['artists']> = (state = [], action) => {
  switch (action.type) {
    case types.ARTISTS_RECEIVED:
      const allArtists = state.concat(action.artists);
      // When adding more artists to the list we need to filter out duplicate artists
      // who may have shown up because they have more than one sufficiently popular track
      return allArtists.filter((artist, index, artists) => {
        return index === artists.findIndex(a => a.permalink === artist.permalink);
      });
    default:
      return state;
  }
};

const nextArtistsPage: Reducer<State['nextArtistsPage']> = (state = 0, action) => {
  switch (action.type) {
    case types.FETCH_ARTISTS:
      return state + 1;
    default:
      return state;
  }
};

const selectedArtist: Reducer<State['selectedArtist']> = (state = null, action) => {
  switch (action.type) {
    case types.SELECT_ARTIST:
      return action.artist;
    case types.DESELECT_ARTIST:
      return null;
    default:
      return state;
  }
};

const tracks: Reducer<State['tracks']> = (state = [], action) => {
  switch (action.type) {
    case types.TRACKS_RECEIVED:
      return state.concat(action.tracks);
    case types.CLEAR_TRACKS:
      return [];
    default:
      return state;
  }
};

const nextTracksPage: Reducer<State['nextTracksPage']> = (state = 0, action) => {
  switch (action.type) {
    case types.FETCH_TRACKS:
      return state + 1;
    case types.SELECT_ARTIST:
    case types.DESELECT_ARTIST:
      return 0;
    default:
      return state;
  }
};

const selectedTrack: Reducer<State['selectedTrack']> = (state = null, action) => {
  switch (action.type) {
    case types.SELECT_TRACK:
      return action.track;
    case types.DESELECT_TRACK:
      return null;
    default:
      return state;
  }
};

const currentlyPlayingTrack: Reducer<State['currentlyPlayingTrack']> = (state = false, action) => {
  switch (action.type) {
    case types.SELECT_TRACK:
    case types.PLAY_TRACK:
      return true;
    case types.DESELECT_TRACK:
    case types.PAUSE_TRACK:
      return false;
    default:
      return state;
  }
};

const artistPalette: Reducer<State['artistPalette']> = (state = null, action) => {
  switch (action.type) {
    case types.SET_ARTIST_PALETTE:
      return action.palette;
    case types.DESELECT_ARTIST:
      return null;
    default:
      return state;
  }
};

const trackPalette: Reducer<State['trackPalette']> = (state = null, action) => {
  switch (action.type) {
    case types.SET_TRACK_PALETTE:
      return action.palette;
    case types.DESELECT_TRACK:
      return null;
    default:
      return state;
  }
};

const reducers = combineReducers<State>({
  artists,
  nextArtistsPage,
  selectedArtist,
  tracks,
  nextTracksPage,
  selectedTrack,
  currentlyPlayingTrack,
  artistPalette,
  trackPalette,
});

export default reducers;
