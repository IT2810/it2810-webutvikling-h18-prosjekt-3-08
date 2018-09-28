import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text}>McApp</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00001b',
        alignItems: 'center',
        justifyContent: 'center',
        },
    text: {
        color: "white",
        fontSize: 20,
        },
    });
