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
import { WebBrowser, Icon } from 'expo';

import { InterText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { apiEndpoint } from '../constants/Prismic';
import { get } from '../utils/object';

const defaultGame = {
  name: 'Game not found',
  description: 'This game could not be found, try refreshing or search for a different game'
};

const getAdditionalStyle = type => {
  switch (type) {
    case 'em': return styles.italic;
    case 'strong': return styles.bold;
    default: return '';
  }
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

      let rulesEl = null;

      if (rules && rules.length) {
        const parsedText = rules.reduce((rulesAcc, rule) => {
          const { text, spans } = rule;
          // todo: check not just the first element
          const id = get(['spans', 0, 'data', 'id'], rule);

          let ruleData = <InterText style={styles.text}>{text}</InterText>;

          if (spans.length) {
            ruleData = spans.reduce((acc, span, index) => {
              const { start, end, type } = span;
              // Add first text only section if it exists
              if (!acc.length && start > 0) {
                acc.push(
                  <InterText key={text.slice(0, start)} style={styles.text}>
                    {text.slice(0, start)}
                  </InterText>
                );
              }

              // Add in regular text between last span and this one
              if (acc.length && acc[acc.length - 1].end < start) {
                acc.push(
                  <InterText style={styles.text} key={text.slice(acc[acc.length - 1].end, start)}>
                    {text.slice(acc[acc.length - 1].end, start)}
                  </InterText>
                );
              }

              if (type === 'hyperlink') {
                acc.push(
                  <TouchableOpacity key={text.slice(start, end)}
                    onPress={() => this.props.navigation.navigate({
                      routeName: 'GameDetail',
                      params: {
                        id,
                        title: text.slice(start, end),
                        data: null
                      },
                      key: id
                    })}>
                    <InterText style={[styles.text, styles.link]}>
                      {text.slice(start, end)}
                    </InterText>
                  </TouchableOpacity>
                );
              } else {
                acc.push(
                  <InterText style={[styles.text, getAdditionalStyle(type)]}>
                    {text.slice(start, end)}
                  </InterText>
                );
              }

              // Add remaining chars to the span
              if (index === spans.length - 1) {
                acc.push(
                  <InterText style={styles.text}>
                    {text.slice(end, text.length - 1)}
                  </InterText>
                );
              }

              return acc;
            }, []);
          }

          let olPrefix = null;
          if (rule.type === 'o-list-item') {
            rulesAcc.olCounter++;
            olPrefix = <InterText style={styles.text}>{`${rulesAcc.olCounter}. `}</InterText>;
          } else {
            rulesAcc.olCounter = 1;
          }

          rulesAcc.rules.push(
            <View key={rule.text} style={styles.ruleItem}>
              {olPrefix}

              {rule.type === 'list-item' && (
                <Icon.MaterialCommunityIcons
                  name="circle-small"
                  size={26}
                  color="white"
                  style={styles.metaIcon}
                />
              )}

              {ruleData}
            </View>
          );

          return rulesAcc;
        }, { rules: [], olCounter: 0 });

        rulesEl = parsedText.rules;
      }

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

          <InterText style={styles.title}>Rules</InterText>

          {rulesEl}
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

          {el}
        </ScrollView>
      </SafeAreaView>
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
    flexDirection: 'row',
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
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
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
