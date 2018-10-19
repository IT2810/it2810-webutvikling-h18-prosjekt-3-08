import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class PerfectDays extends React.Component {
      
   render() {
       const perfectDays = this.props.navigation.state.params.perfectDays
       console.log(perfectDays);
       
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Your Perfect Days
                </Text>
            </View>
           
            <FlatList
                data={perfectDays}
                keyExtractor={(index) => index}
                renderItem={({item}) => {
                    return (
                        
                        <TouchableOpacity>
                            <View style={styles.row}>
                                <Ionicons name= 'md-star' color= 'orange' size={24} />
                                <Text style={styles.date}>{item} </Text>
                            </View>
                        </TouchableOpacity>
                    )}}
            />
        </View>
      )
   }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 15,
        marginBottom: 0
    },
    row: {
        flex: 1,
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: 'row',
    },
    date: {
        paddingLeft: 10,
        justifyContent: 'center'
    }
})