import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Main from './app/components/Main';

export default class App extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Button title="Get Started" onPress={() =>
            this.props.navigation.navigate('Main')} />
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
