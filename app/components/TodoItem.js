import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import Swipeout from 'react-native-swipeout';



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

      let statusStyle = this.props.item.status === 'Done' ? styles.done : styles.pending
      let todoTextStyle = this.props.item.status === 'Done' ? styles.finishedTodo_textStyle : styles.textStyle

      return (
         <Swipeout {...swipeSettings}>
               <View style={styles.todoItem}>
                  <TouchableOpacity
                     onPress= { () => this.props.handleStatusChange(this.props.index)}
                     >
                     <Text style={statusStyle}>{this.props.item.status}</Text>
                  </TouchableOpacity>

                  <Text style={todoTextStyle}>{this.props.item.task}</Text>

               </View>
         </Swipeout>
      );
   }
}


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
