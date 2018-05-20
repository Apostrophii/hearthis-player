import { takeEvery, select } from 'redux-saga/effects';
import * as types from './types';
import { Action } from 'redux';
import { getNextArtistsPage, getNextTracksPage } from './selectors';

function* fetchArtists(action: Action) {
  const nextPage = yield select(getNextArtistsPage);
}

function* fetchTracks(action: Action) {
  const nextPage = yield select(getNextTracksPage);
}

export default function* rootSaga() {
  yield takeEvery(types.FETCH_ARTISTS, fetchArtists);
  yield takeEvery(types.FETCH_TRACKS, fetchTracks);
}
