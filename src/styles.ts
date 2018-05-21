import { StyleSheet, css } from 'aphrodite/no-important';

const generalStyles = StyleSheet.create({
  shadow: {
    boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
  },
  bar: {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    height: '48px',
  },
  barTitle: {
    fontSize: '24px',
    padding: '8px 16px',
  },
  loading: {
    width: '100%',
    fontSize: '20px',
    textAlign: 'center',
    padding: '20px',
  },
  pointer: {
    cursor: 'pointer',
  },
  rightAlign: {
    textAlign: 'right',
  },
  singleLine: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

export default generalStyles;
