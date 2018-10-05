import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

//import TodoItem from './TodoItem';


export default class Todos extends React.Component {


   constructor(){
      super()
      this.state = {
         todos: [
            {
               task: "Matte4",
               status: "Pending"
            },
            {
               task: "Sove",
               status: "Done"
            },
            {
               task: "Pule",
               status: "Pending"
            },
            {
               task: "Se tv",
               status: "Pending"
            },
            {
               task: "Lese litt",
               status: "Done"
            },
         ],

         textValue: ""
      }
   }


   onChangeText(value) {
      this.setState({
         textValue: value
      })
   }

   addTodo() {
      this.state.todos.push({
         task: this.state.textValue,
         status: "Pending"
      })
   }



   render() {
      //console.log(this.state.todos);
      return (
         <DismissKeyboard>
               <View style={styles.container}>
                  <View style={{flex: 1, marginTop: 22}}>
                     <FlatList
                        data={this.state.todos}
                        keyExtractor={item => item.task}
                        renderItem={({item, index}) => {
                           console.log(JSON.stringify(item));
                           console.log(index);
                           let statusStyle = item.status == 'Done' ? styles.done : styles.pending
                           return (
                              <View style={styles.todoItem}>
                                 <Text style={styles.textStyle}>{item.task}</Text>
                                 <Text style={[styles.statusText, statusStyle]}>
                                    {item.status == 'Done' ? 'Done' : 'Pending'}
                                 </Text>
                              </View>
                              )
                        }}
                        >
                     </FlatList>
                  </View>

                  <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                     <View style={styles.footer}>
                        <TouchableOpacity>

                              <TextInput
                                 style={styles.textInput}
                                 value={this.state.textValue}
                                 placeholder="Add a todo"
                                 onChangeText={(value) => this.onChangeText(value)}
                              >
                              </TextInput>

                        </TouchableOpacity>
                     </View>
                  </KeyboardAvoidingView>

               </View>
         </DismissKeyboard>
      );
   }
}

const DismissKeyboard = ({children}) => (
   <TouchableWithoutFeedback
      onPress= {() => Keyboard.dismiss()}>
      {children}
   </TouchableWithoutFeedback>
)


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',

   },
   todoItem: {
      flex: 1,
      alignItems: 'center',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      padding: 20,
      backgroundColor: "#fff",
      justifyContent: 'flex-start',
      flexDirection: 'column'
   },
   textStyle: {
      alignSelf: 'flex-start',
      fontSize: 16
   },
   statusText: {
      alignSelf: 'flex-end',
      fontSize: 15
   },
   done: {
      color: 'green'
   },
   pending: {
      color: 'red'
   },
   footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
   },
   textInput: {
      alignSelf: 'stretch',
      color: '#f2f2f2',
      padding: 20,
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#ededed'
   },

})
