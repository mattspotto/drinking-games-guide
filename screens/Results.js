import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import {
  InterText,
  InterTextBold
} from '../components/StyledText';
import { extractText } from '../utils/prismicUtils';

export default class Results extends React.Component {
  render() {
    const { results, navigation } = this.props;

    return results.map((item) => {
      const {
        name,
        description,
        // intensity,
        category,
        players
      } = item.data;

      const title = extractText(name);

      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('GameDetail', { data: item, title })}
        >
          <Card>
            <View style={styles.row}>
              <View>
                <View style={styles.headerRow}>
                  <InterTextBold style={styles.cardTitle}>{title}</InterTextBold>

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

                <InterText style={styles.cardText}>
                  {description.map(paragraph => paragraph.text)}
                </InterText>
              </View>
            </View>

            <View style={styles.badge}>
              <InterText style={styles.badgeText}>{category}</InterText>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  }
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badge: {
    marginTop: 4,
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
});
