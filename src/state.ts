import { Artist, Track } from './api-interfaces';

export interface State {
  selectedArtist: Artist | null;
  selectedTrack: Track | null;
  currentlyPlayingTrack: boolean;
  trackVolume: number;
}

export const initialState: State = {
  selectedArtist: null,
  selectedTrack: null,
  currentlyPlayingTrack: false,
  trackVolume: 1,
};
