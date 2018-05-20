import { Artist, Track } from './api-interfaces';

export interface State {
  selectedArtist?: Artist;
  selectedTrack?: Track;
  currentlyPlayingTrack: boolean;
  trackVolume: number;
}

export const initialState: State = {
  selectedArtist: undefined,
  selectedTrack: undefined,
  currentlyPlayingTrack: false,
  trackVolume: 1,
};
