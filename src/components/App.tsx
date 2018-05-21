import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { State } from '../state';
import Artists from '../containers/Artists';
import Tracks from '../containers/Tracks';
import Player from '../containers/Player';

const App: React.SFC<State> = props => {
  return (
    <div className={css(styles.appContainer)}>
      <Artists {...props} />
      <Tracks {...props} />
      <Player {...props} />
    </div>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
    height: '100%',
  },
});
