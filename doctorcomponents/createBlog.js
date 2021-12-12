import * as ImagePicker from "expo-image-picker";

import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from "react-native-paper";

export default function CreateBlog() {
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(true);
  const [title, settitle] = useState(true);
  const [des, setdes] = useState(true);
  const handleupload = async() => {
    setloading(false);
    var photo = {
      uri: image,
      type: "image/jpeg",
      name: "order.jpg",
    };


    var data = await AsyncStorage.getItem("data");
    var token = await AsyncStorage.getItem("Token");
    const d = JSON.parse(data);
    id = d.user._id;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    //use formdata
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append("blogsent", photo);
    formData.append("description", des);
    formData.append("title", title);
    formData.append("poster", id);
    console.log("this is form data",formData)
    fetch("http://192.168.18.48:3000/doctor/addblog", {
      method: "post",
      body: formData
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setloading(true);
        Alert.alert("Blog has been saved");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    // let base64Img = `data:image;base64,${result.base64}`;
    // Alert.alert(base64Img);
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  return loading ? (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ paddingTop: 2, marginHorizontal: 50 }}>
          <Text>Title</Text>
          <TextInput
            onChangeText={(value) => settitle(value)}
            style={{ borderWidth: 2, width: "100%", height: 50 }}
          ></TextInput>
        </View>
        <View style={{  marginHorizontal: 50 }}>
          <Text>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            onChangeText={(value) => setdes(value)}
            style={{ borderWidth: 2, width: "100%", height: 200 }}
          ></TextInput>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "skyblue",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            width: "50%",
            marginHorizontal: 80,
            marginTop: 20,
            padding: 25,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Feather name="plus-square" size={70} color="white" />
          </TouchableOpacity>
          <Text> Add Blog image</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "40%",
            height: 50,
            alignItems: "center",
            backgroundColor: "skyblue",
            margin: 70,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={handleupload}>
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4 }}></View>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
        )}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator size="large" color="blue" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 8,
  },
  input: {
    height: 50,
    width: "80%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  sigIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 100,
  },
  textinput: {
    height: "100%",
    width: "100%",
    marginLeft: 50,
  },
});
