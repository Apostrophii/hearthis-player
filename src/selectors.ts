import { State } from './state';

export const getNextArtistsPage = (state: State) => state.nextArtistsPage;
export const getNextTracksPage = (state: State) => state.nextTracksPage;
export const getSelectedArtist = (state: State) => state.selectedArtist;
export const getSelectedArtistImageUrl = (state: State) => state.selectedArtist && state.selectedArtist.avatar_url;
export const getSelectedTrackImageUrl = (state: State) => state.selectedTrack && state.selectedTrack.artwork_url;
