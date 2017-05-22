/**
 * Created on 5/19/17.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  Picker,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { tipPercents } from './Constant';

export default class Setting extends Component {

  constructor() {
    super();

    this.state = {
      sceneTransition: 'FloatFromRight',
      tipPercentIndex: 0,
    };
  }

  handleChangeSceneTransition(scene) {
    this.persisData(scene, -1);
    this.setState({sceneTransition: scene})
  }

  handleChangeTipPercent(percent) {
    this.persisData(undefined, percent);
    this.setState({tipPercentIndex: percent})
  }

  async persisData(scene, percent) {
    try {
      if (scene) {
        await AsyncStorage.setItem('SCENE_SELECTED', scene);
      }
      if (percent >= 0) {
        await AsyncStorage.setItem('PERCENT_SELECTED', percent.toString());
      }
    } catch (error) {
      console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  // get data to AsyncStorage

  async getPersisData() {
    try {
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      let tipPercentValue = await AsyncStorage.getItem("PERCENT_SELECTED");

      let inValue = parseInt(tipPercentValue);
      this.setState({
        sceneTransition: sceneTransitionValue,
        tipPercentIndex: inValue,
      });
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  componentDidMount() {
    this.getPersisData();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Scene Transitions</Text>
          <Text style={styles.title}>{this.state.text}</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={this.handleChangeSceneTransition.bind(this)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight"/>
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft"/>
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom"/>
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid"/>
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft"/>
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump"/>
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight"/>
          </Picker>
        </View>

        <View>
          <Text style={styles.title}>Tip Percent</Text>
          <Picker
            selectedValue={this.state.tipPercentIndex}
            onValueChange={this.handleChangeTipPercent.bind(this)}>
            {
              tipPercents.map((item, index) =>
                <Picker.Item key={item.label} label={item.label} value={index}/>
              )
            }
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
});