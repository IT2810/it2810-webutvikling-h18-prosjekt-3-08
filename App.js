import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator} from 'react-navigation';

import {Drawer} from './app/components/Navigators'


export default class App extends React.Component {
   render() {
      return (
         <Drawer />
      );
   }
}


/*
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   }
})
*/
