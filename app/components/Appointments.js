import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import AppointmentItem from './AppointmentItem';


export default class Appointments extends React.Component {

    constructor(){
        super();
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
        this.state = {
            appointments: [
                {
                    name: "Meeting with Elon Musk",
                    date: "2018-10-09",
                    start: "14:30",
                    end: "15:30",
                    desc: ""
                },
                {
                    name: "Meeting with Mark Z",
                    date: "2018-10-10",
                    start: "07:00",
                    end: "10:00",
                    desc: ""

                },
                {
                    name: "$nek Generalforsamling",
                    date: "2018-10-11",
                    start: "15:00",
                    end: "23:59",
                    desc: ""
                },
                {
                    name: "Tokyo",
                    date: "2018-10-12",
                    start: "10:00",
                    end: "",
                    desc: ""
                },
            ],

            textValue: ""
        }
    }
    addAppointment() {
    }

    onChangeText(value) {
        this.setState({
            textValue: value
        })
    }


    deleteAppointment(index){
        let appointmentCopy = [];
        if (this.state.appointments.length > 1){
            appointmentCopy = this.state.appointments;
            appointmentCopy.splice(index, 1)
        }
        else {
            appointmentCopy = []
        }

        this.setState({
            appointments: appointmentCopy
        })
    }

    updateAppointment(){
    }

    getDate(item){
        const list = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
        const day = item.date.substring(8)
        const month = item.date.substring(5, 7)
        return day + '.' + list[month]
    }

    getTime(item){
        return this.getDate(item) + " " + item.start + ' - ' + item.end;
    }
    

    render() {
        return (
            <View style = {styles.container}>
                <View style={{flex: 1, marginTop: 22, borderBottomWidth: 0}}>
                    <FlatList
                        data={this.state.appointments}
                        keyExtractor={item => item.date}
                        renderItem={({item, index}) => {
                            //let i = index;
                            return (
                                <TouchableOpacity onPress={(item) => {
                                    <AppointmentItem/>
                                }}>
                                    <View style={styles.time}>
                                        <Text>{this.getTime(item)}</Text>
                                    </View>
                                    <View style={styles.appointmentItem} >
                                        <Text style={styles.textStyle}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    >
                    </FlatList>
                </View>
                <View style = {styles.appendButtonContainer}>
                    <TextInput
                        value={this.state.textValue}
                        placeholder="Add an appointment"
                        onChangeText={(value) => this.onChangeText(value)}
                    >
                    </TextInput>
                </View>
                <Button
                    title="Add appointment"
                    onPress = {console.log('')}/>
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
       position: 'absolute',
       justifyContent: 'center',
       width: '100%',
       height: '100%'


   },
    time: {

    },
    textStyle: {
        alignSelf: 'flex-start',
        fontFamily: 'Cochin',
        fontSize: 20
    },
    textStyleButton: {
       padding: 10,
       alignSelf: 'center',
       color: "white"
    },
    status: {
        position: 'absolute',
        alignItems: 'flex-start',
        padding: 10
    },
    appointmentItem: {
       marginLeft: '15%',
        marginRight: '10%',
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: 'center',
        flexDirection: 'column'
    },
    appointmentDelete: {
        flex: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'black',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 0,
    },
    footer: {
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    appendButtonContainer:{
       alignItems: 'center'
    }

})
