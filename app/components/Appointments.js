import React from 'react';
import {StyleSheet, Text, View, Button, FlatList, AsyncStorage, Alert} from 'react-native';
import AppointmentItem from './AppointmentItem';
import AddAppointment from "./AddAppointment";
import moment from 'moment'
import Calender from './Calender';


export default class Appointments extends React.Component {


    constructor(){
        super();
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
        this.storeData = this.storeData.bind(this);

        let date = this.getCurrentDate();

        this.state = {
            appointments: [],
            activeDate: date
        };
    };

    componentDidMount(){
        this.retrieveData();
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
           Alert.alert("Error");
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
           Alert.alert("Error");
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
        return (
            <View style = {styles.container}>
                <View style={{flex: 1, marginTop: 22}}>
                    <View style ={styles.header}>
                        <Calender style= {styles.calendar} onSelectDate={this.changeDate}/>
                        <Text>
                            {this.state.activeDate}
                        </Text>
                    </View>
                
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
                
                    <Button
                        title="Add appointment"
                        onPress = {() => this.props.navigation.navigate('AddAppointment',
                            {addItem: item => this.setState(prevState => ({ appointments: prevState.appointments.concat([item]) }), this.storeData)
                        })}
                    />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
      
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    date: {
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 3,
        paddingLeft: 5,
    },
    calendar: {
        alignSelf: 'flex-start',
        paddingLeft: 0,
        marginBottom: 3
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
    appendButtonContainer:{
        alignItems: 'center'
    },

})
