import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';

import TodoItem from './TodoItem';


export default class Todos extends React.Component {


   constructor(){
      super()
      this.deleteTodo = this.deleteTodo.bind(this)
      this.changeStatus = this.changeStatus.bind(this)

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
         ],

         textValue: "",
      }
   }


   onChangeText(value) {
      this.setState({
         textValue: value
      })
   }

   addTodo() {
      if (this.state.textValue != "") {
         let todosCopy = this.state.todos
         let t = this.state.textValue
         let newTodo = {
            task: t,
            status: "Pending"
         }
         todosCopy.push(newTodo)
         this.setState({
            todos: todosCopy,
            textValue: ""
         })
      }

   }


   deleteTodo(index){
      let todosCopy = []
      if (this.state.todos.length > 1){
         todosCopy = this.state.todos
         todosCopy.splice(index, 1)
      }
      else {
         todosCopy = []
      }

      this.setState({
         todos: todosCopy
      })
   }

   changeStatus(index) {
      let todoCopy = this.state.todos[index]
      if (todoCopy.status == 'Done'){
         todoCopy.status = 'Pending'
      }
      else {
         todoCopy.status = 'Done'
      }
      let todosCopy = this.state.todos
      todosCopy[index] = todoCopy

      this.setState({
         todos: todosCopy
      })
   }



   render() {
      console.log(this.state.todos);
      return (

            <View style={styles.container}>
                  <Swipeout right={swipeoutButton}>
                     <View>
                        <Text>Swipe me left</Text>
                     </View>
                  </Swipeout>
                  <View style={{flex: 1, marginTop: 22}}>
                     <FlatList
                        data={this.state.todos}
                        extraData={this.state}
                        keyExtractor={item => item.task}
                        renderItem={({item, index}) => {
                           //console.log(JSON.stringify(item));
                           //console.log(index);
                           let i = index
                           let statusStyle = item.status === 'Done' ? styles.done : styles.pending
                           let todoTextStyle = item.status === 'Done' ? styles.finishedTodo_textStyle : styles.textStyle


                           return (
                              <Swipeout right={swipeoutButton}>
                                 <View>
                                    <View style={styles.todoItem}>
                                          <Text style={todoTextStyle}>{item.task}</Text>
                                          <TouchableOpacity
                                             style={styles.status}
                                             onPress = { () => this.changeStatus(i)}
                                             >
                                             <Text style={statusStyle}>{item.status}</Text>
                                          </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={ () => this.deleteTodo(i)} style={styles.todoDelete}>
                                       <Text>D</Text>
                                    </TouchableOpacity>
                                 </View>
                              </Swipeout>
                              )
                        }}
                        >
                     </FlatList>
                  </View>

                  <Button title="Legg til Todo" onPress={this.addTodo.bind(this)} />

                  <View>
                     <TextInput
                        style={styles.textInput}
                        value={this.state.textValue}
                        placeholder="Add a todo"
                        onChangeText={(value) => this.onChangeText(value)}
                     >
                     </TextInput>
                  </View>
            </View>
      );
   }
}

const swipeoutButton = [
   {
      text: 'Delete',
      type: 'delete',
   }
]


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
   finishedTodo_textStyle: {
      alignSelf: 'flex-start',
      fontSize: 16,
      textDecorationLine: 'line-through'
   },

   status: {
      position: 'absolute',
      alignItems: 'flex-start',
      padding: 10
   },
   done: {
      color: 'green'
   },
   pending: {
      color: 'red'
   },
   todoDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      padding: 10,
      top: 10,
      bottom: 10,
      right: 10
   },

   footer: {
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
   },
   textInput: {
      height: 40,
      flexDirection: 'row',
      alignSelf: 'stretch',
      color: '#f2f2f2',
      padding: 20,
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#ededed'
   },

})
