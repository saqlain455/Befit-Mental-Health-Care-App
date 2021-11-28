import * as React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import { getActionFromState, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import Feather from "react-native-vector-icons/Feather";

export const Logout=(props)=>{
    useEffect(()=>{
          removeData()
    },[])
  
    const removeData = async () => {
        try {
          await AsyncStorage.removeItem('Token')
          props.navigation.replace('SignIn')
  
        } catch(e) {
          // error reading value
        }
      }
      return null
  }
  