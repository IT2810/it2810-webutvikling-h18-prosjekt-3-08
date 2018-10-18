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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
            left: [
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
                        <View style={styles.contentApp}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={styles.title}>{this.props.item.title}</Text>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={styles.desc}>{this.props.item.description}</Text>
                            </View>
                            <View style={{flex: 3}}>

                                <Text style={styles.location}>{this.props.item.location}</Text>
                            </View>
                        </View>
                        <TouchableHighlight onPress = {this.toggle}>
                            <Image style={styles.buttonImage} source={icon}/>
                        </TouchableHighlight>
                    </View>
                    <View style = {styles.body} onLayout = {this.setMaxHeight}>
                        {this.props.item.children}
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
        width: '100%',
        marginLeft: '10%',
        marginRight: '10%',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: 'row',
    },
    contentApp: {
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