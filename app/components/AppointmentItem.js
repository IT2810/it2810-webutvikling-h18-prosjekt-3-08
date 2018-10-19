import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';



export default class AppointmentItem extends React.Component {



    getTime(item){
        return  item.startTime + ' - ' + item.endTime;
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            right: [
                {
                    onPress: () => {this.props.handleAppointmentDelete(this.props.index)},
                    text: 'Delete',
                    type: 'delete'
                }
            ],
        };

        return (
            <Swipeout {...swipeSettings}>
                    <View style={styles.appointmentItem}>
                        <View style={styles.time}>
                            <Text>{this.getTime(this.props.item)}</Text>
                        </View>
                        <View style={styles.contentApplication}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={styles.title}>{this.props.item.title}</Text>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={styles.desc}>{this.props.item.description}</Text>
                            </View>
                            <View style={{flex: 3, flexDirection: 'row'}}>
                                <Ionicons name='md-pin'/>
                                <Text style={styles.location}>{' '+ this.props.item.location}</Text>
                            </View>
                        </View>
                    </View>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appointmentItem: {
        width: '100%',
        marginRight: '10%',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: 'row',
    },
    contentApplication: {
        padding: 10,
        flex:2,
        flexDirection: 'column',

    },
    title:{
        fontWeight: 'bold',
    },
    location: {
        color: '#ddd',
    },
    time: {
        width: 20,
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        justifyContent: 'center',
        borderColor: '#ddd',

    },
    buttonImage: {
        width: 10,
        height: 15,
    },
});