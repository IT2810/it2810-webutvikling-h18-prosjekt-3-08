import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, ScrollView } from 'react-native';


export default class AddContacat extends React.Component {

    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: ''
        }
    }

    addAndNavigate() {
        
        let newContact = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phoneNo
        }
        this.props.navigation.state.params.addItem(newContact)
        this.props.navigation.navigate('Contacts')
    }

 
    render() {
        let firstNameStyle = this.state.firstName === '' ? styles.textInput : styles.textInput2
        let lasstNameStyle = this.state.lastName === '' ? styles.textInput : styles.textInput2
        let emailStyle = this.state.email === '' ? styles.textInput : styles.textInput2
        let phoneNoStyle = this.state.phoneNo === '' ? styles.textInput : styles.textInput2
        return (
        
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                        <TextInput
                            style={firstNameStyle}
                            value={this.state.firstName}
                            placeholder="Firstname"
                            onChangeText={(value) => this.setState({firstName: value})}
                            returnKeyType="go"
                        />
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                        <TextInput
                            style={lasstNameStyle}
                            value={this.state.lastName}
                            placeholder="Lastname"
                            onChangeText={(value) => this.setState({lastName: value})}
                            returnKeyType="go"
                        />
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                        <TextInput
                            style={emailStyle}
                            value={this.state.email}
                            placeholder="Email"
                            onChangeText={(value) => this.setState({email: value})}
                            returnKeyType="go"
                        />
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                        <TextInput
                            style={phoneNoStyle}
                            value={this.state.phoneNo}
                            placeholder="Phone number"
                            onChangeText={(value) => this.setState({phoneNo: value})}
                            returnKeyType="go"
                        />
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add Contact"
                        onPress={this.addAndNavigate.bind(this)}
                        style={{margin: 40}}
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
   textInput: {
    margin: 15,
    marginBottom: 5,
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
})
