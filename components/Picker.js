import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../constants/Colors';

export const DarkPicker = ({
  type,
  style,
  selectedValue,
  onValueChange,
  items
}) => {
  const baseStyle = {
    primary: styles.basePrimary
  }[type];

  const textStyle = {
    primary: textStylesPrimary
  }[type];

  return (
    <View style={[style, styles.base, baseStyle]}>
      <RNPickerSelect
        items={items}
        onValueChange={onValueChange}
        style={{ ...pickerSelectStyles, ...textStyle }}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.b2,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8
  },
  basePrimary: {
    borderColor: Colors.tintColor,
    color: Colors.tintColor
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    color: 'white',
  },
  inputAndroid: {
    textAlign: 'center',
    color: 'white',
  }
});

const textStylesPrimary = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    color: Colors.tintColor,
  },
  inputAndroid: {
    textAlign: 'center',
    color: Colors.tintColor,
  },
});
