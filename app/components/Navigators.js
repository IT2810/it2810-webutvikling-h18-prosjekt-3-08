import React from 'react';
import { StyleSheet, Text, View,
   TouchableOpacity,
   SafeAreaView,
   ScrollView,
   Dimensions,
   Image
   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigators
import {
    createDrawerNavigator,
    createStackNavigator,
    createTabNavigator,
    createMaterialTopTabNavigator,
    DrawerItems, StackNavigator,
} from 'react-navigation';

// TabNavigator screens
import Todos from './Todos';
import Appointments from './Appointments';

// Contacts
import Contacts from './Contacts';
import AddAppointment from "./AddAppointment";


// Finn en måte å legge AddAppointmentScreen-navigator inne i appointmenten.
// Usikkert om det går. Eventuelt prøv på nytt å finne en løsning inne i appointment.js.
// Skal bruke en stack-navigator inne i Appointments, som trigges av en knapp. Når denne knappen trykkes skal
// man sendes til appAppointment. For å komme tilbake må man trykke på enten: knapp i meny, en tilbake-knapp,
// eller legge til en valid appointment.


export const AppointmentStackNavigator = createStackNavigator({
    Appointments: {screen: Appointments,
    },
    AddAppointment: {screen : AddAppointment},
    },
    {
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight
            }
        }
    }
);


export const Tabs = createMaterialTopTabNavigator({
    AppointmentStack : {
        screen: AppointmentStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Appointments',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-clipboard' color={tintColor} size={24} />
            )
        }
    },
    Todos: {
        screen: Todos,
        navigationOptions: {
            tabBarLabel: 'Todos',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='ios-list' color={tintColor} size={24} />
            )
        }
    }
},
   {
      initialRouteName: 'AppointmentStack',
      //tabBarPosition: 'bottom',
      tabBarOptions: {
         activeTintColor: 'orange',
         inactiveTintColor: 'grey',
         showIcon: true,
         style: {
            backgroundColor: '#fff'
         }
      }
   }
);




export const Stack = createStackNavigator({
   TabNavigator: {
      screen: Tabs,
      navigationOptions: ({navigation}) => ({
         title: 'MyDay',
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
               <View style={{paddingHorizontal: 10}}>
                  <Ionicons name="md-menu" size={24} />
               </View>
            </TouchableOpacity>
         )
      })
   }
});


const CustomDrawerComponent = (props) => (
   <SafeAreaView style={{ flex: 1}}>
      <View style={styles.sideMenuTop}>
         <Image
            source={require('./fist_logo.jpg')}
            style={styles.menuImage}
         />
      </View>
      <ScrollView>
         <DrawerItems {...props} />
      </ScrollView>
   </SafeAreaView>
);

export const Drawer = createDrawerNavigator({
   MyDay: Stack,
   Contacts: Contacts
}, {
   contentComponent: CustomDrawerComponent
});


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   },
   sideMenuTop: {
      height: 150,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
   },
   menuImage: {
      height: 120,
      width: 120,
      borderRadius: 60,
   }
});
