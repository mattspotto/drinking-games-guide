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
  SafeAreaView
} from 'react-native';
import { WebBrowser, Icon, LinearGradient } from 'expo';

import { apiEndpoint } from '../constants/Prismic';
import Colors from '../constants/Colors';
import GradientCard from '../components/GradientCard';
import { InterText } from '../components/StyledText';
import { extractText } from '../utils/prismicUtils';
import { defaultNavigationProps } from '../navigation/MainTabNavigator';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle: null
  }

  constructor(props) {
    super(props);

    this._submitSearchQuery = this._submitSearchQuery.bind(this);

    this.state = {
      text: '',
      data: {
        results: [],
        page: 0
      },
      isFetching: false
    };
  }

  componentWillMount() {
    this._submitSearchQuery();
  }

  render() {
    const { isFetching } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/images/TextLogoWhite.png')}
            style={styles.bannerImage}
          />
        </View>

        <View style={styles.searchContainer}>
          <Icon.MaterialCommunityIcons
            name="magnify"
            size={24}
            color={Colors.textColor}
            style={styles.metaIcon}
          />

          <TextInput style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={Colors.textColorSecondary}
            onChangeText={text => this.setState({ text })}
            onEndEditing={this._submitSearchQuery}
            value={this.state.text}
          />
        </View>

        <LinearGradient colors={['#1D2438', '#151A29']}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.block}>
          <ScrollView style={styles.contentContainer}
            contentContainerStyle={styles.contentInnerContainer}>
            {isFetching && (
              <ActivityIndicator size="large"
                style={styles.activityIndicator}
                color={Colors.tintColor}
              />
            )}

            {this._renderResults()}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  _renderResults() {
    const { results } = this.state.data;

    return results.map(item => {
      const {
        name,
        description,
        intensity,
        category,
        players
      } = item.data;

      const title = extractText(name);

      return (
        <TouchableOpacity key={item.id}
          onPress={() => this.props.navigation.navigate('GameDetail', { data: item, title })}>
          <GradientCard>
            <View style={styles.row}>
              <View>
                <InterText style={styles.cardTitle}>{title}</InterText>
                <InterText style={styles.cardText}>{description.map(paragraph => paragraph.text)}</InterText>
              </View>


              <View style={styles.gameMeta}>
                <Icon.MaterialCommunityIcons
                  name="account-multiple"
                  size={20}
                  color="white"
                  style={styles.metaIcon}
                />

                <InterText style={styles.cardText}>{players}</InterText>
              </View>
            </View>

            <View style={styles.badge}>
              <InterText style={styles.badgeText}>{category}</InterText>
            </View>
          </GradientCard>
        </TouchableOpacity>
      );
    });
  }

  _submitSearchQuery() {
    const { text } = this.state;

    this.setState({ isFetching: true });

    Prismic.getApi(apiEndpoint).then(api => {
      return api.query([
        Prismic.Predicates.at('document.type', 'games'),
        Prismic.Predicates.fulltext('document', text)
      ], { orderings : '[my.games.rating desc]' });
    })
      .then(response => {
        console.log('RES', response);
        this.setState({
          data: response,
          isFetching: false
        });
      })
      .catch(err => {
        console.log('ERR', err)
        this.setState({ isFetching: false });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 40
  },
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundSecondary,
    flex: 1,
    // backgroundColor: Colors.backgroundColorDark
  },
  block: {
    flex: 1
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4
  },
  badgeText: {
    fontSize: 12,
    color: 'white'
  },
  contentInnerContainer: {
    paddingTop: 12
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: 240,
    height: 80,
    resizeMode: 'contain'
  },
  searchContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.secondaryBorder,
    borderRadius: 8,
    borderWidth: 1
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: Colors.textColor
  },
  searchIcon: {
    marginRight: 6
  },
  activityIndicator: {
    paddingVertical: 20
  },
  gameMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaIcon: {
    marginRight: 4
  },
  cardTitle: {
    color: Colors.textColor,
    fontSize: 20
  },
  cardText: {
    color: Colors.textColor,
    fontSize: 16
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
