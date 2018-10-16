import React from 'react';
import { StyleSheet, View, FlatList, Button, AsyncStorage } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';


import ContactItem from './ContactItem';;



export default class Contacts extends React.Component {

    constructor() {
        super()
        this.deleteContact = this.deleteContact.bind(this)

        this.state = {
            contacts: [
                {
                    firstName: 'Axel',
                    lastName: 'Harstad',
                    email: 'axel.harstad@gmail.com',
                    phoneNo: '46886146',
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                },
                {
                    firstName: 'Henrik',
                    lastName: 'Roggerud',
                    email: 'fotballerbest@hotmail.no',
                    phoneNo: '12349876',
                },
            ],
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
          alert("Error")
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
            <View>
                <SearchBar 
                    placeholder="Type here..." 
                    lightTheme round 
                    onChangeText={this.handleSearch}
                />
                <Button 
                    title="Add a Contact" 
                    onPress={() => this.props.navigation.navigate('AddContact',
                    {addItem: item => this.setState(prevState => ({ contacts: prevState.contacts.concat([item]), filteredContacts: prevState.contacts.concat([item]) }), this.storeContacts)
                    })}
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
                contact.lastName.toLowerCase() + ' '
                contact.email.toLowerCase() 
        return info.includes(query) || query === ''
    }
        
    render() {
        return (

            <View style={{backgroundColor: '#fff'}}>
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
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
            </View>
            
        );
    }
    }



const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   },
})
