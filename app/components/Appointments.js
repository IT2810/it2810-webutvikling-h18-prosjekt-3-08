import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Button, FlatList, AsyncStorage} from 'react-native';
import AppointmentItem from './AppointmentItem';
import AddAppointment from "./AddAppointment";
import moment from 'moment'
import {Ionicons} from '@expo/vector-icons';

import Calender from './Calender';


export default class Appointments extends React.Component {


    constructor(){
        super();
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);

        let date = this.getCurrentDate();

        this.state = {
            appointments: [],
            activeDate: date
        };
    }


    getCurrentDate() {
        let date = new Date();
        let formatedDate = moment(date).format('YYYY-MM-DD');
        return formatedDate
    }

    storeData = async () => {
        try {
            await AsyncStorage.setItem(this.state.date+'a', JSON.stringify(this.state.appointments));
        } catch (error) {
            // Error saving data
        }
    };


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

    changeDate = (date) => {
        this.setState({
            activeDate: date,
        }, this.retrieveData)
    };

    addAppointment(title, desc, start, end, loc){
        let appCopy = this.state.appointments;
        let newApp = {
            title: title,
            desc: desc,
            startTime: start,
            endTime: end,
            location: loc,
        };
        appCopy.splice(0, 0, newApp);
        this.setState({
            appointments: appCopy
        },
        this.storeData);
        console.log('Adding appointment to async');
    }

    componentWillMount(){
        this.addAppointment(
            this.props.navigation.state.title,
            this.props.navigation.state.desc,
            this.props.navigation.state.startTime,
            this.props.navigation.state.endTime,
            this.props.navigation.state.location
        )
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
        }, this.storeData);
    }

    updateAppointment(){
    }



    // Pass inn handleToDelete, sjekk Ax sin kode
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style = {styles.container}>
                <View style ={styles.header}>
                    <Text style={styles.date}>
                        {this.state.activeDate}
                    </Text>
                    <Calender style= {styles.calendar} onSelectDate={this.changeDate}/>
                </View>
                <View style={{flex: 1, marginTop: 22, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.state.appointments}
                            extraData = {this.state}
                            renderItem={({item, index}) => {
                                let i = index;
                                let it = item;
                                return (
                                    <AppointmentItem
                                        i = {i}
                                        item={it}
                                        handleAppointmentDelete = {this.deleteAppointment}
                                    />
                                )
                            }}
                        />
                </View>
                <Button
                    title="Add appointment"
                    onPress = {() => navigate('AddAppointment',
                        {addItem: item => this.setState(prevState => ({ appointments: prevState.appointments.concat([item]) }))
                    })}/>
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
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    calendar: {
        alignSelf: 'flex-start',
        paddingLeft: 0,

    },
    date: {
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 3,
        paddingLeft: 5,
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
    },

})
