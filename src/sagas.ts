import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import * as types from './types';
import { Action } from 'redux';
import {
  getNextArtistsPage,
  getNextTracksPage,
  getSelectedArtist,
  getSelectedArtistImageUrl,
  getSelectedTrackImageUrl,
} from './selectors';
import { artistsReceived, tracksReceived, clearTracks, artistPaletteGenerated, trackPaletteGenerated } from './actions';
import { Artist, Track } from './api-interfaces';
import { delay } from 'redux-saga';
import Vibrant = require('node-vibrant');

function* fetchPopularArtists() {
  const popularTracks: Track[] = yield call(fetchPopularTracks);
  // Wait for all artists (instead of handling as they return) to ensure that order is preserved
  // (in case some API calls take longer than others)
  const trackArtists: Artist[] = yield all(popularTracks.map(track => call(fetchArtist, track.user.permalink)));
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

function* delayClearingTracks() {
  yield delay(500);
  yield put(clearTracks());
}

function* generateArtistPalette() {
  const imageUrl = yield select(getSelectedArtistImageUrl);
  // Use a CORS proxy so hearthis.at will play nice
  const palette = yield new Vibrant(`https://cors.now.sh/${imageUrl}`).getPalette();
  yield put(artistPaletteGenerated(palette));
}

function* generateTrackPalette() {
  const imageUrl = yield select(getSelectedTrackImageUrl);
  // Use a CORS proxy so hearthis.at will play nice
  const palette = yield new Vibrant(`https://cors.now.sh/${imageUrl}`).getPalette();
  yield put(trackPaletteGenerated(palette));
}

export default function* rootSaga() {
  yield takeEvery(types.FETCH_ARTISTS, fetchPopularArtists);
  yield takeEvery(types.FETCH_TRACKS, fetchTracksForSelectedArtist);
  yield takeEvery(types.DESELECT_ARTIST, delayClearingTracks);
  yield takeEvery(types.SELECT_ARTIST, generateArtistPalette);
  yield takeEvery(types.SELECT_TRACK, generateTrackPalette);
}
