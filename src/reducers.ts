import { Reducer, combineReducers } from 'redux';
import * as types from './types';
import { Artist, Track } from './api-interfaces';
import { State } from './state';

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
    case types.PLAY_TRACK:
      return true;
    case types.PAUSE_TRACK:
      return false;
    default:
      return state;
  }
};

const trackVolume: Reducer<State['trackVolume']> = (state = 1, action) => {
  switch (action.type) {
    case types.SET_VOLUME:
      return action.level;
    default:
      return state;
  }
};

const reducers = combineReducers<State>({
  selectedArtist,
  selectedTrack,
  currentlyPlayingTrack,
  trackVolume,
});

export default reducers;
