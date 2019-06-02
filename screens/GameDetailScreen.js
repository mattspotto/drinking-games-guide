import React from 'react';
import Prismic from 'prismic-javascript';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import Colors from '../constants/Colors';

const defaultGame = {
  name: 'Game not found',
  description: 'This game could not be found, try refreshing or search for a different game'
};

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
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
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'Game not found');
    const gameData = navigation.getParam('item', defaultGame);
    console.log('PROPS', gameData);
    console.log('title', navigation.getParam('title', ''));

    if (gameData.data) {
      
    }

    const {
      // Plain text fields
      access,
      category,
      intensity,
      min_players,
      maximum_players,
      recommended_players,
      players,
      time,
      // Nested full text fields
      rules,
      description
    } = gameData.data;

    const data = {
      access: 'Free',
      category: 'Mini',
      description: [{
        spans: [],
        text: 'How many things can you name in a category',
        type: 'paragraph',
      }, ],
      gameimage: {},
      intensity: 'chilled',
      items: [{
        item: {
          link_type: 'Document',
        },
      }, ],
      maximum_players: 16,
      min_players: 3,
      name: [{
        spans: [],
        text: 'Categories ',
        type: 'heading1',
      }, ],
      players: '5-20',
      rating: null,
      recommended_players: 8,
      rules: [{
          spans: [{
            end: 97,
            start: 71,
            type: 'em',
          }, ],
          text: ' One person selects a category then starts by saying something from it i.e. Car brands, Holden...',
          type: 'o-list-item',
        },
        {
          spans: [],
          text: ' Then go around circle saying something from that category',
          type: 'o-list-item',
        },
        {
          spans: [],
          text: 'First person to stuff up drinks',
          type: 'o-list-item',
        },
      ],
      time: 'short'
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    color: Colors.textColor
  },
  text: {
    color: Colors.textColor
  }
});
