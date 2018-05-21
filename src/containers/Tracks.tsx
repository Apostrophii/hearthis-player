import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import generalStyles from '../styles';
import { connect } from 'react-redux';
import { State } from '../state';
import { Action, Dispatch } from 'redux';
import { SelectTrackAction, fetchTracks, selectTrack } from '../actions';
import Tile from '../components/Tile';
import InfiniteScroll from 'react-infinite-scroller';
import { Track } from '../api-interfaces';
import { getRbgFromPalette } from '../utils';

interface StateProps {
  tracks: State['tracks'];
  artistPalette: State['artistPalette'];
  selectedArtist: State['selectedArtist'];
}

interface DispatchProps {
  fetchTracks: () => Action;
  selectTrack: (track: Track) => SelectTrackAction;
}

class Tracks extends React.Component<StateProps & DispatchProps> {
  vibrant() {
    return getRbgFromPalette(this.props.artistPalette, 'Vibrant', 'white');
  }

  muted() {
    return getRbgFromPalette(this.props.artistPalette, 'DarkMuted', 'black');
  }

  minutesAndSeconds(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    const padding = seconds < 10 ? '0' : '';
    return `${minutes}:${seconds}${padding}`;
  }

  render() {
    return (
      <div className={css(styles.tracksContainer, this.props.selectedArtist && styles.shown)}>
        <div className={css(generalStyles.bar, generalStyles.shadow)} style={{ backgroundColor: this.muted() }}>
          <div className={css(generalStyles.barTitle, generalStyles.rightAlign)} style={{ color: this.vibrant() }}>
            {this.props.selectedArtist && this.props.selectedArtist.username}’s tracks
          </div>
        </div>
        <div className={css(styles.trackGridContainer)}>
          <InfiniteScroll
            loadMore={() => this.props.fetchTracks()}
            hasMore={!!this.props.selectedArtist && this.props.tracks.length < this.props.selectedArtist.track_count}
            useWindow={false}
            threshold={1000}
            loader={
              <div key={-1} className={css(generalStyles.loading)}>
                Loading&hellip;
              </div>
            }
            className={css(styles.trackGrid)}
          >
            {this.props.tracks.map((track, index) => (
              <Tile
                key={index}
                imageUrl={track.artwork_url}
                mainText={track.title}
                subText={this.minutesAndSeconds(Number(track.duration))}
                onClick={() => this.props.selectTrack(track)}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    tracks: state.tracks,
    artistPalette: state.artistPalette,
    selectedArtist: state.selectedArtist,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchTracks: () => dispatch(fetchTracks()),
    selectTrack: (track: Track) => dispatch(selectTrack(track)),
  };
};

const ConnectedTracks = connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Tracks);

export default ConnectedTracks;

const styles = StyleSheet.create({
  tracksContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: '100vh',
    backgroundColor: 'white',
    transform: 'translate(0, 0)',
    transition: 'transform 500ms ease-in',
  },
  shown: {
    transform: 'translate(0px, calc(-100vh + 48px))',
  },
  trackGridContainer: {
    height: 'calc(100% - 144px);',
    overflow: 'auto',
  },
  trackGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '4px',
  },
});
