import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Button,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import AppointmentSetTime from "./AppointmentSetTime";


export default class AddAppointment extends React.Component {
    constructor(){
        super();
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.checkApp = this.checkApp.bind(this);

        this.state = {
            title: '',
            startTime: '',
            endTime: '',
            description: '',
            location: '',
        }
    };


    setStartTime(time) {
        this.setState ({
            startTime: time
        })
    };


    setEndTime(time) {
        this.setState({
            endTime: time
        });


    };

    setTitle(title){
        this.setState ({
            title: title
        });

    };

    setDescription(desc){
        this.setState ({
            description: desc
        })
    };

    setLocation(location){
        this.setState ({
            location: location
        })
    };

    addAndNavigate(){
        if (this.checkApp()) {
            let newApp = {
                key: new Date().toString(),
                title: this.state.title,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                description: this.state.description,
                location: this.state.location
            }
            this.props.navigation.state.params.addItem(newApp);
            this.props.navigation.navigate('Appointments')
        }
    }

    checkApp() {
        return (
            this.state.title !== '' &&
            this.state.startTime !== '' &&
            this.state.endTime !== '' &&
            !(this.state.startTime > this.state.endTime)
        )
    };


    render (){
        console.log(this.state);
        
        let titleStyle = this.state.title === '' ? styles.textInput : styles.textInput2
        let descStyle = this.state.description === '' ? styles.textInput : styles.textInput2
        let locStyle = this.state.location === '' ? styles.textInput : styles.textInput2
        return (
            <ScrollView>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={titleStyle}
                        value={this.state.title}
                        placeholder="Enter title"
                        onChangeText={(value) => this.setTitle(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
            
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={descStyle}
                        value={this.state.description}
                        placeholder="Enter description"
                        onChangeText={(value) => this.setDescription(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={locStyle}
                        value={this.state.location}
                        placeholder="Enter location"
                        onChangeText={(value) => this.setLocation(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                
            
                <View style={{padding: 40, paddingLeft: 100, flexDirection: 'row', alignItems: 'center'}}>
                    <AppointmentSetTime  onSelectTime = {this.setStartTime}/>
                    <Text>-</Text>
                    <AppointmentSetTime  onSelectTime = {this.setEndTime}/>
                </View>
                </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Add appointment"
                    disabled={!this.checkApp()}
                    onPress={this.addAndNavigate.bind(this)}
                />
            
            </View>
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 60
    },
    buttonContainer: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 40
    },
    header: {
        flexDirection: 'row',

    },
    calendar: {
        alignSelf: 'flex-end'
    },
 
    textStyle: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    textInput: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        color: 'black',
        padding: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    textInput2: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        color: 'black',
        padding: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#A9E2F3',
    },
    startTime: {

        fontSize: 20
    },
    endTime: {
        fontSize: 20
    },
    keyboard: {
        flex: 1,
    }

});
