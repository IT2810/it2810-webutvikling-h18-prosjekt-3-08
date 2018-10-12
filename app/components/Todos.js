import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,
    TouchableOpacity, TouchableWithoutFeedback,
     Keyboard, KeyboardAvoidingView, Button, AsyncStorage } from 'react-native';
import moment from 'moment'; // For å håndtere/formatere valgt dato

import TodoItem from './TodoItem';
import Calendar from './Calendar';


// TODO: Koble knappen fra TabNavigator til kalenderen
// TODO: Keyboard overlapper fortsatt tekstinput-feltet



export default class Todos extends React.Component {

   constructor(){
      super()
      this.deleteTodo = this.deleteTodo.bind(this)
      this.changeStatus = this.changeStatus.bind(this)
      this.addTodo = this.addTodo.bind(this)
      this.setTextDate = this.setTextDate.bind(this)

      date = this.getCurrentDate()


      this.state = {
         todos: [],
         activeDate: date,
         textValue: "",
         textDate: "",
      }
   }

   componentDidMount(){
      this.retrieveData()
      this.setTextDate()
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
       await AsyncStorage.setItem(this.state.activeDate+'t', JSON.stringify(this.state.todos));
     } catch (error) {
        alert("Error")
     }
  }

   retrieveData = async() => {
      // retrieveData er callback-funksjon i changeDate()-metoden
      // Kaller derfor setTextDate her for å sikre at den kjøres etter daten i state er endret
      this.setTextDate()

      try {
          let array = await AsyncStorage.getItem(this.state.activeDate+'t');

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
            key: new Date().toString(),
            task: t,
            status: "Pending"
         }
         todosCopy.splice(0, 0, newTodo)
         this.setState({
            todos: todosCopy,
            textValue: "",

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

   setTextDate(){
      let d = this.state.activeDate
      let date = ""
      let month = ""
      switch (d.substring(5, 7)) {
         case '01':
            month = "January"
            break;
         case '02':
            month = "February"
            break;
         case '03':
            month = "March"
            break;
         case '04':
            month = "April"
            break;
         case '05':
            month = "May"
            break;
         case '06':
            month = "June"
            break;
         case '07':
            month = "July"
            break;
         case '08':
            month = "August"
            break;
         case '09':
            month = "September"
            break;
         case '10':
            month = "October"
            break;
         case '11':
            month = "November"
            break;
         case '12':
            month = "Desember"
            break;
         default:
            month = "Month"
      }

      let day = ""
      if (d.charAt(8) == '0'){
         day = d.charAt(9)
      }
      else {
         day = d.substring(8,10)
      }
      date += day + " of " + month + " " + d.substring(0, 4)

      this.setState({
         textDate: date
      })
   }



   render() {

      //console.log(this.state.todos);
      return (
            <View style={styles.container}>
               <View style={{flex: 1, marginTop: 22}}>
                  <View style={styles.header}>
                     <Text style={styles.date}>
                        {this.state.textDate}
                     </Text>
                     <Calendar style= {styles.calendar} onSelectDate={this.changeDate}/>
                  </View>

                  <FlatList
                     data={this.state.todos}
                     extraData={this.state}

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
                        onSubmitEditing={this.addTodo}
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
   header: {
      flexDirection: 'row',
      borderBottomWidth: 3,
      alignItems: 'center',
      justifyContent: 'center'
   },
   date: {
      fontSize: 15,
      alignSelf: 'center',
      marginBottom: 3,
      paddingLeft: 30
   },
   calendar: {
      alignSelf: 'flex-end',
      marginBottom: 3,
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
      marginBottom: 160,
      height: 40,
      color: 'red',
      padding: 5,
      backgroundColor: '#fff',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
   },
   textInput_keyboard_open: {
      margin: 20,
      marginBottom: 160,
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
