import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';



export default class AppointmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.icons = {
            'up'    : '.app/assets/up-arrow.png',
            'down'  : '.app/assets/down-arrow.png'
        };
        this.state = {
            title       : props.name,
            expanded    : true,
            animation   : new Animated.Value()

        };


    }

    toggle(){
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        this.setState({
            expanded: !this.state.expanded
        })
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {toValue: finalValue}
        ).start();
    }

    setMaxHeight(event){
        this.setState({
            maxHeight : event.nativeEvent.layout.height
        })
    }
    setMinHeight(event){
        this.setState({
            minHeight : event.nativeEvent.layout.height
        })
    }


    render() {
        let icon = this.icons['down'];
        if(this.state.expanded){
            icon = this.icons['up'];
        }
        return (
            <Animated.View style={[styles.container, {height: this.state.animation}]}>
                <View style={styles.container} onLayout ={this.setMinHeight.bind(this)}>
                    <TouchableOpacity onPress={this.toggle.bind(this)}>
                        <View style={styles.time}>
                            <Text>{this.getTime(item)}</Text>
                        </View>
                        <View style={styles.appointmentItem} >
                            <Text style={styles.textStyle}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container} onLayout ={this.setMaxHeight.bind(this)}>
                    <TouchableOpacity onPress={this.toggle.bind(this)}>
                        <View style={styles.appointmentItem} >
                            <Text style={styles.textStyle}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    appointmentItem: {
        marginLeft: '15%',
        marginRight: '10%',
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: 'center',
        flexDirection: 'column'
    },
    appointmentText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63'
    },
    appointmentDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    appointmentDeleteText: {
        color: 'white'
    }

})