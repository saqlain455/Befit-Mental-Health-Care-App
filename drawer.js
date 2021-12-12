import * as React from 'react';

import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getActionFromState } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import AcceptedAppointments from './components/acceptedAppointments';
import ActiveAppointments from './components/activeAppointments';
import AppointmentDate from './components/appointmentdate.js';
import AppointmentDetails from './components/appointmentDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Blog from './components/blogpage'
import CancelAppointments from './components/cancelAppointments';
import { DoctorProfile } from './components/doctorprofile';
import { DoctorReg } from './components/doctorReg'
import Feather from "react-native-vector-icons/Feather";
import { Health } from './components/health';
import { Home } from './components/home'
//import {Profile} from './components/profile.js'
import { Logout } from './components/logout.js'
import OrderMedicine from './components/orderMedicine.js';
import PastAppointments from './components/pastAppointments';
import {Profile} from './components/profile'
import { SearchDoctor } from './components/searchdoctor.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AcceptedOrder from './components/acceptedOrder';
import ActiveOrder from './components/activeOrder';
import PastOrder from './components/pastOrder';
import OrderDetail from './components/orderDetails';
import CancelOrder from './components/cancelOrder';
import DoctorprofilewithSendReport from './components/doctorprofilewithSendReport';
import { Payment } from "./components/payment";
// import pastAppointments from './Component/pastAppointments';
import VideoCall from "./videoCall";
import Rating from "./components/rating";
import AudioRecor from "./audiio";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
export const First = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='SearchDoctor' component={SearchDoctor} />
      <Stack.Screen name='DoctorProfile' component={DoctorProfile} />
      <Stack.Screen name='Health' component={Health} />
      <Stack.Screen name='AppointmentDate' component={AppointmentDate} />
      <Stack.Screen name='OrderMedicine' component={OrderMedicine} />
    </Stack.Navigator>
  )
}
//AppointmentDate


// export const SearchDoctor=(props)=>{
//   return null
// }

// export const Profile = (props) => {

//   const [getImg, setimg] = useState('');
//   function btoa(input) {
//     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//     var str = String(input);
//     for (
//       // initialize result and counter
//       var block, charCode, idx = 0, map = chars, output = '';
//       // if the next str index does not exist:
//       //   change the mapping table to "="
//       //   check if d has no fractional digits
//       str.charAt(idx | 0) || (map = '=', idx % 1);
//       // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
//       output += map.charAt(63 & block >> 8 - idx % 1 * 8)
//     ) {
//       charCode = str.charCodeAt(idx += 3 / 4);
//       if (charCode > 0xFF) {
//         throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
//       }
//       block = block << 8 | charCode;
//     }
//     return output;
//   }
//   function arrayBufferToBase64(buffer) {
//     var binary = '';
//     var bytes = [].slice.call(new Uint8Array(buffer));
//     bytes.forEach((b) => binary += String.fromCharCode(b));
//     return btoa(binary);
//   };


//   useEffect(() => {
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow'
//     };

//     fetch("http://192.168.100.109:3000/patient/Order/60bf5057874ad732e888afa1", requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log(result.img.data.data)
//         var base64Flag = 'data:image/jpeg;base64,';
//         var imageStr = arrayBufferToBase64(result.img.data.data);
//         setimg(base64Flag + imageStr)
//         console.log(imageStr)
//       })
//       .catch(error => console.log('error', error));


//     // fetch('http://192.168.1.187:3000/patient/Order/60bf5057874ad732e888afa1',{
//     //   method:"get"
//     // })
//     //     .then((res) =>{

//     //       res.json()
//     //     })
//     //     .then((doc) => {
//     //       console.log(doc)
//     //         var base64Flag = 'data:image/jpeg;base64,';
//     //         var imageStr = arrayBufferToBase64(doc.img.data.data);
//     //         setimg(base64Flag + imageStr)
//     //     }).catch(error => {
//     //          console.log('error',error);
//     //         // Alert.alert(res)
//     //        });

//   }, [])

//   const handleupload = (image) => {
//     const data = new FormData()
//     data.append('file', image);
//     data.append('upload_preset', 'healthApp');
//     data.append('cloud_name', 'imgload')
//     fetch("https://api.cloudinary.com/v1_1/imgload/image/upload", {
//       method: "post",
//       body: data
//     }).then(res => res.json).then(data => { console.log(data) })
//   }
//   return (

//     <View style={{ flex: 1, marginTop: 40 }} >
//       <Image style={{ height: '70%', width: '100%' }} source={{ uri: getImg }} />
//       <Text>Hi this is image getting page</Text>
//     </View>
//   )
// }
const Stack1 = createStackNavigator()
export const AppointmentsHistory = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen name='AppointmentHistory' component={AppointmentDetails} />
      <Stack1.Screen name='CancelAppointments' component={CancelAppointments} />
      <Stack1.Screen name='ActiveAppointments' component={ActiveAppointments} />
      <Stack1.Screen name='AcceptedAppointments' component={AcceptedAppointments} />
      <Stack1.Screen name='PastAppointments' component={PastAppointments} />
      <Stack1.Screen name='Video-Enable' component={DoctorprofilewithSendReport} />
      <Stack1.Screen name='VideoCall' component={VideoCall} />
      <Stack1.Screen name='Rating' component={Rating} />
    </Stack1.Navigator>
  )
}

const Stack2 = createStackNavigator()
export const OrderTrack = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen name='OrderDetails' component={OrderDetail} />
      <Stack2.Screen name='CancelOrder' component={CancelOrder} />
      <Stack2.Screen name='ActiveOrder' component={ActiveOrder} />
      <Stack2.Screen name='AcceptedOrder' component={AcceptedOrder} />
      <Stack2.Screen name='CompletedOrder' component={PastOrder} />
    </Stack2.Navigator>
  )
}
// export const Blog = (props) => {
//   return null
// }
// export const AppointmentsHistory = (props) => {
//   return null
// }


// const store = configureStore();

export const MyDrawer = ({ navigation }) => {


  return (
    <Drawer.Navigator drawerType="slide" >
      <Drawer.Screen
        name='First'
        component={First}
        options={({ navigation }) => ({
          drawerLabel: 'Home',
          headerTintColor: 'blue'
        })}
      />

      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={({ navigation }) => ({
          drawerLabel: 'Profile',
          headerTintColor: 'blue'
        })}
      />
      <Drawer.Screen
        name='DoctorReg'
        component={DoctorReg}
        options={({ navigation }) => ({
          drawerLabel: 'Are u doctor ?',
          headerTintColor: 'blue'
        })}
      />
      <Drawer.Screen
        name='SearchDoctor'
        component={SearchDoctor}
        options={({ navigation }) => ({
          drawerLabel: 'Search doctor',
          headerTintColor: 'blue'
        })}
      />
      <Drawer.Screen
        name='AppointmentsHistory'
        component={AppointmentsHistory}
        options={({ navigation }) => ({
          drawerLabel: 'Appointments History',
          headerTintColor: 'blue'
        })}
      />
        <Drawer.Screen
        name='OrderTrack'
        component={OrderTrack}
        options={({ navigation }) => ({
          drawerLabel: 'OrderTrack',
          headerTintColor: 'blue'
        })}
      />
      <Drawer.Screen
        name='Blog'
        component={Blog}
        options={({ navigation }) => ({
          drawerLabel: 'Health Blog',
          headerTintColor: 'blue'
        })}
      />
            {/* <Drawer.Screen
        name='Payment'
        component={Payment}
        options={({ navigation }) => ({
          drawerLabel: 'Payment module',
          headerTintColor: 'blue'
        })}
        
      /> */}
      {/* <Drawer.Screen
        name='VideoCall'
        component={VideoCall}
        options={({ navigation }) => ({
          drawerLabel: 'VideoCall',
          headerTintColor: 'blue'
        })}
        
      /> */}
            <Drawer.Screen
        name='Audio'
        component={AudioRecor}
        options={({ navigation }) => ({
          drawerLabel: 'AudioRecord',
          headerTintColor: 'blue'
        })}
        
      />
      
      
      <Drawer.Screen
        name='Logout'
        component={Logout}
        options={({ navigation }) => ({
          drawerLabel: 'Logout',
          headerTintColor: 'blue'
        })}
      />
    </Drawer.Navigator>
  )
}