import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'; // For å håndtere/formatere valgt tid

export default class AppointmentSetTime extends React.Component {

    constructor() {
        super()
        this.state = {
            isVisible: false,
            chosenTime: ''
        }
    }

    handlePicker = (time) => {
        let formatedTime = moment(time).format('HH:mm')
        this.setState({
            isVisible: false,
            chosenTime: time
        })
        this.props.onSelectTime(formatedTime)
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
                <Button title="Show Time" onPress={this.showPicker}/>
                <DateTimePicker time={this.state.chosenTime} isVisible={this.state.isVisible} onConfirm={this.handlePicker} onCancel={this.hidePicker} mode={"time"}/>
            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});