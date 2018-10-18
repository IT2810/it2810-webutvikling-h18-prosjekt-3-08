import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Keyboard} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'; // For å håndtere/formatere valgt tid

export default class AppointmentSetTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            chosenTime: 'xx:xx',
            picked: false
        }
    }

    handlePicker = (time) => {
        Keyboard.dismiss()
        let formatedTime = moment(time).format('HH:mm')
        this.setState({
            isVisible: false,
            chosenTime: formatedTime,
            picked: true
        });
        this.props.onSelectTime(formatedTime)
    };

    showPicker = () => {
        this.setState({
            isVisible: true
        })
    };

    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    };

    render() {
        let textStyle = this.state.picked ? styles.text_chosen : styles.text
        return (
            <View style={styles.container}>
                <TouchableOpacity  onPress={this.showPicker}>
                    <Text style={textStyle}>{this.state.chosenTime}</Text>
                </TouchableOpacity>
                <DateTimePicker 
                        time={this.state.chosenTime} 
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker} 
                        onCancel={this.hidePicker} 
                        mode={"time"}
                        is24Hour={true}
                    />
            </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        paddingTop: 0
    },
    text: {
        fontSize: 24,
        textDecorationLine: 'underline',
        textDecorationColor: '#ededed'
    },
    text_chosen: {
        fontSize: 24,
        textDecorationLine: 'underline',
        textDecorationColor: '#A9E2F3'
    }
});