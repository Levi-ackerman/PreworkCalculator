/**
 * Created on 5/19/17.
 */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Navigator,
} from 'react-native-deprecated-custom-components';

const NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity onPress={() => navigator.push({id: 'SettingPage'})}>
          <Text>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
};

// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
);