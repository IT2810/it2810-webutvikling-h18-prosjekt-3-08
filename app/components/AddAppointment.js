import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Button,
    TextInput,
    Alert,
    KeyboardAvoidingView
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
        this.onConfirm = this.onConfirm.bind(this);
        this.checkApp = this.checkApp.bind(this);

        this.state = {
            title: '',
            startTime: '',
            endTime: '',
            desc: '',
            location: '',
            app: ''
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
            desc: desc
        })
    };

    setLocation(location){
        this.setState ({
            location: location
        })
    };




    onConfirm(){
        if (this.checkApp() === true) {
            let t = this.state.title;
            let st = this.state.startTime;
            let et = this.state.endTime;
            let d = this.state.desc;
            let l = this.state.location;
            let newApp = {
                key: new Date().toString(),
                title: t,
                startTime: st,
                endTime: et,
                desc: d,
                location: l
            };
            this.setState({
                app: newApp
            });
            return true
        }
        else {
            return false
        }
    };

    checkApp() {
        if (this.state.title === '') {
            return false
        }
        else if (this.state.startTime === '') {
            return false
        }
        else if (this.state.endTime === '') {
            return false
        }
        else if (this.state.startTime > this.state.endTime){
            return false
        }
        else {
            return true
        }
    };


    render (){
        console.log(this.state);
        return (
            <View>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.title}
                        placeholder="Enter title"
                        onChangeText={(value) => this.setTitle(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.desc}
                        placeholder="Enter description"
                        onChangeText={(value) => this.setDescription(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.location}
                        placeholder="Enter location"
                        onChangeText={(value) => this.setLocation(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <View>
                    <Text></Text>
                    <AppointmentSetTime style={styles.textInput} isStart = {true} onSelectTime = {this.setStartTime}/>
                    <Text></Text>
                    <AppointmentSetTime style={styles.textInput} isStart = {false} onSelectTime = {this.setEndTime}/>
                </View>
                <Button
                    title="Add appointment"
                    onPress={this.addAndNavigate.bind(this)}
                />
            </View>
        )
    }

    addAndNavigate(){
        if (this.onConfirm()) {
            this.props.navigation.state.params.addItem(this.state.app);
            this.props.navigation.navigate('Appointments')
        } else {
            Alert.alert('Error', 'You have to fill all the fields');
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    header: {
        flexDirection: 'row',

    },
    calendar: {
        alignSelf: 'flex-end'
    },
    todoItem: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
        flexDirection: 'column'
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
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    keyboard: {
        flex: 1,
    }

});
