import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../state';
import { Action, Dispatch } from 'redux';
import { fetchArtists } from '../actions';

interface StateProps {
  artists: State['artists'];
}

interface DispatchProps {
  fetchArtists: () => Action;
}

class Artists extends React.Component<StateProps & DispatchProps> {
  render() {
    return (
      <div>
        <button onClick={() => this.props.fetchArtists()}>Fetch artist</button>
        {this.props.artists.map((artist, index) => <div key={index}>{artist.username}</div>)}
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    artists: state.artists,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchArtists: () => dispatch(fetchArtists()),
  };
};

const ConnectedArtists = connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps)(Artists);

export default ConnectedArtists;
