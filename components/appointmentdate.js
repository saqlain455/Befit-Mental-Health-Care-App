import {
  Alert,
  Button,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Card,
  Divider,
  Button as NativeButton,
  Paragraph,
  Searchbar,
  Title,
} from "react-native-paper";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AppointmentDate({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [datebook, setdatebook] = useState("");
  const [timebook, settimebook] = useState("");
  const [doctorId, setdoctorId] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    console.log("your id is ", route.params.id);
    setdoctorId(route.params.id);
  }, []);

  const bookAppoinetmentWithdoctor = async () => {
    if(datebook){
      console.log('datebook',datebook)

    }
    if (datebook && timebook) {
      setloading(true);
      var data = await AsyncStorage.getItem("data");
      var token = await AsyncStorage.getItem("Token");
      const d = JSON.parse(data);
      var patientId = d.user._id;
      const getdata = {
        patient: patientId,
        doctor: doctorId,
        date: datebook,
        time: timebook,
        status: "active",
      };
      var raw = JSON.stringify(getdata);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "post",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://10.113.61.200:3000/patient/BookAppointment/",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("HI bro Appointmenet has saved in db");
          Alert.alert("Appointmenet has booked");
          console.log(result);
          setloading(false);
        })
        .catch((error) => console.log("error", error));
    } else {
      Alert.alert("Date and time is required");
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    console.log(currentDate);
    //tempdate
    let tempdate = new Date(currentDate);
    let dateObj = new Date(date);
    const month = tempdate.getMonth() + 1;
    let fdate = tempdate.getDate() + "/" + month + "/" + tempdate.getFullYear();
    let ftime = tempdate.getHours() + ":" + tempdate.getMinutes();
    // console.log('month',month)
    // console.log('objmonth',dateObj.getMonth()+1)
    // if(month==(dateObj.getMonth()+1)){

    //   Alert.alert("You choose pervious date")

    // }
    // if(month<(dateObj.getMonth()+1)){
    //   Alert.alert("You choose past date")

    // }
    setText(fdate + "\n" + ftime);
    settimebook(ftime);
    //set there
    setdatebook(tempdate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View style={{ paddingTop: 50 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>
          Make a booking
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>{text}</Text>
      </View>
      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "blue", borderRadius: 20, padding: 8 }}
            onPress={showDatepicker}
          >
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              Select Date
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "blue", borderRadius: 20, padding: 8 }}
            onPress={showTimepicker}
          >
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              Select time!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
        minimumDate={new Date(date)}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 20,
            padding: 8,
            width: "80%"
            ,margin:40 ,
          }}
          onPress={bookAppoinetmentWithdoctor}
        >
          <Text style={{ color: "white", fontSize: 24, textAlign: "center"}}>
            Book Appointment
          </Text>
        </TouchableOpacity>
    </View>
  );
}
