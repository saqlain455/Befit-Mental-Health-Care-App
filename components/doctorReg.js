import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationContainer,
  getActionFromState,
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

  const [checkPmdc, setvalidatePmdc] = useState(false);
  const [checkCnic, setvalidateCnic] = useState(false);

  const AddDoctor = async () => {
    if (
      doctor.name &&
      doctor.phoneNo &&
      doctor.cnic &&
      doctor.address &&
      doctor.pmdc &&
      doctor.gender &&
      doctor.city &&
      doctor.experience &&
      doctor.about
    ) {
      console.log(checkPmdc, " format");
      console.log(" format", checkCnic);
      if (checkPmdc && checkCnic) {
        var token = await AsyncStorage.getItem("Token");

        var data = await AsyncStorage.getItem("data");
        const d = JSON.parse(data);
        id = d.user._id;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ ...doctor, _id: id });
        var requestOptions = {
          method: "post",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://10.113.61.200:3000/users/Requestdoctor/", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(" doctor has saved in db");
            Alert.alert(" doctor has saved in db");
            console.log(result);
          })
          .catch((error) => console.log("error", error));
      } else {
        Alert.alert("pmdc and Cnic format is Incorrect");
      }
    } else {
      Alert.alert("All fields are required!");
    }
  };

  const validatePmdc = async (value) => {
    //   const pattern=[
    //         '^.{6,}$', // min 8 chars
    //         '(?=.-)', // number required
    //         '(?=.*[A-Z])', // uppercase letter
    //       ]
    // if (!pattern) return true;

    // // string pattern, one validation rule
    // // array patterns, multiple validation rules
    // if (typeof pattern === 'object') {
    //   const conditions = pattern.map(rule => new RegExp(rule, 'g'));
    //   const ans= await conditions.map(condition =>condition.test(value));
    //   console.log( "pattern1  "+ans[0])
    //    console.log( "pattern2 "+ans[1])
    //   console.log( "pattern3  "+ans[2])

    // }
    const pattern = "^[0-9+]{6}-[A-Z]{1}$";
    if (typeof pattern === "string") {
      const condition = new RegExp("^[0-9+]{6}-[A-Z]{1}$", "g");
      const res = condition.test(value);
      setvalidatePmdc(res);
      console.log(res);
    }
  };

  const validateCnic = (value) => {
    const pattern = "^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$";
    if (typeof pattern === "string") {
      const condition = new RegExp("^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$", "g");
      const res = condition.test(value);
      setvalidateCnic(res);
      console.log(res);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={{ textAlign: "center", fontSize: 40 }}>
          Join as a Doctor{" "}
        </Text>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, name: value })}
            style={styles.text_input}
            placeholder="Name"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, phoneNo: value })}
            style={styles.text_input}
            placeholder="phone no"
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
           keyboardType="numeric"
            onChangeText={(value) => {
              validateCnic(value);
              setdoctor({ ...doctor, cnic: value });
            }}
            style={styles.text_input}
            placeholder="xxxxx-xxxxxxx-x"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => {
              validatePmdc(value);
              setdoctor({ ...doctor, pmdc: value });
            }}
            style={styles.text_input}
            placeholder="123456-A"
            maxLength={8}
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, address: value })}
            style={styles.text_input}
            placeholder="address"
          ></TextInput>
        </View>

        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, gender: value })}
            style={styles.text_input}
            placeholder="Gender"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, city: value })}
            style={styles.text_input}
            placeholder="City"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            keyboardType="numeric"
            onChangeText={(value) =>
              setdoctor({ ...doctor, experience: value })
            }
            style={styles.text_input}
            placeholder="Experience"
          ></TextInput>
        </View>
        <View style={styles.box}>
          <TextInput
            onChangeText={(value) => setdoctor({ ...doctor, about: value })}
            style={
              (styles.text_input,
              { height: 100, width: 300, borderWidth: 1, marginLeft:10,borderRadius:15})
            }
            placeholder="Experience"
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={AddDoctor}
          style={[
            styles.submit,
            {
              marginTop: 15,
              marginBottom: 400,
            },
          ]}
        >
          <Text style={([styles.text_submit])}>
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
    marginBottom: 50,
  },
  text: {
    color: "blue",
    fontSize: 20,
  },
  text_input: {
    marginLeft: 10,
    color: "#05375a",
    borderColor: "black",
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 15,
  },
  box: {
    paddingLeft: 30,
    marginTop: 10,
  },
  submit: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor:'red'
  },
  text_submit: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  ScrollView: {
    backgroundColor: "white",
    paddingTop: 3,
    width: "100%",
    marginTop: 20,
  },
});
