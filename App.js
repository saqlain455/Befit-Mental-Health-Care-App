import * as React from "react";
//New 
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DoctorReg } from "./components/doctorReg";
import { MyDrawer } from "./drawer.js";
import { MyDrawer1 } from "./drawer1";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "./signIn";
import { Signup } from "./signUp";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// const [isloading,setloading]=useState(false)
export const LoadingScreen = (props) => {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("Token");
    const DoctorToken = await AsyncStorage.getItem("DoctorToken");
    const PatientToken = await AsyncStorage.getItem("PatientToken");

    // const token = true
    // const DoctorToken = false
    // const PatientToken =true
    // console.log(JSON.parse(jsonValue))

    if (token) {
      if (DoctorToken) {
        props.navigation.replace("MyDrawer1");
        console.log("doctor login")
      } else if(PatientToken) {
        props.navigation.replace("MyDrawer");
              console.log("patient login")
      }
      else{}
    } else {
      props.navigation.replace("SignIn");
      //   props.navigation.replace("MyDrawer")
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DoctorReg" component={DoctorReg} />
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyDrawer1"
          component={MyDrawer1}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
