import React from 'react';
import {StyleSheet, Text, View, Button, FlatList, Keyboard, AsyncStorage} from 'react-native';
import AppointmentItem from './AppointmentItem';
import AddAppointment from "./AddAppointment";
import moment from 'moment';
import Calendar from './Calendar';


export default class Appointments extends React.Component {


    constructor(){
        super();
        this.addAppointment = this.addAppointment.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.storeData = this.storeData.bind(this);
        this.setTextDate = this.setTextDate.bind(this);

        let date = this.getCurrentDate();

        this.state = {
            appointments: [],
            activeDate: date,
            textDate: ""
        };
    };

    componentDidMount(){
        this.retrieveData()
        this.setTextDate()
        //this.deleteData()
        Keyboard.dismiss()
    }


    getCurrentDate() {
        let date = new Date();
        let formatedDate = moment(date).format('YYYY-MM-DD');
        return formatedDate
    }

    storeData = async () => {
        try {
            await AsyncStorage.setItem(this.state.activeDate+'a', JSON.stringify(this.state.appointments));
        } catch (error) {
           alert("Error");
        }
    };

    retrieveData = async() => {

        this.setTextDate()
        
        try {
            let array = await AsyncStorage.getItem(this.state.activeDate+'a');
            if (array !== null) {
                let appointments = JSON.parse(array);
                this.setState({
                    appointments: appointments
                })
            }
            else{
                this.setState({
                    appointments: []
                })
            }
        } catch (error) {
           alert("Error");
        }
    };


    changeDate = (date) => {
        this.setState({
            activeDate: date,
        }, this.retrieveData)
    };

    addAppointment(app){
        let apps = this.state.appointments;
        apps.splice(0,0, app);
        apps.sort((a,b) => (a.startTime > b.startTime));
        this.setState({
            appointments: apps
        }, this.storeData);
    }


    deleteAppointment(index){
        console.log(index)
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
    };


    setTextDate(){
        let d = this.state.activeDate
        let date = "";
        let month = "";
        switch (d.substring(5, 7)) {
           case '01':
              month = "January";
              break;
           case '02':
              month = "February";
              break;
           case '03':
              month = "March";
              break;
           case '04':
              month = "April";
              break;
           case '05':
              month = "May";
              break;
           case '06':
              month = "June";
              break;
           case '07':
              month = "July";
              break;
           case '08':
              month = "August";
              break;
           case '09':
              month = "September";
              break;
           case '10':
              month = "October";
              break;
           case '11':
              month = "November";
              break;
           case '12':
              month = "Desember";
              break;
           default:
              month = "Month"
        }
    
        let day = "";
        if (d.charAt(8) == '0'){
           day = d.charAt(9)
        }
        else {
           day = d.substring(8,10)
        }
        date += day + " of " + month + " " + d.substring(0, 4);
    
        this.setState({
           textDate: date
        })
     }


    render() {
        return (
            <View style = {styles.container}>
                <View style={{flex: 1, marginTop: 22}}>
                    <View style ={styles.header}>
                        <Calendar style= {styles.calendar} onSelectDate={this.changeDate}/>
                        <Text style={styles.date}>
                            {this.state.textDate}
                        </Text>
                    </View>
                    <FlatList
                        data={this.state.appointments}
                        extraData = {this.state}
                        renderItem={({item, index}) => {
                            let i = index;
                            return (
                                <AppointmentItem
                                    index = {i}
                                    item={item}
                                    handleAppointmentDelete = {this.deleteAppointment}
                                />
                            )
                        }}
                    />
                
                    <Button
                        title="Add appointment"
                        onPress = {() => this.props.navigation.navigate('AddAppointment',
                            {addItem: item => this.addAppointment(item)}
                        )}
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
  
    appendButtonContainer:{
        alignItems: 'center'
    },

})
