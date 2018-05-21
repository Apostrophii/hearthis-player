import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import generalStyles from '../styles';
import { connect } from 'react-redux';
import { State } from '../state';
import { Action, Dispatch } from 'redux';
import { fetchArtists, SelectArtistAction, selectArtist, deselectArtist } from '../actions';
import Tile from '../components/Tile';
import InfiniteScroll from 'react-infinite-scroller';
import { Artist } from '../api-interfaces';

interface StateProps {
  artists: State['artists'];
  selectedArtist: State['selectedArtist'];
}

interface DispatchProps {
  fetchArtists: () => Action;
  selectArtist: (artist: Artist) => SelectArtistAction;
  deselectArtist: () => Action;
}

class Artists extends React.Component<StateProps & DispatchProps> {
  render() {
    return (
      <div className={css(styles.artistsContainer)}>
        <div
          className={css(generalStyles.bar, this.props.selectedArtist && generalStyles.pointer, generalStyles.shadow)}
          onClick={() => this.props.deselectArtist()}
        >
          <div className={css(generalStyles.barTitle, generalStyles.rightAlign)}>
            {this.props.selectedArtist && 'back to '} POPULAR ARTISTS
          </div>
        </div>
        <div className={css(styles.artistGridContainer)}>
          <InfiniteScroll
            loadMore={() => this.props.fetchArtists()}
            hasMore={true}
            useWindow={false}
            threshold={1000}
            loader={
              <div key={-1} className={css(generalStyles.loading)}>
                Loading&hellip;
              </div>
            }
            className={css(styles.artistGrid)}
          >
            {this.props.artists.map((artist, index) => (
              <Tile
                key={index}
                imageUrl={artist.avatar_url}
                mainText={artist.username}
                subText={`${artist.track_count} tracks`}
                onClick={() => this.props.selectArtist(artist)}
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
    artists: state.artists,
    selectedArtist: state.selectedArtist,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchArtists: () => dispatch(fetchArtists()),
    selectArtist: (artist: Artist) => dispatch(selectArtist(artist)),
    deselectArtist: () => dispatch(deselectArtist()),
  };
};

const ConnectedArtists = connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Artists);

export default ConnectedArtists;

const styles = StyleSheet.create({
  artistsContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  artistGridContainer: {
    height: 'calc(100% - 96px);',
    overflow: 'auto',
  },
  artistGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '4px',
  },
});
