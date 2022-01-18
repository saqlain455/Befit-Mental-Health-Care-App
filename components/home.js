import * as React from "react";

import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationContainer,
  getActionFromState,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

import AppointmentDate from "./appointmentdate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Blog from "./blogpage";
import { Card } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Health } from "./health";
//import {Profile} from './components/profile.js'
import { MaterialIcons } from "@expo/vector-icons";
import OrderMedicine from "./orderMedicine";
import { SearchDoctor } from "./searchdoctor";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

let TouchableCmp = TouchableOpacity;
export const Home = ({ navigation }) => {
  const [getdata, setdata] = useState();
  const [getName, setName] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <Feather
            name="menu"
            size={32}
            color="#FF4500"
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      ),
    });
  });
  useEffect(() => {
    // getData()
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Token");
      console.log(JSON.parse(jsonValue));
      console.log(JSON.parse(jsonValue).user.username);
      setdata(JSON.parse(jsonValue));
      setName(JSON.parse(jsonValue).user.username);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const tokenGet = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem("Token");
      console.log(tokenValue);
    } catch (e) {
      // error reading value
    }
  };
  // return(
  //   <View style={styles.container} >
  //     <Text style={styles.text} >Home Screen</Text>
  //     <Button title='Data' onPress={()=>{
  //         tokenGet()
  //     }}></Button>

  //     <Text style={styles.text} >{getName}</Text>
  //   </View>
  // )

  return (
    <ScrollView>
      <Card>
        <Card.Cover
          source={{
            uri: "https://th.bing.com/th/id/R.8e929df204d4c3d52d6c860dcb0d14d7?rik=fdTciZ%2fmtCL8ZQ&pid=ImgRaw&r=0",
          }}
        />
      </Card>
      <View style={styles.gridItem}>
        <TouchableCmp
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("SearchDoctor")}
        >
          <View
            style={{ ...styles.container, ...{ backgroundColor: "white" } }}
          >
            <MaterialIcons
              name="book-online"
              size={50}
              color="green"
              style={{ marginTop: 35 }}
            />
            <Text
              style={{
                fontFamily: "Verdana",
                fontSize: 15,
                textAlign: "center",
                fontWeight: "bold",
                color: "green",
              }}
              numberOfLines={2}
            >
              Book Appointment
            </Text>
          </View>
        </TouchableCmp>
        <TouchableCmp
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("OrderMedicine")}
        >
          <View
            style={{ ...styles.container, ...{ backgroundColor: "white" } }}
          >
            <MaterialIcons
              name="medical-services"
              size={50}
              color="#FF4500"
              style={{ marginTop: 35 }}
            />
            <Text
              style={{
                fontFamily: "Verdana",
                fontSize: 15,
                textAlign: "center",
                fontWeight: "bold",
                color: "#FF4500",
              }}
              numberOfLines={2}
            >
              Order Medicine
            </Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.gridItem}>
        <TouchableCmp
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("Health")}
        >
          <View
            style={{ ...styles.container, ...{ backgroundColor: "white" } }}
          >
            <MaterialIcons
              name="sync"
              size={50}
              color="#40E0D0"
              style={{ marginTop: 35 }}
            />
            <Text
              style={{
                fontFamily: "Verdana",
                textAlign: "center",
                fontWeight: "bold",
                color: "#40E0D0",
                ...{ fontSize: 12 },
              }}
              numberOfLines={2}
            >
              Mental Health Analysis
            </Text>
          </View>
        </TouchableCmp>
        <TouchableCmp
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("SearchDoctor")}
        >
          <View
            style={{ ...styles.container, ...{ backgroundColor: "white" } }}
          >
            <MaterialIcons
              name="search"
              size={50}
              color="#FFA07A"
              style={{ marginTop: 35 }}
            />
            <Text style={styles.title} numberOfLines={2}>
              Search Doctors
            </Text>
          </View>
        </TouchableCmp>
      </View>
      {/* <View style={styles.gridItem}>
    <TouchableCmp style={{ flex: 1 }} onPress={()=>navigation.navigate('Blog')} >
    <View
style={{ ...styles.container, ...{ backgroundColor: 'white' } }}
    >
    <FontAwesome5 name="blog" size={50} color="blue" style={{marginTop: 35}} />
      <Text style={styles.title} numberOfLines={2}>
        Blogs
      </Text>
    </View>
  </TouchableCmp>
    <TouchableCmp style={{ flex: 1 }} onPress={()=>navigation.navigate('SearchDoctor')} >
    <View
style={{ ...styles.container,...{ backgroundColor: 'white' } }}
    >
    <MaterialIcons name='handyman' size={50} color="blue" style={{marginTop: 35}}/>
      <Text style={styles.title} numberOfLines={2}>
       Setting
      </Text>
    </View>
  </TouchableCmp>
  
  </View>            */}
    </ScrollView>
  );
};

//   <View style={styles.gridItem}>
//   <TouchableCmp style={{ flex: 1 }} >
//     <View
// style={{ ...styles.container,...{ backgroundColor: 'white' } }}
//     >
//       <MaterialIcons name='handyman' size={50} color="blue" style={{marginTop: 35}}/>
//       <Text style={styles.title} numberOfLines={1}>
//         Voice and text based Analysis
//       </Text>
//     </View>
//   </TouchableCmp>
// </View>

//   const styles = StyleSheet.create({
//     container:{
//       justifyContent:'center',
//       flex:1
//     },
//     text:{
//         fontSize:32
//     }
// })

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 160,
    flexDirection: "row",
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5,
  },
  container: {
    flex: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12,
  },
  title: {
    fontFamily: "Verdana",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFA07A",
  },
});
