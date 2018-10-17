import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Swipeout from 'react-native-swipeout';



export default class AppointmentItem extends React.Component {

    constructor() {
        super();


        this.up = 'app/assets/up-arrow.png';
        this.down = 'app/assets/down-arrow.png';

        this.toggle = this.toggle.bind(this);
        this.setMaxHeight = this.setMaxHeight.bind(this);
        this.setMinHeight = this.setMinHeight.bind(this);

        this.state = {
            expanded: false,
            maxHeight: '',
            minHeight: '',
            animation   : new Animated.Value(),
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
            minHeight : event.nativeEvent.layout.height
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
                <Animated.View style={[styles.container, {height: this.state.animation}]}>
                    <View style={styles.appointmentItem} onLayout ={this.setMinHeight}>
                        <View style={styles.time}>
                            <Text>{this.getTime(this.props.item)}</Text>
                        </View>
                        <View >
                            <Text style={styles.title}>{this.props.item.title}</Text>
                        </View>
                        <TouchableHighlight onPress = {this.toggle}>
                            <Image
                                style={styles.buttonImage}
                                source={icon}
                            ></Image>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.body} onLayout ={this.setMaxHeight}>
                        {this.props.children}
                    </View>
                </Animated.View>
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