import React from 'react';
import { StyleSheet, View, FlatList, Button, AsyncStorage, Alert } from 'react-native';
import { List, SearchBar } from 'react-native-elements';


import ContactItem from './ContactItem';



export default class Contacts extends React.Component {

    constructor() {
        super()
        this.deleteContact = this.deleteContact.bind(this)

        this.state = {
            contacts: [],
            filteredContacts: [],
            query: ''
        }
    }
    componentDidMount(){
        this.retrieveContacts()
    }

    storeContacts = async () => {
        try {
          await AsyncStorage.setItem('contacts', JSON.stringify(this.state.contacts));
          
        } catch (error) {
          Alert.alert("Error", "Storing data failed.")
        }
      }

    retrieveContacts = async() => {
    try {
        let contactsData = await AsyncStorage.getItem('contacts');
        if (contactsData !== null) {
            let contacts = JSON.parse(contactsData)
            this.setState({
                contacts: contacts,
                filteredContacts: contacts
            })
        }
        else{
            this.setState({
                contacts: [],
                filteredContacts: []
            })
        }
    } catch (error) {
        console.log(error);
    }   
    }

    renderSeparator = () => {
        return (
            <View style = {{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: "14%"
            }} 
            />
        )
    }
    renderHeader = () => {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Button
                    title="Add new Contact"
                    style= {{borderBottomWidth: 3}}
                    onPress={() => this.props.navigation.navigate('AddContact',
                    {addItem: item => this.setState(prevState => ({ contacts: prevState.contacts.concat([item]), filteredContacts: prevState.contacts.concat([item]) }), this.storeContacts)
                    })}
                />
                <SearchBar 
                    placeholder="Search.." 
                    lightTheme round 
                    onChangeText={this.handleSearch}
                    value={this.state.query}
                    clearIcon={{ color: 'black' }}
                    onClearText={ () => this.setState({query: ''})}
                    containerStyle={{backgroundColor: '#fff', borderBottomWidth: 0}}
                />

            </View>
        )
    }


    deleteContact(index){
        let contactsCopy = []
            if (this.state.contacts.length > 1){
                contactsCopy = this.state.contacts
                contactsCopy.splice(index, 1)
            }
            else {
                contactsCopy = []
            }

            this.setState({
                contacts: contactsCopy,
                filteredContacts: contactsCopy
            }, this.storeContacts)
        }

    handleSearch = (text) => {
        const formatQuery = text.toLowerCase()
        const data = this.state.contacts.filter( contact => {
            return this.contains({contact}, formatQuery)
        })
        
        this.setState({
            query: formatQuery,
            filteredContacts: data
        })
    }

    contains = ({contact}, query) => {
        let info = contact.firstName.toLowerCase() + ' ' +
                contact.lastName.toLowerCase() + ' ' +
                contact.email.toLowerCase()
        return info.includes(query) || query === ''
    }
        
    render() {
        return (

                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: '#fff', flex: 1, marginTop: 0}}>
                    <FlatList
                        data={this.state.filteredContacts}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={ ({item, index}) => {
                            let i = index
                            return (
                                <ContactItem 
                                    item = {item}
                                    index = {i}
                                    handleContactDelete = {this.deleteContact}
                                />
                            )   
                        }}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    />
                </List>
        );
    }
}

