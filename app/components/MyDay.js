import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';



export default class MyDay extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Text>MyDay</Text>
         </View>
      );
   }
}



const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center'
   },

})
