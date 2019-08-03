import React from 'react';
import Prismic from 'prismic-javascript';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView
} from 'react-native';
import { Icon } from 'expo';

import { apiEndpoint } from '../constants/Prismic';
import Colors from '../constants/Colors';

import Results from './Results';
import Filters from './Filters';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle: null
  }

  constructor(props) {
    super(props);

    this.submitSearchQuery = this.submitSearchQuery.bind(this);

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
    this.submitSearchQuery();
  }

  submitSearchQuery() {
    const { text } = this.state;

    this.setState({ isFetching: true });

    Prismic.getApi(apiEndpoint).then(api => api.query([
      Prismic.Predicates.at('document.type', 'games'),
      Prismic.Predicates.fulltext('document', text)
    ], { orderings: '[my.games.rating desc]' }))
      .then((response) => {
        console.log('RES', response);
        this.setState({
          data: response,
          isFetching: false
        });
      })
      .catch((err) => {
        console.log('ERR', err);
        this.setState({ isFetching: false });
      });
  }

  render() {
    const { isFetching, text, data } = this.state;

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

          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={Colors.textColorSecondary}
            onChangeText={t => this.setState({ text: t })}
            onEndEditing={this.submitSearchQuery}
            value={text}
          />
        </View>

        <Filters />

        <View style={[styles.block, styles.resultsBlock]}>
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={styles.contentInnerContainer}
          >
            {isFetching && (
              <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
                color={Colors.tintColor}
              />
            )}

            <Results {...this.props} results={data.results} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.b2,
    paddingTop: 40
  },
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.b1,
    flex: 1,
    // backgroundColor: Colors.backgroundColorDark
  },
  block: {
    flex: 1
  },
  resultsBlock: {
    backgroundColor: Colors.b1
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
    backgroundColor: Colors.b3,
    borderColor: Colors.b4,
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
  metaIcon: {
    marginRight: 4
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
