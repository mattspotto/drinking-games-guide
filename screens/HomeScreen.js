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
  SafeAreaView
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import { apiEndpoint } from '../constants/Prismic';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { MonoText } from '../components/StyledText';
import { extractText } from '../utils/prismicUtils';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this._submitSearchQuery = this._submitSearchQuery.bind(this);

    this.state = {
      text: '',
      data: {
        results: [],
        page: 0
      }
    };
  }

  componentWillMount() {
    this._submitSearchQuery();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/TextLogoWhite.png')}
            style={styles.bannerImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
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
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this._renderResults()}
        </ScrollView>
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
          <Card>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{description.map(paragraph => paragraph.text)}</Text>

            <View style={styles.gameMeta}>
              <Icon.MaterialCommunityIcons
                name="account-multiple"
                size={20}
                color="white"
                style={styles.metaIcon}
              />

              <Text style={styles.cardText}>{players}</Text>
            </View>

            <Icon.MaterialCommunityIcons
              name="heart-outline"
              size={20}
              color="white"
              style={styles.metaIcon}
            />
            <Text style={styles.cardText}>{category}</Text>
          </Card>
        </TouchableOpacity>
      );
    });
  }

  _submitSearchQuery() {
    const { text } = this.state;

    Prismic.getApi(apiEndpoint).then(api => {
      return api.query([
        Prismic.Predicates.at('document.type', 'games'),
        Prismic.Predicates.fulltext('document', text)
      ]);
    })
      .then(response => {
        console.log('RES', response);
        this.setState({ data: response })
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
    paddingTop: 30
  },
  contentContainer: {

  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bannerImage: {
    width: 240,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  searchContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
