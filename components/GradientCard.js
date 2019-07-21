import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Icon, LinearGradient } from 'expo';

import Colors from '../constants/Colors';

export default class Card extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#2A3452', '#1D2438']}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.gradient}>
          <View style={styles.containerInner}>
            {children}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  gradient: {
    borderRadius: 8
  },
  containerInner: {
    paddingVertical: 8,
    paddingHorizontal: 12
  }
});
