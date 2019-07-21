import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'expo';

import { get } from '../utils/object';
import Colors from '../constants/Colors';
import { InterText } from '../components/StyledText';

export const extractText = input => `${input.map(paragraph => paragraph.text)}`;

const getAdditionalStyle = type => {
  switch (type) {
    case 'em': return styles.italic;
    case 'strong': return styles.bold;
    default: return '';
  }
};

export const RichTextParagraph = ({ text, spans }) => {
  // todo: check not just the first element
  // const id = get(['spans', 0, 'data', 'id'], rule);

  let richText = null;

  if (spans.length) {
    richText = spans.reduce((acc, span, index) => {
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
        const id = get(['data', 'id'], span);

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
  } else {
    richText = <InterText style={styles.text}>{text}</InterText>;
  }

  return richText;
}

export const RichText = ({ paragraphs }) => {
  if (paragraphs && paragraphs.length) {
    const parsedText = paragraphs.reduce((paragraphsAcc, paragraph) => {
      const paragraphData = <RichTextParagraph {...paragraph} />;

      let olPrefix = null;
      if (paragraph.type === 'o-list-item') {
        paragraphsAcc.olCounter++;
        olPrefix = <InterText style={styles.text}>{`${paragraphsAcc.olCounter}. `}</InterText>;
      } else {
        paragraphsAcc.olCounter = 0;
      }

      paragraphsAcc.paragraphs.push(
        <View key={paragraph.text} style={styles.paragraphItem}>
          <View style={styles.paragraphPrefix}>
            {olPrefix}

            {paragraph.type === 'list-item' && (
              <Icon.MaterialCommunityIcons
                name="circle-small"
                size={26}
                color="white"
                style={styles.metaIcon}
              />
            )}
          </View>

          <View style={styles.paragraphBody}>
            {paragraphData}
          </View>
        </View>
      );

      return paragraphsAcc;
    }, { paragraphs: [], olCounter: 0 });

    return parsedText.paragraphs;
  }

  return null;
}

const styles = StyleSheet.create({
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
  paragraphItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8
  },
  paragraphPrefix: {

  },
  paragraphBody: {
    flex: 1
  }
});
