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
                    date: "2018-10-09",
                    time: "",
                    desc: "HS"                },
                {
                    name: "Fylla",
                    date: "2018-10-09",
                    time: "",
                    desc: "Med $nek"                },
                {
                    name: "Sove",
                    date: "2018-10-09",
                    time: "",
                    desc: ";)"                },
            ],

            textValue: ""
        }
    }

    addAppointment() {
        if (this.state.textValue !== "") {
            let appointmentsCopy = this.state.appointments;
            let t = this.state.textValue;
            let newTodo = {
                date: t,
                desc: "??"
            }
            appointmentsCopy.push(newTodo)
            this.setState({
                appointments: appointmentsCopy,
                textValue: ""
            })
        }

    }

    onChangeText(value) {
        this.setState({
            textValue: value
        })
    }


    deleteAppointment(index){
        let appointmentCopy = []
        if (this.state.todos.length > 1){
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
        let appointmentCopy = this.state.appointments[index];
        if (appointmentCopy.status == 'Done'){
            appointmentCopy.status = 'Pending'
        }
        else {
            todoCopy.status = 'Done'
        }
        let todosCopy = this.state.todos;
        todosCopy[index] = todoCopy;

        this.setState({
            todos: todosCopy
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, marginTop: 22}}>
                    <FlatList
                        data={this.state.appointments}
                        keyExtractor={item => item.date}
                        renderItem={({item, index}) => {
                            let i = index;
                            return (
                                <TouchableOpacity>
                                    <View style={styles.appointmentItem}>
                                        <Text style={styles.textStyle}>{item.name}</Text>
                                        <TouchableOpacity
                                            style={styles.status}
                                            onPress = { () => this.updateAppointment(i)}
                                        >
                                            <Text style={styles.textStyle} >{item.date}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={ () => this.deleteAppointment(i)} style = {styles.appointmentDelete}>
                                        <Text>D</Text>
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
      alignItems: 'center',
      justifyContent: 'center'
   },
    textStyle: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    status: {
        position: 'absolute',
        alignItems: 'flex-start',
        padding: 10
    },
    appointmentItem: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    appointmentDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    footer: {
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    
})
