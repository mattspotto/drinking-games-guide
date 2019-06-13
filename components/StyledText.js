import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class InterText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, {
      fontFamily: 'inter-regular'
    }]} />;
  }
}

export class InterTextBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, {
      fontFamily: 'inter-bold'
    }]} />;
  }
}

export class InterTextItalic extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, {
      fontFamily: 'inter-italic'
    }]} />;
  }
}
