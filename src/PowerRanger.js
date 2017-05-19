/**
 * Created on 5/19/17.
 */
import React, {Component} from 'react';
import {
  Navigator,
} from 'react-native-deprecated-custom-components';
import {
  AsyncStorage,
  Alert
} from 'react-native';
import Calculator from './Calculator';
import Setting from './Setting';
import CustomNavBar from './CustomNavBar';

export default class PowerRanger extends Component {

  constructor() {
    super();
    this.state = {
      sceneTransition: Navigator.SceneConfigs.FloatFromBottomAndroid
    }
  }

  // To navigate to page based on page ID
  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage' :
        this.getSceneTransition();
        return ( <Calculator navigator={navigator}/> );
      case 'SettingPage' :
        return ( <Setting navigator={navigator}/> );
    }
  }

  configureScene(route, routeStack) {
    if (this.state.sceneTransition) {
      return this.state.sceneTransition;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  // get data to AsyncStorage

  async getSceneTransition() {
    try {
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      this.setState({
        sceneTransition: this.getSceneConfigByDirection(sceneTransitionValue)
      });
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  getSceneConfigByDirection(direction) {
    let sceneConfig = Navigator.SceneConfigs.FloatFromRight;
    switch (direction) {
      case 'FloatFromRight' :
        sceneConfig = Navigator.SceneConfigs.FloatFromRight;
        break;
      case 'FloatFromLeft' :
        sceneConfig = Navigator.SceneConfigs.FloatFromLeft;
        break;
      case 'FloatFromBottom' :
        sceneConfig = Navigator.SceneConfigs.FloatFromBottom;
        break;
      case 'FloatFromBottomAndroid' :
        sceneConfig = Navigator.SceneConfigs.FloatFromBottomAndroid;
        break;
      case 'SwipeFromLeft' :
        sceneConfig = Navigator.SceneConfigs.SwipeFromLeft;
        break;
      case 'HorizontalSwipeJump' :
        sceneConfig = Navigator.SceneConfigs.HorizontalSwipeJump;
        break;
      case 'HorizontalSwipeJumpFromRight' :
        sceneConfig = Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
        break;
      default: break;
    }
    return sceneConfig;
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'CalculatorPage'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={CustomNavBar}
        configureScene={this.configureScene.bind(this)}
      />
    );
  }
}