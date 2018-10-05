import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import TodoItem from './TodoItem';


export default class Todos extends React.Component {


   constructor(props){
      super(props)
      this.state = ({
         todoArray: [],

      })
   }



   render() {

      return (

         <View style={styles.container}>

            <ScrollView style={styles.scrollContainer}>

            </ScrollView>

            <View style={styles.footer}>
               <TextInput>

               </TextInput>
            </View>

            <TouchableOpacity
               style={styles.addButton}
               >
               <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

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
      color: '#f2f2f2',
      padding: 20,
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#ededed'
   },
   addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 90,
      backgroundColor: '#e91e63',
      width: 90,
      height: 90,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
   },
   addButtonText: {
      color: '#fff',
      fontSize: 24
   }

})
