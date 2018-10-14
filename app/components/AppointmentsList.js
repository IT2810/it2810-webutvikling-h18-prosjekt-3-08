import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import AppointmentItem from './AppointmentItem';
import AppointmentSetTime from'./AppointmentSetTime';
import {StackNavigator} from 'react-navigation';
import Appointments from './Appointments';
import AddAppointment from "./AddAppointment";
import {AppointmentStack} from './Navigators'


//TODO: Gjøre AppointmentItem expanding ved klikk på en knapp.
//TODO: Lage funksjonalitet for å legge til en apppointment.



export default class AppointmentsList extends React.Component {


    constructor(){
        super();
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
        this.state = {
            appointments: [],
            date: '',
            name: '',
            startTime: '',
            endTime: '',
            desc: '',
            location: '',
        };
    }


    storeData = async () => {
        try {
            await AsyncStorage.setItem(this.state.date+'a', JSON.stringify(this.state.appointments));
        } catch (error) {
            // Error saving data
        }
    }



    retrieveData = async() => {
        try {
            let array = await AsyncStorage.getItem(this.state.date+'a');
            if (array !== null) {
                let appointment = JSON.parse(array);
                this.setState({
                    appointment: appointment
                })
            }
            else{
                this.setState({
                    appointment: []
                })
            }
        } catch (error) {
            alert("Error")
        }
    };


    addAppointment() {
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


    getTime(item){
        return  item.start + ' - ' + item.end;
    }

    setTime(time) {
        console.log(time)
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style = {styles.container}>
                    <View style={{flex: 1, marginTop: 22, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.state.appointments}
                            keyExtractor={item => item.date}
                            renderItem={({item, index}) => {
                                let i = index;
                                return (
                                    <AppointmentItem
                                        item={item}
                                        i = {i}
                                    />
                                )
                            }}
                        >
                        </FlatList>
                    </View>
                    <View style = {styles.appendButtonContainer}>
                    </View>
                    <Button
                        title="Add appointment"
                        onPress = {() => navigate('AddAppointment')}/>
                </View>
        );
    }
}

//Sett in time-component istedenfor button over her.
//Bruk boolean til å finne ut om det er start eller slutt-tid som settes

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
