import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Searchbar,
  Title,
} from "react-native-paper";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { Component, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppointmentDate } from "./appointmentdate";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export class RatingGet extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    console.log("Your props");
    console.log(this.props.rating);
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= 5; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity activeOpacity={0.7} key={i}>
          {i <= parseInt(this.props.rating) ? (
            <FontAwesome name="star" color="#05375a" size={25} />
          ) : (
            <FontAwesome name="star-o" color="#05375a" size={25} />
          )}
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {React_Native_Rating_Bar.map((item) => {
          return item;
        })}
      </View>
    );
  }
}

export const DoctorProfile = ({ navigation, route }) => {
  const [getitem, setitem] = React.useState([]);
  const [doctorRating, setDoctorRating] = useState([]);
  const [loading, setloading] = useState(true);
  const [ratingTotal, setratingTotal] = useState(0);
  const LeftContent = (props) => (
    <MaterialIcons name="phone" size={30} color="blue" />
  );

  React.useEffect(() => {
    console.log(route.params.item.name);
    console.log(route.params.item._id);
    console.log("Router parameters", route.params.item);
    setitem(route.params.item);
  }, []);

  const doctorReview = async (doctorid) => {
    var myHeaders = new Headers();
    var t;
    var token = await AsyncStorage.getItem("Token");
    t = token;

    myHeaders.append("Authorization", "Bearer " + t);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://192.168.18.48:3000/patient/getRating/" + doctorid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDoctorRating(result);
        setloading(false);
        const totalRating = result.reduce(
          (total, item) => total + parseInt(item.starvalue),
          0
        );
        const avg = totalRating / 5;
        console.log("Your avg rating is", avg);
        setratingTotal(avg);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    console.log("doctor id in review component" + getitem._id);
    doctorReview(getitem._id);
  }, [getitem]);
  return loading ? (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" color="blue" />
      <Text>Loading Data ...</Text>
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.SubContainer}>
          {/* <Image
            source={{
              uri: "https://www.istockphoto.com/photo/indian-doctor-gm179011088-25575099",
            }}
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          /> */}
          <Text style={{ fontSize: 20 }}>{getitem.name}</Text>
          <View style={{display:'flex',flexDirection:'row'}}>
            <RatingGet rating={ratingTotal} />
            <Text style={{fontSize:20,paddingLeft:20}}>{ratingTotal}/5</Text>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          {/* <Card>
            <TouchableOpacity >
              <View style={{ alignItems: 'center' }}>
                <MaterialIcons name="video-call" size={50} color="blue" />
              </View>
            </TouchableOpacity>
          </Card> */}

          <View style={{ flex: 1, margin: 20 }}>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("Payment", { id: route.params.item._id })
              }
            >
              Book Video Consultation
            </Button>
          </View>
          <View style={{ flex: 1, margin: 20 }}>
            <Text style={{ fontSize: 22 }}>About</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.text1}>Experience:</Text>
              <Text style={styles.text2}>{getitem.experience}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text1}>Email:</Text>
              <Text style={styles.text2}>{getitem.email}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text1}>Address:</Text>
              <Text style={styles.text2}>{getitem.address}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text1}>City:</Text>
              <Text style={styles.text2}>{getitem.city}</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>
          Patients review about doctor
        </Text>
        <ScrollView>
          {doctorRating.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "",
                  flex: 1,
                  height: 300,
                  margin: 20,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "30%", backgroundColor: "" }}>
                  <Image
                    source={{
                      uri: "https://www.istockphoto.com/photo/indian-doctor-gm179011088-25575099",
                    }}
                    style={{ width: 70, height: 70, borderRadius: 150 / 2 }}
                  />
                </View>
                <View style={{ width: "80%" }}>
                  <View style={{ height: "10%" }}>
                    <Text style={{ fontSize: 20 }}>{item.patient.name}</Text>
                  </View>
                  <View
                    style={{
                      height: "50%",
                      marginRight: 20,
                      backgroundColor: "white",
                    }}
                  >
                    <Text>{item.review}</Text>
                    <View>
                      <RatingGet rating={item.starvalue} />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  SubContainer: {
    alignItems: "center",
    margin: 5,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  text1: {
    fontSize: 15,
    marginLeft: 10,
    width: "40%",
    color: "blue",
  },
  text2: {
    fontSize: 15,
    marginLeft: 10,
    width: "60%",
  },
});
