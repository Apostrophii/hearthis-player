import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Artist } from '../api-interfaces';
import generalStyles from '../styles';
import { SelectArtistAction } from '../actions';

interface Props {
  imageUrl: string;
  mainText: string;
  subText: string;
  onClick: () => void;
}

const Tile: React.SFC<Props> = props => {
  return (
    <div
      onClick={() => props.onClick()}
      className={css(styles.artistCard, generalStyles.pointer, generalStyles.shadow)}
    >
      <div className={css(styles.imageContainer)}>
        <img src={props.imageUrl} className={css(styles.image)} />
      </div>
      <div className={css(styles.info)}>
        <div className={css(styles.username, generalStyles.singleLine)}>{props.mainText}</div>
        <div className={css(styles.trackCount, generalStyles.singleLine)}>{props.subText}</div>
      </div>
    </div>
  );
};

export default Tile;

const styles = StyleSheet.create({
  artistCard: {
    width: '200px',
    maxWidth: '40vw',
    margin: '8px',
    flexShrink: 0,
  },
  imageContainer: {
    height: '200px',
    maxHeight: '40vw',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    height: '40px',
    padding: '4px',
  },
  username: {
    fontWeight: 'bold',
    height: '20px',
    lineHeight: '20px',
  },
  trackCount: {},
});
