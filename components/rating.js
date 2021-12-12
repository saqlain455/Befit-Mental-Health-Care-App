//This is an example code to make a Star Rating Bar //
import React, { Component } from "react";
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import all the components we are going to use.
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 2.5,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
      text: "",
    };
    //Filled Star. You can also give the path from local
    this.Star = "../Image/star_filled.png";

    //Empty Star. You can also give the path from local
    this.Star_With_Border = "../Image/star_corner.png";
  }

  componentDidMount() {
    console.log("Your doctor id in rating component ");
    console.log(this.props.route.params.id);
  }

  async SaveRating() {

    if(this.state.text.length>1){

    var t, id;
    var data = await AsyncStorage.getItem("data");
    var token = await AsyncStorage.getItem("Token");
    const d = JSON.parse(data);
    id = d.user._id;
    t = token;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer  " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      starvalue: this.state.Default_Rating,
      review: this.state.text,
      doctor: this.props.route.params.id,
      patient: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(
      "http://192.168.18.48:3000/patient/createRating",
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        Alert.alert("Thanku! Your rating are very helpful for us");
        //   navigation.navigate('AppointmentDate',{id:route.params.id})
      })
      .catch((error) => {
        console.log("error", error);
      });
    }
    else{
        Alert.alert("Plz give Review");
    }
  }

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          {i <= this.state.Default_Rating ? (
            <FontAwesome name="star" color="#05375a" size={25} />
          ) : (
            <FontAwesome name="star-o" color="#05375a" size={25} />
          )}
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <TextInput
          multiline={true}
          numberOfLines={5}
          label="Feedback"
          style={{ height: 100, width: "100%", marginHorizontal: 20 }}
          // value={text}
          onChangeText={(text) => this.setState({ text: text })}
        />
        <View>
          <Text style={styles.textStyle}>How was your experience with us</Text>
        </View>
        <Text style={styles.textStyleSmall}>Please Rate Us</Text>
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>

        <Text style={styles.textStyle}>
          {/*To show the rating selected*/}
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => this.SaveRating()}
        >
          {/*Clicking on button will show the rating as an alert*/}
          <Text>Done </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
    backgroundColor: "#8ad24e",
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    color: "#000",
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,

    color: "#000",
    marginTop: 15,
  },
});
