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


export default class AddAppointments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            textValue: '',
            startTime : true
        }
    }

    setTime(time) {
    }

    render (){
        return (
            <View>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.textValue}
                        placeholder="Enter title"
                        onChangeText={(value) => this.onChangeText(value)}
                        returnKeyType="go"
                        onSubmitEditing={this.addTodo}
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.textValue}
                        placeholder="Enter description"
                        onChangeText={(value) => this.onChangeText(value)}
                        returnKeyType="go"
                        onSubmitEditing={this.addTodo}
                    />
                </KeyboardAvoidingView>
                <View>
                    <Text>Pick start-time:</Text>
                    <AppointmentSetTime onSelectTime = {this.setTime}/>
                </View>
                <View>
                    <Text>Pick end-time:</Text>
                    <AppointmentSetTime onSelectTime = {this.setTime}/>
                </View>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.textValue}
                        placeholder="Enter location"
                        onChangeText={(value) => this.onChangeText(value)}
                        returnKeyType="go"
                        onSubmitEditing={this.addTodo}
                    />
                </KeyboardAvoidingView>
            </View>
        )
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

})
