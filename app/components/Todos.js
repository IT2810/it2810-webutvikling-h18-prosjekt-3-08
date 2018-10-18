import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,
    TouchableOpacity, TouchableWithoutFeedback,
     Keyboard, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import moment from 'moment'; // For å håndtere/formatere valgt dato
import { Ionicons } from '@expo/vector-icons';

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
      this.updatePerfectDay = this.updatePerfectDay.bind(this)

      let date = this.getCurrentDate()
    

      this.state = {
         todos: [],
         activeDate: date,
         textValue: "",
         textDate: "",
         perfectDay: true,
         perfectDays: []
      }
   }


   componentDidMount(){
      this.retrievePerfectDays()
      this.retrieveTodos()
      this.setTextDate()
      
   }



   getCurrentDate() {
      let date = new Date()
      let formatedDate = moment(date).format('YYYY-MM-DD')
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


 

  storePerfectDays = async() => {
    console.log("inni storePerfectDays");
    console.log("Lagrer: " + this.state.perfectDays);
    
    try {
      await AsyncStorage.setItem('perfectDays', JSON.stringify(this.state.perfectDays))

    } catch(error) {
      alert("Error")
    }
    
  }

  retrievePerfectDays = async() => {
    console.log("inni retrievePerfectDays");

    try {
      let perfectDaysData = await AsyncStorage.getItem('perfectDays')          
      if (perfectDaysData != null) {
        let perfectDays = JSON.parse(perfectDaysData)
        console.log("Hentet ut: " + perfectDays);
        this.setState({
          perfectDays: perfectDays
        })
      }
      else {
        this.setState({
          perfectDays: []
        })
      }
    } catch (error) {
      alert("Error")
    }   
  }

  storeTodos = async () => {
    // storeTodos er callback-funksjon i funksjoner som kan påvirke perfectDay
    // Kaller derfor updatePerfectDay her for å sikre at den oppdateres etter staten er endret
    this.updatePerfectDay()
    
    try {
      await AsyncStorage.setItem(this.state.activeDate+'t', JSON.stringify(this.state.todos));
      
    } catch (error) {
      alert("Error")
    }
  }

   retrieveTodos = async() => {
      // retrieveTodos er callback-funksjon i changeDate()-metoden
      // Kaller derfor setTextDate her for å sikre at den oppdateres etter staten er endret
      this.setTextDate()

      // Henter inn alle todos fra aktiv dato
      // Etter staten er satt med nye todos, kalles updatePerfectDay som callback
      try {
          let todosData = await AsyncStorage.getItem(this.state.activeDate+'t');
          if (todosData !== null) {
            let todos = JSON.parse(todosData)
            this.setState({
               todos: todos
            }, this.updatePerfectDay)
          }
          else{
             this.setState({
                todos: []
             }, this.updatePerfectDay)
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

         }, this.storeTodos)

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
      }, this.storeTodos)
   }

   changeStatus(index) {
      let todoCopy = this.state.todos[index]
      todoCopy.status = todoCopy.status == 'Done' ? 'Pending' : 'Done'
      let todosCopy = this.state.todos
      todosCopy[index] = todoCopy

      this.setState({
         todos: todosCopy
      }, this.storeTodos)

   }


   changeDate = (date) => {
      this.setState({
         activeDate: date,
         perfectDay: true
      }, this.retrieveTodos)

      
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

   updatePerfectDay() {

    let perfectDaysCopy = this.state.perfectDays
    let index = perfectDaysCopy.indexOf(this.state.activeDate)
    let todos = this.state.todos
    if (todos.length === 0) {
      if (index !== -1){
        perfectDaysCopy.splice(index, 1)
      }
      this.setState({
        perfectDay: false,
        perfectDays: perfectDaysCopy
      }, this.storePerfectDays)
    }
     else {
        
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].status === "Pending") {
            if (index !== -1){
              perfectDaysCopy.splice(index, 1)
            }
            this.setState({
              perfectDay: false,
              perfectDays: perfectDaysCopy
            }, this.storePerfectDays)
            return;
          }
        }
        if (!this.state.perfectDay){
          Alert.alert("Congratulations!", "You have completed all your todos this day, and have achieved a Perfect Day! Click the star to see all of your Perfect Days.")
        }
        if (index === -1){
          perfectDaysCopy.push(this.state.activeDate)
        }
          this.setState({
          perfectDay: true,
          perfectDays: perfectDaysCopy
          }, this.storePerfectDays)
        
        
     }
   }


   render() {
      const {navigate} = this.props.navigation;
      let starColor = this.state.perfectDay ? 'orange' : 'grey'
      let perfectDays = this.state.perfectDays
      console.log(perfectDays);
      
      return (
            <View style={styles.container}>
               <View style={{flex: 1, marginTop: 22}}>
                  <View style={styles.header}>
                    <Calendar style= {styles.calendar} onSelectDate={this.changeDate}/>
                     <Text style={styles.date}>
                        {this.state.textDate}
                     </Text>
                     <TouchableOpacity onPress={() => navigate('PerfectDays', {perfectDays})}>
                      <View style={styles.star}>
                          <Ionicons name="md-star" color= {starColor} size={24} />
                      </View>
                     </TouchableOpacity>
                     
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
      borderBottomWidth: 1,


   },
   date: {
      fontSize: 15,
      alignSelf: 'center',
      marginBottom: 3,
      paddingLeft: 5,
   },
   calendar: {
      alignSelf: 'flex-start',
      paddingLeft: 0,
      marginBottom: 3,
   },
   star: {
    paddingLeft: 167,
    marginBottom: 3
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
