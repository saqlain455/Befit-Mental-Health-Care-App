/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
   Button,
   Icon,
   Image,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
   useColorScheme,
} from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import {
   Header,
   LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import React, {Component, useState} from 'react';

import AcceptedAppointments from './acceptedAppointments';
import ActiveAppointments from './activeAppointments';
import{ CancelAppointments }from './cancelAppointments';
import PastAppointments from './pastAppointments';
function App({ navigation }) {
   
   
   return (
     <View style={{flex:1}}>
         <View  style = {styles.mainView}>
       <View style = {styles.cardView} >
       <TouchableOpacity
        onPress={() => navigation.navigate('CancelAppointments')}>
      <Card  style={{width:150,height:150}}>
    <Card.Content style = {styles.contentView}>
      <Title>Canceled</Title>
      <Image  style =  {styles.deleteImg} source={require('../Image/1024px-Crystal_button_cancel.svg.png')} />
    </Card.Content> 
    
  </Card>

  </TouchableOpacity>
  <TouchableOpacity 
  onPress={() => navigation.navigate('AcceptedAppointments')}>
      <Card  style={{width:150,height:150}}>
    <Card.Content style = {styles.contentView}>
      <Title>Accepted</Title>
      <Image  style =  {styles.deleteImg} source={require('../Image/green-accept-button.jpg')} />
    </Card.Content> 
    
  </Card>

  </TouchableOpacity>
     </View >
     <View style = {styles.cardView} >
       <TouchableOpacity onPress={() => navigation.navigate('PastAppointments')}>
      <Card  style={{width:150,height:150}}>
    <Card.Content style = {styles.contentView}>
      <Title>Completed</Title>
      <Image  style =  {styles.deleteImg} source={require('../Image/history.png')} />
    </Card.Content> 
    
  </Card>

  </TouchableOpacity>
  <TouchableOpacity 
   onPress={() => navigation.navigate('ActiveAppointments')}>
      <Card  style={{width:150,height:150}}>
    <Card.Content style = {styles.contentView}>
      <Title>Active</Title>
      <Image  style =  {styles.deleteImg} source={require('../Image/active.png')} />
    </Card.Content> 
    
  </Card>

  </TouchableOpacity>
     </View >
     </View >
     </View >
   );
 }
 
 const styles = StyleSheet.create({
  mainView: {
    flex:1,
    marginTop:60,
  }
,
   cardView: {
     flexDirection:'row',
     justifyContent:'space-evenly',
     marginTop:25,
   
   },
   contentView: {
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  
  },
  deleteImg: {
    marginTop:10,
    height:'50%',
    width:'50%',
  
  },
  
 })
 export default App;
 