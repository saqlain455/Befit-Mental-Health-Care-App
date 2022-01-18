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
  ActivityIndicator,
} from "react-native";
import { Caption, Headline, Subheading, Title } from "react-native-paper";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Blogitem from "./blogitem";
const Blog = ({ navigation }) => {
  const [getlist, setlist] = useState([]);

  const [loading, setloading] = useState(true);
  useEffect(() => {
    viewBlog();
  }, []);

  async function viewBlog() {
    try {
      const token = await AsyncStorage.getItem("Token");
      if (token !== null) {
        // console.log(token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "GET",
        };

        fetch("http://10.113.61.200:3000/patient/blog/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setlist(result);
            console.log("your blog result", getlist);
            
          })
          .catch((error) => console.log("error", error));
        return token;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setloading(false);
  }, [getlist]);

  return loading ? (
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
  ) : (
    getlist?.map((item, index) => {
      return (
        <View key={index} style={{ marginHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontSize: 20 }}>Befit Health Blogs</Title>
          </View>
          <ScrollView>
            <View key={index} style={{ paddingTop: 50 }}>
              <Blogitem item={item} />
              <Title style={{ fontSize: 30, color: "black" }}>
                {item.title}{" "}
              </Title>

              <Caption>
                BY {item.poster?.name} {item?.date}
              </Caption>
              <Text style={{ fontSize: 20, color: "grey" }}>
                {item?.content}
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    })
  );
};
export default Blog;
