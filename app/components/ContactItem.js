import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {  ListItem,} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

export default class ContactItem extends React.Component {


 
    render() {
        const swipeSettings = {
            autoClose: true,
            backgroundColor: '#fff',
            right: [
                {
                    onPress: () => {this.props.handleContactDelete(this.props.index)},
                    text: 'Delete',
                    type: 'delete'
                }
            ],
            }
        return (
            <Swipeout {...swipeSettings}>
                <ListItem
                    roundAvatar
                    title={`${this.props.item.firstName} ${this.props.item.lastName}`}
                    subtitle={`${this.props.item.email} | ${this.props.item.phoneNo}`}
                    avatar={{uri: './fist_logo.jpg'}}
                    containerStyle={{borderBottomWidth: 0}}
                />
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   },

})