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
import { WebBrowser } from 'expo';

import { apiEndpoint } from '../constants/Prismic';
import { MonoText } from '../components/StyledText';

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>
              Drinking Games Guide
            </Text>

            <View style={{
              alignSelf: 'stretch'
            }}>
              <TextInput
                style = {
                  {
                    alignSelf: 'stretch',
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                  }
                }
                onChangeText={text => this.setState({ text })}
                onEndEditing={this._submitSearchQuery}
                value={this.state.text}
              />
            </View>
          </View>

          {this._renderResults()}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _renderResults() {
    const { results } = this.state.data;

    return results.map(item => {
      const {
        name,
        description,
        intensity,
        players
      } = item.data;
      return (
        <View>
          <View>{name.map(paragraph => <Text>{paragraph.text}</Text>)}</View>
          <View>{description.map(paragraph => <Text>{paragraph.text}</Text>)}</View>
          <Text>Intensity: {intensity}</Text>
          <Text>Players: {players}</Text>
        </View>
      );
    });
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          Development mode disabled.
        </Text>
      );
    }
  }

  _submitSearchQuery() {
    const { text } = this.state;
    console.log('PRE', text), apiEndpoint;

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
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
