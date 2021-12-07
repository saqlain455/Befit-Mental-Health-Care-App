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
 import {
    Header,
    LearnMoreLinks,
 } from 'react-native/Libraries/NewAppScreen';
 import React, { Component, useEffect, useState } from "react";
 
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import { DataTable } from 'react-native-paper';
import { RectButton } from "react-native-gesture-handler";
 
 function AcceptedOrder({ navigation }) {
    
     const [appoinementdata, setdata] = useState([]);
     const [filterAppointment,setfilterAppointment]=useState([])
   const getappointment = async () => {
 
     var myHeaders = new Headers();
     var t, id;
     var data = await AsyncStorage.getItem("data");
     var token = await AsyncStorage.getItem("Token");
     const d = JSON.parse(data);
     id = d.user._id;
     t = token;
 
     console.log("ID and token is");
     console.log(t + "token and id is " + id);
     myHeaders.append("Authorization", "Bearer " + t);
     myHeaders.append("Content-Type", "application/json");
 



   
     var requestOptions = {
       method: "GET",
       headers: myHeaders,
       redirect: "follow"
     };
 
     fetch(
       "http://10.113.49.222:3000/patient/ViewOrder/" + id,
       requestOptions
     )
       .then((response) => response.json())
       .then((result) => {
         console.log("HI bro your appointment data is there");
         console.log(result);
         setdata(result);
       })
       .catch((error) => console.log("error", error));
   };
 
   async function fiterApoinement() {
       const ap=await appoinementdata.filter((item)=>item.status==="accepted")
       setfilterAppointment(ap)
   }
 
   useEffect(() => {
       fiterApoinement()
   }, [appoinementdata]);
 
 
     useEffect(() => {
     getappointment();
   }, []);
    
    return (
     <View>
         <View style={styles.container}>
       <DataTable>
         <DataTable.Header>
           <DataTable.Title>id</DataTable.Title>
           <DataTable.Title>Date</DataTable.Title>
           <DataTable.Title>Status</DataTable.Title>
           <DataTable.Title>View</DataTable.Title>
           
         </DataTable.Header>
    {[{_id:"1",date:"20"},{_id:"2",date:"20"}].map((item,index) => {
      return   <DataTable.Row key={index} style={styles.row}> 
           <DataTable.Cell>{item._id}</DataTable.Cell>
         
           <DataTable.Cell >{item.date}</DataTable.Cell>
           <DataTable.Cell ><Text style={{color:'seagreen',fontWeight:'bold'}}> Accepted</Text></DataTable.Cell>
           <DataTable.Cell ><Button title="View" style={{color:'seagreen',fontWeight:'bold'}}> View </Button></DataTable.Cell>
         </DataTable.Row>
    })
   }
       </DataTable>
     </View>
     </View>
    );
  }
  
  const styles = StyleSheet.create({
   container: {
     flex: 1,
     marginTop: 60,
   },
   TouchableOpac: {
     backgroundColor:'seagreen',
     borderRadius:15,
     height:50,
     width:50,
   },
   row: {
     marginTop:20,
     padding:15,
     },
 
   
  })
  export default AcceptedOrder;
  