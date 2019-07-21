import React from 'react';
import Prismic from 'prismic-javascript';
import {
  ActivityIndicator,
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import { InterText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { apiEndpoint } from '../constants/Prismic';
import { get } from '../utils/object';
import { RichText } from '../utils/prismicUtils';
import { defaultNavigationProps } from '../navigation/MainTabNavigator';

const defaultGame = {
  name: 'Game not found',
  description: 'This game could not be found, try refreshing or search for a different game'
};

export default class GameDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavigationProps,
    title: `${get(['state', 'params', 'title'], navigation) || 'Unknown'}`,
    headerBackImage: (
      <Image source={require('../assets/images/logo-slanted.png')}
        style={{ width: 60, height: 60 }}
      />
    )
  });

  constructor(props) {
    super(props);

    this._submitQuery = this._submitQuery.bind(this);

    this.state = {
      doc: {},
      tipsData: {
        results: [],
        page: 0
      },
      tipsShown: false
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
      });

      this._fetchTips(gameData);
    }
  }

  renderTips() {
    const { results } = this.state.tipsData;

    return results.map(item => {
      const {
        intensity,
        tip
      } = item.data;

      return <RichText paragraphs={tip} />;
    });
  }

  renderRules() {
    const { doc } = this.state;

    let el = null;

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

      el = (
        <View>
          <InterText style={styles.title}>Rules</InterText>

          <RichText paragraphs={rules} />
        </View>
      );
    }

    return (
      <ScrollView style={styles.bottomContainer} contentContainerStyle={styles.contentContainer}>
        {el}
      </ScrollView>
    );
  }

  render() {
    const { navigation } = this.props;
    const { doc, tipsShown } = this.state;
    const title = navigation.getParam('title', 'Game not found');

    // console.log('PROPS', doc);

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
        description
      } = doc.data;

      el = (
        <View>
          <InterText style={styles.text}>Category {category}</InterText>
          <InterText style={styles.text}>Intensity {intensity}</InterText>
          <InterText style={styles.text}>Time {time}</InterText>

          <View style={styles.row}>
            <Icon.MaterialCommunityIcons
              name="account-multiple"
              size={26}
              color="white"
              style={styles.metaIcon}
            />

            <View>
              <InterText style={styles.text}>{min_players} - {maximum_players}</InterText>
              <InterText style={styles.text}>({recommended_players})</InterText>
            </View>
          </View>

          <InterText style={[styles.text, styles.subtle]}>
            {description.map(paragraph => paragraph.text)}
          </InterText>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          {el}

          <Button onPress={() => this.setState({ tipsShown: !tipsShown })}
            title={`${tipsShown ? 'Hide' : 'Show'} Tips`}
            color={Colors.tintColor}
          />
        </View>

        {!tipsShown && this.renderRules()}

        {tipsShown && this.renderTips()}
      </SafeAreaView>
    );
  }

  _submitQuery(id) {
    Prismic.getApi(apiEndpoint)
      .then(api => api.getByID(id))
      .then(doc => {
        // console.log('document', doc);
        this.setState({ doc })
        this._fetchTips(doc);
      })
      .catch(err => {
        console.log('ERR', err)
      });
  }

  _fetchTips(data) {
    console.log('fetching tips', data.id);

    Prismic.getApi(apiEndpoint)
      .then(api => api.query([
        Prismic.Predicates.at('document.type', 'tips'),
        Prismic.Predicates.at('my.tips.games.gameid', data.id)
      ]))
      .then(tips => {
        console.log('RESPOMNSE', tips);
        this.setState({ tipsData: tips });
      })
      .catch(err => {
        console.log('ERR', err)
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColorDark
  },
  topContainer: {
    backgroundColor: Colors.backgroundColor
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColorDark
  },
  contentContainer: {
    paddingTop: 30
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
  row: {
    flexDirection: 'row'
  }
});
