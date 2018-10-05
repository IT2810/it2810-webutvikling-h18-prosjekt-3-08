import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



export default class TodoItem extends React.Component {
   render() {
      return (
         <View>

         </View>
      );
   }
}



const styles = StyleSheet.create({
   todo: {
      position: 'relative',
      padding: 20,
      paddingRight: 100,
      borderBottomWidth: 2,
      borderBottomColor: '#ededed'
   },
   todoText: {
      paddingLeft: 20,
      borderLeftWidth: 10,
      borderLeftColor: '#e91e63'
   },
   todoDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2980b9',
      padding: 10,
      top: 10,
      bottom: 10,
      right: 10
   },
   todoDeleteText: {
      color: 'white'
   }

})
