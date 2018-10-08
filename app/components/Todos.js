import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,
    TouchableOpacity, TouchableWithoutFeedback,
     Keyboard, KeyboardAvoidingView, Button, AsyncStorage } from 'react-native';
import moment from 'moment'; // For å håndtere/formatere valgt dato

import TodoItem from './TodoItem';
import Calendar from './Calendar';


// TODO: Unik key for hver todo
// TODO: Koble knappen fra TabNavigator til kalenderen
// TODO: Keyboard overlapper fortsatt tekstinput-feltet



export default class Todos extends React.Component {

   constructor(){
      super()
      this.deleteTodo = this.deleteTodo.bind(this)
      this.changeStatus = this.changeStatus.bind(this)

      date = this.getCurrentDate()

      this.state = {
         todos: [],
         activeDate: date,
         textValue: "",
      }
   }

   componentDidMount(){
      this.retrieveData()
   }

   getCurrentDate() {
      date = new Date()
      formatedDate = moment(date).format('YYYY-MM-DD')
      return formatedDate
   }

   testCalendar() {
      alert("test")
   }

   onChangeText(value) {
      this.setState({
         textValue: value
      })
   }

  storeData = async () => {
     try {
       await AsyncStorage.setItem(this.state.activeDate, JSON.stringify(this.state.todos));
     } catch (error) {
        alert("Error")
     }
  }

   retrieveData = async() => {
      try {
          let array = await AsyncStorage.getItem(this.state.activeDate);

          if (array !== null) {
            let todos = JSON.parse(array)
            this.setState({
               todos: todos
            })
          }
          else{
             this.setState({
                todos: []
             })
          }
      } catch (error) {
         alert("Error")
      }

   }

   addTodo() {
      if (this.state.textValue != "") {
         Keyboard.dismiss()
         let todosCopy = this.state.todos
         let t = this.state.textValue
         let newTodo = {
            task: t,
            status: "Pending"
         }
         todosCopy.splice(0, 0, newTodo)
         this.setState({
            todos: todosCopy,
            textValue: ""
         }, this.storeData)

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
      }, this.storeData)
   }

   changeStatus(index) {
      let todoCopy = this.state.todos[index]
      todoCopy.status = todoCopy.status == 'Done' ? 'Pending' : 'Done'
      let todosCopy = this.state.todos
      todosCopy[index] = todoCopy

      this.setState({
         todos: todosCopy
      }, this.storeData)
   }


   changeDate = (date) => {
      this.setState({
         activeDate: date
      }, this.retrieveData)
   }



   render() {
      //console.log(this.state.todos);
      return (

            <View style={styles.container}>
               <View style={{flex: 1, marginTop: 22}}>
                  <Calendar onSelectDate={this.changeDate}/>
                  <FlatList
                     data={this.state.todos}
                     extraData={this.state}
                     keyExtractor={item => item.task}
                     renderItem={({item, index}) => {
                        let i = index
                        return (
                           <TodoItem
                              item = {item}
                              index = {i}
                              handleStatusChange = {this.changeStatus}
                              handleTodoDelete = {this.deleteTodo}/>
                           )}}
                  />

                  <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                     <TextInput
                        style={styles.textInput}
                        value={this.state.textValue}
                        placeholder="Add a todo"
                        onChangeText={(value) => this.onChangeText(value)}
                        returnKeyType="go"
                        onSubmitEditing={this.addTodo.bind(this)}
                     />
                  </KeyboardAvoidingView>
               </View>


            </View>
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
   textInput: {
      margin: 20,
      marginBottom: 0,
      height: 40,
      color: 'red',
      padding: 5,
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
   },
   keyboard: {
      flex: 1,
   }

})
