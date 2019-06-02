import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class Card extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.secondaryBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12
  }
});
