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
  useColorScheme
} from "react-native";
import { Caption, Headline, Subheading, Title } from "react-native-paper";

import React from "react";

const Blog = ({navigation}) => {
  return (
    <View style={{ marginHorizontal: 20, paddingTop: 20 }}>

    <Title style={{fontSize:30}}>Befit Health Blogs</Title>
      <ScrollView>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <View key={index} style={{ paddingTop:50 }} >
              <Image
                source={{
                  uri: "https://picsum.photos/seed/picsum/200/300"
                }}
                style={{
                  width: "100%",
                  height: 200,
                  alignSelf: "center",
                  marginHorizontal: 50
                }}
              />
              <Title style={{fontSize:30,color:"black"}}>Neutration </Title>

              <Caption>BY Dr .Ahmad 11/12/2021</Caption>
              <Text style={{fontSize:20,color:"grey"}}>
                We are huge fans of Mind and the work they do to support those
                living with Mental Health problems. They use their blog to
                publish personal and relatable stories to help those living with
                mental illness feel cared about, understood and listened to.
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Blog;
