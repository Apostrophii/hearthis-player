import { Artist, Track } from './api-interfaces';
import { Palette } from 'node-vibrant/lib/color';

export interface State {
  artists: Artist[];
  nextArtistsPage: number;
  selectedArtist: Artist | null;
  tracks: Track[];
  nextTracksPage: number;
  selectedTrack: Track | null;
  currentlyPlayingTrack: boolean;
  artistPalette: Palette | null;
  trackPalette: Palette | null;
}

export const initialState: Partial<State> = {};
