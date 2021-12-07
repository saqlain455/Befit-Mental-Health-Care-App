import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  NavigationContainer,
  getActionFromState
} from "@react-navigation/native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

export const DoctorReg = (props) => {
  const [doctor, setdoctor] = useState({
    name: "",
    email: "",
    phoneNo: "",
    cnic: "",
    address: "",
    pmdc: "",
    gender: "",
    city: "",
    experience: "",
    about: "",
  });

  const AddDoctor = async () => {
    var token = await AsyncStorage.getItem("Token");
    
    var data = await AsyncStorage.getItem("data");
    const d = JSON.parse(data);
    id = d.user._id;



    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({...doctor,_id:id});
    var requestOptions = {
      method: "post",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://10.113.49.222:3000/users/Requestdoctor/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("HI bro doctor has saved in db");
        Alert.alert('HI bro doctor has saved in db')
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={{ textAlign: "center", fontSize: 40 }}>
          Join as a Doctor{" "}
        </Text>
        <View style={styles.box}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, name: value })}
            style={styles.text_input}
            placeholder="Name"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, email: value })}
            style={styles.text_input}
            placeholder="Email"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Phone no</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, phoneNo: value })}
            style={styles.text_input}
            placeholder="phone no"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Cnic</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, cnic: value })}
            style={styles.text_input}
            placeholder="Cnic"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>pmdc</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, pmdc: value })}
            style={styles.text_input}
            placeholder="123456-A"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Address</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, address: value })}
            style={styles.text_input}
            placeholder="address"
          ></TextInput>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>Gender</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, gender: value })}
            style={styles.text_input}
            placeholder="Gender"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>City</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, city: value })}
            style={styles.text_input}
            placeholder="City"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Experience in Year</Text>
          <TextInput
            onChangeText={(value) =>
              setdoctor({ ...doctor, experience: value })
            }
            style={styles.text_input}
            placeholder="Experience"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Tell about your self!</Text>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, about: value })}
            style={
              (styles.text_input,
              { height: 100, width: 250, borderWidth: 1, padding: 2 })
            }
            placeholder="Experience"
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={AddDoctor}
          style={[
            styles.submit,
            {
              borderColor: "#4dc2f8",
              borderWidth: 1,
              marginTop: 15,
              marginBottom: 400
            }
          ]}
        >
          <Text style={([styles.text_submit], { color: "#4dc2f8" })}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flex: 2 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50
  },
  text: {
    color: "blue",
    fontSize: 20
  },
  text_input: {
    marginLeft: 50,
    color: "#05375a",
    borderColor: "black",
    borderWidth: 2,
    width: 200,
    padding: 5,
    borderRadius: 10
  },
  box: {
    paddingLeft: 30,
    marginTop: 10
  },
  submit: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center"
  },
  text_submit: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  ScrollView: {
    backgroundColor: "white",
    paddingTop: 3,
    width: "100%",
    marginTop: 20
  }
});
