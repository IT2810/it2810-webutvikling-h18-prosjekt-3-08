import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'; // For å håndtere/formatere valgt dato
import { Ionicons } from '@expo/vector-icons';

export default class Calendar extends React.Component {

   constructor() {
      super()
      this.state = {
         isVisible: false,
         chosenDate: new Date()
      }
   }

   handlePicker = (date) => {
      formatedDate = moment(date).format('YYYY-MM-DD')
      this.setState({
         isVisible: false,
         chosenDate: date
      })
      this.props.onSelectDate(formatedDate)
   }

   showPicker = () => {
      this.setState({
         isVisible: true
      })
   }

   hidePicker = () => {
      this.setState({
         isVisible: false
      })
   }

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this.showPicker} >
               <View style={{paddingHorizontal: 10}}>
                  <Ionicons name="md-calendar" size={24} />
               </View>
            </TouchableOpacity>
            <DateTimePicker
               date={this.state.chosenDate}
               isVisible={this.state.isVisible}
               onConfirm={this.handlePicker}
               onCancel={this.hidePicker}
            />
         </View>);
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   }
})