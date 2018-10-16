import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';



export default class Contacts extends React.Component {

    constructor() {
        super()
        this.state = {
            contacts: [
                {
                    firstName: 'Axel',
                    lastName: 'Harstad',
                    email: 'axel.harstad@gmail.com',
                    phoneNo: '46886146',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },
                {
                    firstName: 'Simen',
                    lastName: 'Rekdal',
                    email: 'basketboy123@hotmail.com',
                    phoneNo: '12349876',
                    picture: './fist_logo.jpg'
                },

            ]
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

    render() {
        console.log(this.state.contacts);
        
        return (
            <View style={{backgroundColor: '#fff'}}>
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.contacts}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={ ({ item }) => (
                            <ListItem
                                roundAvatar
                                title={`${item.firstName} ${item.lastName}`}
                                subtitle={item.email}
                                avatar={{uri: item.picture.thumbnail}}
                                containerStyle={{borderBottomWidth: 0}}
                            />
                        )}
                    ItemSeparatorComponent={this.renderSeparator}
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
