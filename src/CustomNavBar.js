/**
 * Created on 5/19/17.
 */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  Button,
  StyleSheet
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
        // Can not refresh data after use pop() so use push instead
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigator.push({id: 'CalculatorPage'})}>
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigator.push({id: 'SettingPage'})}>
          <Text>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 8
  },
});

// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
);