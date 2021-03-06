import React from 'react';
import { StyleSheet, Text, View,
   TouchableOpacity,
   SafeAreaView,
   ScrollView,
   Image,
   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigators
import {
    createDrawerNavigator,
    createStackNavigator,
    createMaterialTopTabNavigator,
    DrawerItems,
} from 'react-navigation';

// TabNavigator screens
import Todos from './Todos';
import Appointments from './Appointments';

import PerfectDays from './PerfectDays'

// Contacts
import Contacts from './Contacts';
import AddAppointment from "./AddAppointment";
import AddContact from "./AddContact";



export const TodosStack = createStackNavigator({
    Todos: {
        screen: Todos,
        
     },
     PerfectDays: {
         screen: PerfectDays
     }},
     {
        headerMode: 'none',
        navigationOptions: {
            headerStyle: {
                marginTop: Expo.Constants.statusBarHeight
                }
        }
    }
)



export const AppointmentStackNavigator = createStackNavigator({
    Appointments: {screen: Appointments,
    },
    AddAppointment: {screen : AddAppointment},
    },
    {
    headerMode: 'none', // screen?
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
    TodosStack: {
        screen: TodosStack,
        navigationOptions: {
            tabBarLabel: 'Todos',
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='ios-list' color={tintColor} size={24} />
            ),
        }
    }
},
   {
      initialRouteName: 'AppointmentStack',
      swipeEnabled: false,
      tabBarOptions: {
         activeTintColor: 'orange',
         inactiveTintColor: 'grey',
         showIcon: true,
         style: {
            backgroundColor: '#fff',
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
         ), 
         
        
      })
   }
});

export const ContactsStack = createStackNavigator({
   Contacts: {
      screen: Contacts,
      navigationOptions: ({navigation}) => ({
         title: 'Contacts',
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
               <View style={{paddingHorizontal: 10}}>
                  <Ionicons name="md-menu" size={24} />
               </View>
            </TouchableOpacity>
         ),
      })
   },
   AddContact: {
       screen: AddContact
   }
    }
)

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
   Contacts: ContactsStack
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
