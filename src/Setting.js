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

export default class Setting extends Component {

  constructor() {
    super();
    this.state = {
      sceneTransition : 'FloatFromRight'
    };
  }

  handleValueChange(scene){
    this.setSceneTransition(scene);
    this.setState({sceneTransition: scene})
  }

  async setSceneTransition(scene){
    try{
      await AsyncStorage.setItem('SCENE_SELECTED', scene);
      this.setState({
        sceneTransition : scene
      })
    }catch(error){
      console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  // get data to AsyncStorage

  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
  componentDidMount(){
    this.getSceneTransition();
  }


  render() {
    return (
      <View style={{marginTop:50,padding:10, alignItems: 'center'}}>
        <View>
          <Text style={{fontSize:25}}>Scene Transitions</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={this.handleValueChange.bind(this)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>
      </View>
    );
  }
}