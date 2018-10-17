import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Button,
    TextInput,
    TouchableOpacity,
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
        }, console.log(this.state.endTime));


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
        }
        this.setState({
            app: newApp
        })
    };

    render (){
        console.log(this.state)
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
                <View>
                    <Text></Text>
                    <AppointmentSetTime isStart = {true} onSelectTime = {this.setStartTime}/>
                </View>
                <View>
                    <Text></Text>
                    <AppointmentSetTime isStart = {false} onSelectTime = {this.setEndTime}/>
                </View>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.location}
                        placeholder="Enter location"
                        onChangeText={(value) => this.setLocation(value)}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <Button title='Confirm' onPress = {this.onConfirm.bind(this)}/>
                <Button
                    title="Add appointment"
                    onPress={this.addAndNavigate.bind(this)}
                />
            </View>
        )
    }

    addAndNavigate(){
        console.log(this.state.app)
        this.props.navigation.state.params.addItem(this.state.app)
        this.props.navigation.navigate('Appointments')

    }
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

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
    finishedTodo_textStyle: {
        alignSelf: 'flex-start',
        fontSize: 16,
        textDecorationLine: 'line-through'
    },
    status: {
        position: 'absolute',
        alignItems: 'flex-start',
        padding: 10
    },
    done: {
        color: 'green'
    },
    pending: {
        color: 'red'
    },
    todoDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    textInput: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        color: 'red',
        padding: 5,
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    keyboard: {
        flex: 1,
    }

});
