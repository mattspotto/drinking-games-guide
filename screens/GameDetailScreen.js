import React from 'react';
import Prismic from 'prismic-javascript';
import {
  ActivityIndicator,
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
import { apiEndpoint } from '../constants/Prismic';
import { get } from '../utils/object';

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

  constructor(props) {
    super(props);

    this._submitQuery = this._submitQuery.bind(this);

    this.state = {
      doc: {}
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const gameData = navigation.getParam('data', defaultGame);
    const id = navigation.getParam('id', null);

    if (id) {
      this._submitQuery(id);
    } else if (gameData) {
      this.setState({
        doc: gameData
      })
    }
  }

  render() {
    const { navigation } = this.props;
    const { doc } = this.state;
    const title = navigation.getParam('title', 'Game not found');

    console.log('PROPS', doc);
    console.log('title', navigation.getParam('title', ''));

    let el = (
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );

    if (doc.data) {
      const {
        // Plain text fields
        category,
        intensity,
        min_players,
        maximum_players,
        recommended_players,
        time,
        // Nested full text fields
        rules,
        description
      } = doc.data;

      const rulesEl = rules && rules.length
        ? rules.map(rule => {
          const id = get(['spans', 0, 'data', 'id'], rule);

          if (id) {
            return (
              <TouchableOpacity key={rule.text}
                onPress={() => this.props.navigation.navigate({
                  routeName: 'GameDetail',
                  params: {
                    id,
                    title: rule.text,
                    data: null
                  },
                  key: id
                })}>
                <View style={styles.ruleItem}>
                  <Text style={[styles.text, styles.link]}>{rule.text}</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <View key={rule.text} style={styles.ruleItem}>
              <Text style={styles.text}>{rule.text}</Text>
            </View>
          );
        })
        : [];

      el = (
        <View>
          <Text style={styles.text}>Category {category}</Text>
          <Text style={styles.text}>Intensity {intensity}</Text>
          <Text style={styles.text}>Time {time}</Text>

          <View style={styles.row}>
            <Icon.MaterialCommunityIcons
              name="account-multiple"
              size={26}
              color="white"
              style={styles.metaIcon}
            />

            <View>
              <Text style={styles.text}>{min_players} - {maximum_players}</Text>
              <Text style={styles.text}>({recommended_players})</Text>
            </View>
          </View>

          <Text style={[styles.text, styles.subtle]}>
            {description.map(paragraph => paragraph.text)}
          </Text>

          <Text style={styles.title}>Rules</Text>

          {rulesEl}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

          {el}
        </ScrollView>
      </View>
    );
  }

  _submitQuery(id) {
    Prismic.getApi(apiEndpoint).then(api => api.getByID(id))
      .then(doc => {
        console.log('document', doc);
        this.setState({ doc })
      })
      .catch(err => {
        console.log('ERR', err)
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  ruleItem: {
    paddingBottom: 8
  },
  title: {
    paddingBottom: 12,
    fontSize: 24,
    color: Colors.textColorLight
  },
  text: {
    fontSize: 16,
    color: Colors.textColorLight
  },
  subtle: {
    color: Colors.textColor
  },
  link: {
    color: Colors.tintColor
  },
  row: {
    flexDirection: 'row'
  }
});
