import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



export default class AppointmentItem extends React.Component {

    constructor() {
        super();


    }

    render() {
        return (
            <View>
                <View>

                </View>
            </View>

    );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appointments: {
        position: 'relative',
        padding: 20,
        paddingRight: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    appointmentText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63'
    },
    appointmentDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    appointmentDeleteText: {
        color: 'white'
    }

})