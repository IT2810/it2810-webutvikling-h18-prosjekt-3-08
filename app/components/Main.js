import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

import MyDay from './MyDay';
import Contacts from './Contacts';
import Todos from './Todos';
import Appointments from './Appointments';


/*
Navigator hierarchy:
- SwitchNavigator
   - AppDrawerNavigator
      - AppStackNavigator (to give a common header to the tabs)
         - AppTabNavigator
            - Appointments tab
            - Todo tab
*/

export default createSwitchNavigator({
   Main: AppDrawerNavigator
})

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
)


const AppDrawerNavigator = createDrawerNavigator({
   MyDay: AppStackNavigator,
   Contacts: Contacts
   }, {
   contentComponent: CustomDrawerComponent
   }
)

export const AppStackNavigator = createStackNavigator( {
   AppTabNavigator: {
      screen: AppTabNavigator
   }
})

const AppTabNavigator =  createMaterialTopTabNavigator( {
   Todos: {
      screen: Todos,
      navigationOptions: {
         tabBarLabel: 'Todos',
         tabBarIcon: ({tintColor}) => (
            <Ionicons
               name="ios-list"
               color={tintColor}
               size={24}
            />
         )
      }
   },
   Appointments: {
      screen: Appointments,
      navigationOptions: {
         tabBarLabel: 'Appointments',
         tabBarIcon: ({tintColor}) => (
            <Ionicons
               name="ios-calendar"
               color={tintColor}
               size={24}
            />
         )
      }
   }
}, {
   initialRouteName: 'Appointments',
   order: ['Appointments', 'Todos'],
   tabBarPosition: 'bottom',
   activeTintColor: 'orange',
   tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      showIcon: true,
      style: {
         backgroundColor: '#f2f2f2'
      }
   }
})


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
})
