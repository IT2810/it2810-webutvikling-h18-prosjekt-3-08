import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Ionicons from '@expo/vector-icons/Ionicons';



export default class TodoItem extends React.Component {
      
   render() {
      const swipeSettings = {
         autoClose: true,
         right: [
            {
               onPress: () => {this.props.handleTodoDelete(this.props.index)},
               text: 'Delete',
               type: 'delete'
            }
         ],
      }

      let done = this.props.item.status === 'Done' ? true : false
      let statusName = done ? 'md-checkmark-circle' : 'md-radio-button-off' 
      let statusColor = done ? 'green' : 'grey'
      let todoTextStyle = done ? styles.finishedTodo_textStyle : styles.textStyle 
      
      return (
         <Swipeout {...swipeSettings}>
               <View style={styles.todoItem}>
                  <TouchableOpacity
                     style = {{paddingRight: 10}} 
                     onPress = { () => this.props.handleStatusChange(this.props.index)}
                  >
                     <Ionicons name= {statusName} color= {statusColor} size={24} />
                  </TouchableOpacity>

                  <Text style={todoTextStyle}>{this.props.item.task}</Text>
               </View>
         </Swipeout>
      );
   }
}

//<Text style={statusStyle}>{this.props.item.status}</Text>

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   todoItem: {
      flex: 1,
      alignItems: 'flex-start',
      borderColor: '#ddd',
      borderBottomWidth: 1,
      padding: 20,
      backgroundColor: "#fff",
      flexDirection: 'row'
   },
   textStyle: {
      fontSize: 16
   },
   finishedTodo_textStyle: {
      fontSize: 16,
      textDecorationLine: 'line-through'
   },
   status: {
      padding: 10
   },
   done: {
      paddingRight: 10,
      color: 'green'
   },
   pending: {
      paddingRight: 10,
      color: 'red'
   }

})
