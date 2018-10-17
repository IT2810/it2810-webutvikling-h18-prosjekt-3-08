import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button } from 'react-native';


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
      return (
          <View>
              <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.firstName}
                        placeholder="Firstname"
                        onChangeText={(value) => this.setState({firstName: value})}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.lastName}
                        placeholder="Lastname"
                        onChangeText={(value) => this.setState({lastName: value})}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.email}
                        placeholder="Email"
                        onChangeText={(value) => this.setState({email: value})}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior= "padding" styles= {{flex: 1}} >
                    <TextInput
                        style={styles.textInput}
                        value={this.state.phoneNo}
                        placeholder="Phone number"
                        onChangeText={(value) => this.setState({phoneNo: value})}
                        returnKeyType="go"
                    />
                </KeyboardAvoidingView>
                <Button 
                    title="Add Contact"
                    onPress={this.addAndNavigate.bind(this)}
                    style={{margin: 40}}
                />
          </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
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
})
