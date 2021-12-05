import React from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { useEffect } from "react/cjs/react.development";
import Prescribedmedicine from "./prescribedmedicine";
import { Report } from "./report";
const DetailPatient = ({navigation,route}) => {

    useEffect(()=>{
        console.log(route.params.item.patient.name)
    },[])
  return (

    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
      }}
    >
        <View>

         <Text>Name:{route.params.item.patient.name}</Text>
         <Text>Date: {route.params.item.date}</Text>
         <Text>Time: {route.params.item.time}</Text>
        </View>

      <TouchableOpacity
         onPress={()=>navigation.navigate('Report',{item:route.params.item})}
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue",
          width: "50%",
          height: "5%",
        }}
      >
        <Text>View Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>navigation.navigate('Prescribedmedicine',{item:route.params.item.patient})}
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue",
          width: "50%",
          height: "5%",
        }}
      >
        <Text>Prescribed Medicine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "skyblue",
          width: "50%",
          height: "5%",
        }}
      >
        <Text>Video call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailPatient;
