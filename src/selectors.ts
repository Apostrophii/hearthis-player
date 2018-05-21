import { State } from './state';

export const getNextArtistsPage = (state: State) => state.nextArtistsPage;
export const getNextTracksPage = (state: State) => state.nextTracksPage;
export const getSelectedArtist = (state: State) => state.selectedArtist;
