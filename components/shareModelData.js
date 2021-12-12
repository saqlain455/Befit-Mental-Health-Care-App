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
    Alert,
 } from 'react-native';
 import {
    Header,
    LearnMoreLinks,
 } from 'react-native/Libraries/NewAppScreen';
 import React, { Component, useEffect, useState } from "react";
 
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import { DataTable } from 'react-native-paper';
 import DoctorprofilewithSendReport from './doctorprofilewithSendReport'
 function ShareModelData({ navigation,route }) {
    
     const [appoinementdata, setdata] = useState([]);
     const [filterAppointment,setfilterAppointment]=useState([])

        useEffect(()=>{
            console.log('This is in your share model data component')
            console.log(route.params.result)
        },[])

     const shareIt = async (id) => {

        var myHeaders = new Headers();
        var t
        var token = await AsyncStorage.getItem("Token");
        t = token;
    
        console.log("ID and token is");
        console.log(t + "token and Appointment id is " + id);
        myHeaders.append("Authorization", "Bearer " + t);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(route.params.result);

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          redirect: "follow",
          body:raw
        };
    
        fetch(
          "http://192.168.18.48:3000/patient/AddModelDataToAppointment/" + id,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("HI bro your appointment data is updated");
            Alert.alert("Done! You have share it with this Doctor")
            console.log(result);
            getappointment()
          })
          .catch((error) => console.log("error", error));
      };
    




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
       "http://192.168.18.48:3000/patient/ViewAppointment/" + id,
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
           <DataTable.Title>Name</DataTable.Title>
           <DataTable.Title>Time</DataTable.Title>
           <DataTable.Title>Date</DataTable.Title>
           <DataTable.Title>Share with</DataTable.Title>
         </DataTable.Header>
    {filterAppointment.map((item,index) => {
      return   <DataTable.Row key={index} style={styles.row}> 
           <DataTable.Cell>{item.doctor.name}</DataTable.Cell>
           <DataTable.Cell>{item.time}</DataTable.Cell>
           <DataTable.Cell >{item.date}</DataTable.Cell>
           <DataTable.Cell ><Button title='Share' style={{color:'seagreen',fontWeight:'bold'}} onPress={()=>{shareIt(item._id)}} > </Button></DataTable.Cell>
 
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
  export default ShareModelData;
  