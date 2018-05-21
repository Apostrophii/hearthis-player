import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import generalStyles from '../styles';
import { connect } from 'react-redux';
import { State } from '../state';
import { Action, Dispatch } from 'redux';
import { playTrack, pauseTrack } from '../actions';
import { Track } from '../api-interfaces';
import { getRbgFromPalette } from '../utils';

interface StateProps {
  selectedTrack: State['selectedTrack'];
  trackPalette: State['trackPalette'];
  currentlyPlayingTrack: State['currentlyPlayingTrack'];
}

interface DispatchProps {
  playTrack: () => Action;
  pauseTrack: () => Action;
}

class Player extends React.Component<StateProps & DispatchProps> {
  audio?: HTMLAudioElement;

  componentDidUpdate(prevProps: StateProps & DispatchProps, prevState: State) {
    if (this.props.selectedTrack && this.props.selectedTrack !== prevProps.selectedTrack) {
      this.stopTrack();
      this.setTrack(this.props.selectedTrack);
      this.playTrack();
    }

    if (this.props.currentlyPlayingTrack !== prevProps.currentlyPlayingTrack) {
      this.props.currentlyPlayingTrack ? this.playTrack() : this.pauseTrack();
    }
  }

  setTrack(track: Track) {
    this.audio = new Audio();
    this.audio.preload = 'all';
    this.audio.src = track.stream_url;
  }

  playTrack() {
    this.audio && this.audio.play();
  }

  pauseTrack() {
    this.audio && this.audio.pause();
  }

  stopTrack() {
    if (this.audio) {
      this.audio.src = '';
    }
  }

  toggleAudio() {
    if (this.audio) {
      this.audio.paused ? this.props.playTrack() : this.props.pauseTrack();
    }
  }

  vibrant() {
    return getRbgFromPalette(this.props.trackPalette, 'Vibrant', 'white');
  }

  muted() {
    return getRbgFromPalette(this.props.trackPalette, 'DarkMuted', 'black');
  }

  render() {
    return (
      <div
        className={css(generalStyles.bar, generalStyles.shadow, styles.playerContainer)}
        style={{ backgroundColor: this.muted() }}
      >
        <div
          onClick={() => this.toggleAudio()}
          className={css(
            styles.diskPosition,
            generalStyles.shadow,
            generalStyles.pointer,
            styles.spin,
            !this.props.currentlyPlayingTrack && styles.paused,
          )}
        >
          {this.props.selectedTrack && (
            <img src={this.props.selectedTrack.artwork_url} className={css(styles.diskArt)} />
          )}
          <div className={css(styles.diskCenter)} />
        </div>
        <div className={css(generalStyles.barTitle, generalStyles.singleLine)} style={{ color: this.vibrant() }}>
          {this.props.selectedTrack ? this.props.selectedTrack.title : 'no track selected'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    selectedTrack: state.selectedTrack,
    trackPalette: state.trackPalette,
    currentlyPlayingTrack: state.currentlyPlayingTrack,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    playTrack: () => dispatch(playTrack()),
    pauseTrack: () => dispatch(pauseTrack()),
  };
};

const ConnectedPlayer = connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Player);

export default ConnectedPlayer;

const rotation = {
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
};

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 180px minmax(50%, 300px) 1fr',
  },
  diskPosition: {
    gridColumn: 2,
    width: '180px',
    height: '180px',
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'relative',
    top: '-60px',
    // Gradient from https://codepen.io/thebabydino/pen/HjJlL
    background:
      'linear-gradient(30deg, transparent 40%, rgba(42, 41, 40, .85) 40%) no-repeat 100% 0, linear-gradient(60deg, rgba(42, 41, 40, .85) 60%, transparent 60%) no-repeat 0 100%,     repeating-radial-gradient(#2a2928, #2a2928 4px, #ada9a0 5px, #2a2928 6px)',
  },
  diskArt: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: '2px',
    borderRadius: '50%',
    boxSizing: 'border-box',
  },
  diskCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-35px',
    border: 'solid 1px #d9a388',
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    boxShadow: '0 0 0 4px #da5b33, inset 0 0 0 27px #da5b33',
    background: '#b5ac9a',
    zIndex: 5,
  },
  spin: {
    animationName: [rotation],
    animationDuration: '5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  paused: {
    animationPlayState: 'paused',
  },
});
