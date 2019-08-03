import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import { DarkButton } from '../components/Button';

export default class Filters extends React.Component {
  render() {
    const { results, navigation } = this.props;

    return (
      <View style={styles.base}>
        <DarkButton style={styles.item} type="primary" title="Players" />
        <DarkButton style={styles.item} type="primary" title="Time" />
        <DarkButton style={styles.item} type="primary" title="Items" />
        <DarkButton style={styles.item} type="primary" title="Category" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginBottom: 6
  },
  item: {
    flex: 1,
    marginHorizontal: 4
  }
});
