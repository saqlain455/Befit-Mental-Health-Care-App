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
  ActivityIndicator
} from "react-native";
import { Caption, Headline, Subheading, Title } from "react-native-paper";
import CreateBlog from "./createBlog";
import React,{useState} from "react";
import { useEffect } from "react/cjs/react.development";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Blogitem from './blogitem';
const Blog = ({navigation}) => {

  const [getlist, setlist] = useState([]);

  const [loading,setloading]=useState(false);
  useEffect(()=>{
    viewBlog()
  },[])

  


  async function viewBlog() {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (token !== null) {
        // console.log(token);
        console.log((token))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders
        };

        fetch("http://10.113.61.200:3000/doctor/blog/", requestOptions)
          .then(response => response.json())
          .then(result => {
            setloading(true)
            setlist(result)
            console.log('your blog result',getlist)
          })
          .catch(error => console.log('error', error));
        return token
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    setloading(false)
  },[getlist])

  return (
    <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Title style={{fontSize:20}}>Befit Health Blogs</Title>
          <Button onPress={()=>navigation.navigate('CreateBlog')} style={{width:30}} title='create Blog'></Button>
      </View>
      <ScrollView>
        {
            loading ? (
              <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Loading Data ...</Text>
              </View>
            )
            :
       getlist.map((item, index) => {
          return (
            <View key={index} style={{ paddingTop:50 }} >
              <Blogitem item={item}/>
              <Title style={{fontSize:30,color:"black"}}>{item.title} </Title>

              <Caption>BY Dr .Ahmad {item.date}</Caption>
              <Text style={{fontSize:20,color:"grey"}}>
              {item.content}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Blog;
