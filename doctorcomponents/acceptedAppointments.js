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
  ActivityIndicator
} from "react-native";
import { Header, LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import React, { Component, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";
function AcceptedAppointments({ navigation }) {

  const [appoinementdata, setdata] = useState([]);
  const [filterAppointment, setfilterAppointment] = useState([]);
  const [loading, setlaoding]=useState(false)
  const getappointment = async () => {
    setlaoding(true)
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
      redirect: "follow",
    };

    fetch(
      "http://192.168.18.48:3000/doctor/ViewAppointment/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("HI bro your appointment data is there");
        console.log(result);
        setdata(result);
        fiterApoinement(result)
      })
      .catch((error) => {console.log("error", error)
        setlaoding(false)
    });
  };

  async function fiterApoinement(result) {
    const ap = await result.filter((item) => item.status === "accepted");
    setfilterAppointment(ap);
  }

  useEffect(()=>{
    setlaoding(false)
  },[filterAppointment])
  useEffect(() => {
    getappointment();
  }, []);

  return (
    loading ? (
    <View
    style={{
      flex: 1,
      padding: 20,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    }}
  >
    <ActivityIndicator size={300} color="skyblue" />
    <Text>Loading Data ...</Text>
  </View>
) :  <View>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Detail</DataTable.Title>
          </DataTable.Header>
          {filterAppointment.map((item, index) => {
            return (
              <DataTable.Row key={index} style={styles.row}>
                <DataTable.Cell>{item.patient.name}</DataTable.Cell>
                <DataTable.Cell>{item.time}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                  navigation.navigate('DetailPatient',{item:item})
                  }}
                >
                  <DataTable.Cell>
                    <Text style={{ color: "seagreen", fontWeight: "bold" }}>
                      {" "}
                      View 
                    </Text>
                  </DataTable.Cell>
                </TouchableOpacity>
              </DataTable.Row>
            );
          })}
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
    backgroundColor: "seagreen",
    borderRadius: 15,
    height: 50,
    width: 50,
  },
  row: {
    marginTop: 20,
    padding: 15,
  },
});
export default AcceptedAppointments;
