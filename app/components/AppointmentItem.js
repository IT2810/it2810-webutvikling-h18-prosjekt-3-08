import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, Image, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';



export default class AppointmentItem extends React.Component {

    constructor(props) {
        super(props);


        this.up = 'app/assets/up-arrow.png',
        this.down = 'app/assets/down-arrow.png';

        this.state = {
            title: props.title,
            expanded: false,
            maxHeight: '',
            minHeight: ''
        };
    }
        /*
        this.changeLayout = this.changeLayout.bind(this);
        this.state = {
            onLayoutHeight: 0,
            modifiedHeight: 0,
            expanded: false,
        }
    }


    changeLayout = () =>
    {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (this.state.expanded === false){
            this.setState ({
                modifiedHeight: this.state.onLayoutHeight,
                expanded: true,
            });
        } else {
            this.setState ({
                modifiedHeight: 0,
                expanded: false
            });
        }
    };

    getViewHeight (height) {
        this.setState({
            onLayoutHeight: height
        })
    };


    render (){
        return (
            <View style = {styles.appointmentItem}>
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress = {this.changeLayout} >
                        <Text> {this.props.item.title}</Text>
                    </TouchableOpacity>
                    <View style = {{height: this.state.modifiedHeight, overflow: 'hidden'}}>
                        <Text onLayout={(event) => this.getViewHeight(event.nativeEvent.layout.height)}> {this.props.item.desc}</Text>
                    </View>
                </View>
            </View>
        )}
*/

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
        if (this.state.maxHeight === '') {
            this.setState({
                maxHeight: event.nativeEvent.layout.height
            })
        }
    }

    setMinHeight(event){
        this.setState({
            minHeight : event.nativeEvent.layout.height,
            animation   : new Animated.Value(event.nativeEvent.layout.height)
        })
    }

    getTime(item){
        return  item.startTime + ' - ' + item.endTime;
    }


    render() {
        let icon = this.props.down;
        if(this.state.expanded){
            icon = this.props.up;
        }
        return (
            <Animated.View style={[styles.container, {height: this.state.animation}]}>
                <TouchableOpacity style={styles.appointmentItem} onLayout ={this.setMinHeight.bind(this)} onPress = {this.toggle.bind(this)}>
                    <View style={styles.time}>
                        <Text>{this.getTime(this.props.item)}</Text>
                    </View>
                    <View >
                        <Text style={styles.title}>{this.props.item.title}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.body} onLayout ={this.setMaxHeight.bind(this)}>
                    {this.props.desc}
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
    title: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    time: {
        flex: 1,
        padding: 10,
    },
    buttonImage: {
        width: 30,
        height: 25,
    },
})