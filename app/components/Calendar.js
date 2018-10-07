import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'; // To å håndtere/formatere valgt dato

export default class Calendar extends React.Component {

   constructor() {
      super()
      this.state = {
         isVisible: false,
         chosenDate: ''
      }
   }

   handlePicker = (date) => {
      formatedDate = moment(date).format('YYYY-MM-DD')
      this.setState({
         isVisible: false,
         chosenDate: formatedDate
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
            <Button title="Show calendar " onPress={this.showPicker}/>
            <DateTimePicker isVisible={this.state.isVisible} onConfirm={this.handlePicker} onCancel={this.hidePicker}/>
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
