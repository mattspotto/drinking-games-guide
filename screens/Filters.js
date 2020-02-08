import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  Text
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// import Colors from '../constants/Colors';
import { DarkButton } from '../components/Button';
import { DarkPicker } from '../components/Picker';
// import { InterText } from '../components/StyledText';

export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: '0',
      time: '0',
      items: [
        { checked: true, label: 'House' },
        { checked: true, label: 'Pub' },
        { checked: true, label: 'Ping Pong Ball' },
        { checked: true, label: 'Cans' },
        { checked: true, label: 'Coins' },
        { checked: true, label: 'Red Cup' },
        { checked: true, label: 'Pen/Paper' },
        { checked: true, label: 'Shots' },
        { checked: true, label: 'Ball-Like Object' },
        { checked: true, label: 'Vessel' },
        { checked: true, label: 'Cards' },
        { checked: true, label: 'Dice' }
      ],
      category: '0',
      itemsShown: false
    };
  }

  render() {
    const {
      players,
      time,
      items,
      category,
      itemsShown
    } = this.state;

    return (
      <Fragment>
        <View style={styles.base}>
          <DarkPicker
            type="primary"
            style={styles.item}
            selectedValue={players}
            onValueChange={(value) => this.setState({ players: value })}
            items={[
              { label: 'All Players', value: '0' },
              { label: '1 Player', value: '1' },
              { label: '2 Players', value: '2' },
              { label: '3 Players', value: '3' },
              { label: '4 Players', value: '4' },
              { label: '5 Players', value: '5' },
              { label: '6 Players', value: '6' },
              { label: '7 Players', value: '7' },
              { label: '8 Players', value: '8' },
              { label: '9 Players', value: '9' },
              { label: '10 Players', value: '10' },
              { label: '11 Players', value: '11' },
              { label: '12 Players', value: '12' },
              { label: '13 Players', value: '13' },
              { label: '14 Players', value: '14' },
              { label: '15 Players', value: '15' },
              { label: '16 Players', value: '16' },
              { label: '17 Players', value: '17' },
              { label: '18 Players', value: '18' },
              { label: '19 Players', value: '19' },
              { label: '20 Players', value: '20' },
              { label: '20+ Players', value: '20+' }
            ]}
          />

          <DarkPicker
            type="primary"
            style={styles.item}
            selectedValue={time}
            onValueChange={(value) => this.setState({ time: value })}
            items={[
              { label: 'Any Time', value: '0' },
              { label: 'Short', value: '1' },
              { label: 'Medium', value: '2' },
              { label: 'Long', value: '3' }
            ]}
          />

          <DarkButton style={styles.item} type="primary" title="Items" onPress={() => this.setState({ itemsShown: true })} />

          <DarkPicker
            type="primary"
            style={styles.item}
            selectedValue={category}
            onValueChange={(value) => this.setState({ category: value })}
            items={[
              { label: 'All Categories', value: '0' },
              { label: 'Quick', value: '1' },
              { label: 'Outdoor', value: '2' },
              { label: 'Group Activity', value: '3' },
              { label: 'Continuous', value: '4' },
              { label: 'Mini', value: '5' },
              { label: 'Bigger + Longer', value: '6' },
              { label: 'Day Events', value: '7' },
              { label: 'Party Ideas', value: '8' }
            ]}
          />
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={itemsShown}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
          <View style={styles.modal}>
            <View>
              {items.map(item => (
                <BouncyCheckbox
                  isChecked={item.checked}
                  textColor="#000"
                  fillColor="red"
                  text={item.label}
                />
              ))}

              <TouchableHighlight
                onPress={() => this.setState({ itemsShown: false })}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 6
  },
  item: {
    flexGrow: 1,
    flexShrink: 0,
    marginHorizontal: 2
  },
  modal: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  }
});
