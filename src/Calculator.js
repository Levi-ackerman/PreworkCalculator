/**
 * Created on 5/19/17.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import { tipPercents } from './Constant';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Calculator extends Component {

  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
      billAmount: 0,
      tipAmount: 0,
      percent: tipPercents[0].value,
      result: 0,
    };

  }

  handleIndexChange = (index) => {
    this.handleValueChange(this.state.billAmount, index);
  };

  handleInputChange = (value) => {
    this.handleValueChange(value, this.state.selectedIndex);
  };

  handleValueChange(billAmount, index) {
    this.setState({billAmount: billAmount ? billAmount : 0});

    this.setState({selectedIndex: index});

    billAmount = parseFloat(billAmount);
    let percent = tipPercents[index].value;
    let tipAmount = percent * billAmount;
    let result = billAmount + tipAmount;

    this.setState({
      tipAmount : tipAmount ? tipAmount : 0,
      percent: tipPercents[index].value,
      result : result ? result : 0
    });
  }

  componentDidMount() {
    this.getPersisData();
  }

  async getPersisData() {
    try {
      let tipPercentValue = await AsyncStorage.getItem("PERCENT_SELECTED");
      let inValue = parseInt(tipPercentValue ? tipPercentValue : 0);
      this.handleIndexChange(inValue);
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  render() {
    let listValues = [];
    for(let i = 0; i < tipPercents.length; i++){
      listValues.push(tipPercents[i].label);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Tip Calculator
        </Text>

        <View style={[styles.horizontalContainer, styles.verticalMargin]}>
          <Text style={styles.label}>Bill Amount</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              maxLength={10}
              autoFocus={true}
              underlineColorAndroid={'transparent'}
              onChangeText={this.handleInputChange.bind(this)}
              returnKeyType="done"/>
          </View>
        </View>

        <View style={[styles.horizontalContainer, styles.verticalMargin]}>
          <Text style={styles.label}>Tip Amount</Text>
          <Text style={[styles.label, { marginLeft : 8 }]}>0</Text>
        </View>

        <View style={styles.verticalMargin}>
          <SegmentedControlTab
            values={listValues}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange.bind(this)}
          />
        </View>

        <View style={[styles.horizontalContainer, styles.verticalMargin]}>
          <Text style={styles.label}>Bill Amount</Text>
          <Text style={[styles.label, { marginLeft : 8 }]}>{this.state.billAmount}</Text>
        </View>

        <View style={[styles.horizontalContainer, styles.verticalMargin]}>
          <Text style={styles.label}>Tip Amount</Text>
          <Text style={[styles.label, { marginLeft : 8 }]}>{this.state.tipAmount}</Text>
        </View>

        <View style={[styles.horizontalContainer, styles.verticalMargin]}>
          <Text style={styles.label}>Percent</Text>
          <Text style={[styles.label, { marginLeft : 8 }]}>{this.state.percent}</Text>
        </View>

        <View style={[styles.horizontalContainer, { marginTop : 32 }]}>
          <Text style={styles.label}>Result</Text>
          <Text style={[styles.label, { marginLeft : 8 }]}>{this.state.result}</Text>
        </View>

        <Text style={styles.label}>{this.state.text}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputWrapper: {
    flex: 1,
    height: 36,
    marginLeft: 8,
    borderColor: '#4168fa',
    borderWidth: 1
  },
  input: {
    flex: 1,
    padding: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  verticalMargin: {
    marginTop: 16
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});