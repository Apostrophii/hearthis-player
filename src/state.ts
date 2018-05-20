import { Artist, Track } from './api-interfaces';

export interface State {
  artists: Artist[];
  nextArtistsPage: number;
  selectedArtist: Artist | null;
  tracks: Track[];
  nextTracksPage: number;
  selectedTrack: Track | null;
  currentlyPlayingTrack: boolean;
  trackVolume: number;
}

export const initialState: Partial<State> = {};
