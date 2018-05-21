import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import * as types from './types';
import { Action } from 'redux';
import { getNextArtistsPage, getNextTracksPage, getSelectedArtist } from './selectors';
import { artistsReceived, tracksReceived } from './actions';
import { Artist, Track } from './api-interfaces';

function* fetchPopularArtists() {
  const popularTracks: Track[] = yield call(fetchPopularTracks);
  const trackArtists: Artist[] = yield all(popularTracks.map(track => call(fetchArtist, track.user.permalink)));
  console.log(trackArtists);
  yield put(artistsReceived(trackArtists));
}

function* fetchPopularTracks() {
  try {
    const nextPage = yield select(getNextArtistsPage);

    const res = yield fetch(`https://api-v2.hearthis.at/feed/?type=popular&page=${nextPage}&count=20`);
    const data = yield res.json();

    if (res.ok) {
      return data;
    } else {
      // TODO
    }
  } catch (err) {
    // TODO
  }
}

function* fetchArtist(artistPermalink: string) {
  try {
    const res = yield fetch(`https://api-v2.hearthis.at/${artistPermalink}/`);
    const data = yield res.json();

    if (res.ok) {
      return data;
    } else {
      // TODO
    }
  } catch (err) {
    // TODO
  }
}

function* fetchTracksForSelectedArtist() {
  try {
    const nextPage = yield select(getNextTracksPage);
    const artist: Artist = yield select(getSelectedArtist);

    if (!artist) {
      return;
    }

    const res = yield fetch(`https://api-v2.hearthis.at/${artist.permalink}/?type=tracks&page=${nextPage}&count=20`);
    const data = yield res.json();

    if (res.ok) {
      yield put(tracksReceived(data));
    } else {
      // TODO
    }
  } catch (err) {
    // TODO
  }
}

export default function* rootSaga() {
  yield takeEvery(types.FETCH_ARTISTS, fetchPopularArtists);
  yield takeEvery(types.FETCH_TRACKS, fetchTracksForSelectedArtist);
}
