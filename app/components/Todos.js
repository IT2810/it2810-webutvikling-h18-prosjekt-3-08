import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';



export default class Todos extends React.Component {


   constructor(){
      super()
      this.state = ({
         openTodos: [],
         closedTodos: []
      })
   }

   render() {
      return (

         <View style={styles.container}>
            <Text>This is the Todos Screen </Text>
            <ScrollView style={styles.scrollContainer}>

            </ScrollView>

            <View style={styles.footer}>
               <TextInput
                  style={styles.TextInput}
                  placeholder='Todo name'
                  placeholderTextColor='white'
               >

               </TextInput>
            </View>
         </View>
      );
   }
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   },
   scrollContainer: {
      flex: 1,
      marginBottom: 100
   },
   footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
   },
   TextInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed'
   }

})
