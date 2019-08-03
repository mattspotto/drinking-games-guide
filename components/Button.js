import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { InterText } from './StyledText';
import Colors from '../constants/Colors';

export const DarkButton = ({
  title,
  style,
  type,
  children,
  onPress
}) => {
  const baseStyle = {
    primary: styles.basePrimary
  }[type];

  const textStyle = {
    primary: styles.textPrimary
  }[type];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, styles.base, baseStyle]}
    >
      {title ? <InterText style={[styles.text, textStyle]}>{title}</InterText> : null}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: Colors.b2,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  basePrimary: {
    borderColor: Colors.tintColor
  },
  text: {
    color: 'white',
  },
  textPrimary: {
    color: Colors.tintColor
  }
});
