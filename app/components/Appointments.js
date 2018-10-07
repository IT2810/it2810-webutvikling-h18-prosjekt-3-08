import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, FlatList, TextInput, TouchableOpacity} from 'react-native';
import AppointmentItem from './AppointmentItem';


export default class Appointments extends React.Component {

    constructor(){
        super();
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
        this.state = {
            appointments: [
                {
                    name: "Meeting",
                    date: "2018-10-09",
                    time: "",
                    desc: "Brain NTNU"
                },
                {
                    name: "Meeting",
                    date: "2018-10-10",
                    time: "",
                    desc: "HS"
                },
                {
                    name: "Fylla",
                    date: "2018-10-11",
                    time: "",
                    desc: "Med $nek"
                },
                {
                    name: "Sove",
                    date: "2018-10-12",
                    time: "",
                    desc: ";)"
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

    updateAppointment(index) {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, marginTop: 22, borderBottomWidth: 0}}>
                    <FlatList
                        data={this.state.appointments}
                        keyExtractor={item => item.date}
                        renderItem={({item, index}) => {
                            let i = index;
                            return (
                                <TouchableOpacity>
                                    <View style={styles.appointmentItem} onPress= { () => AppointmentItem}>
                                        <Text style={styles.textStyle}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={ () => this.deleteAppointment(i)} style = {styles.appointmentDelete}>
                                        <Text style={styles.textStyle2}>X</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }}
                    >
                    </FlatList>
                </View>
                <View>
                    <TextInput
                        value={this.state.textValue}
                        placeholder="Add an appointment"
                        onChangeText={(value) => this.onChangeText(value)}
                    >
                    </TextInput>
                </View>
                <Button title="Add appointment" onPress={this.addAppointment()} />
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
      alignItems: 'center',
      justifyContent: 'center',
       width: '100%',
       height: '100%'


   },
    textStyle: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    textStyle2: {
       alignSelf: 'flex-end',
       color: "white"
    },
    status: {
        position: 'absolute',
        alignItems: 'flex-start',
        padding: 10
    },
    appointmentItem: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
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

})
