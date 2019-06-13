import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';

export default class LinksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Favourites',
    headerTintColor: Colors.tintColor,
    headerTitleStyle: {
      color: Colors.tintColor
    },
    headerStyle: {
      backgroundColor: Colors.backgroundSecondary,
      paddingVertical: 12,
      borderBottomColor: Colors.secondaryBorder
    }
  });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.inner}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
             * content, we just wanted to provide you with some helpful links */}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 40
  },
  inner: {
    flex: 1
  }
});
