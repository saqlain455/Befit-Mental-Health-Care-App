import * as ImagePicker from 'expo-image-picker';

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
  View
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import { Divider } from 'react-native-paper';

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Prescribedmedicine({navigation,route}) {
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(true);
  const[desciption,setdesciption]=useState('');
  const[address,setaddress]=useState('');

  useEffect(() => {
    console.log(desciption)

  }, [desciption]);

  useEffect(()=>{
    console.log(route.params.item._id)
  },[])

  const handleupload = async() => {

    setloading(false)
    var photo = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    var data = await AsyncStorage.getItem("data");
    var token = await AsyncStorage.getItem("Token");
    const d = JSON.parse(data);
    id = d.user._id;

    //use formdata
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append('filesent', photo);
    formData.append('patient_id', route.params.item._id);
    formData.append('doctor_id', id);
    formData.append("description", desciption);

    fetch('http://192.168.18.48:3000/doctor/PrescribeMedicine', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) =>{
        console.log(result)
        setloading(true)
        Alert.alert("medicine has been prescribed")
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    // let base64Img = `data:image;base64,${result.base64}`;
    // Alert.alert(base64Img);
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri)
    }
  };

  return (

    loading? 
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            width: '50%',
            marginHorizontal: 80,
            marginTop: 20,
            padding: 25,
          }}>
          <TouchableOpacity onPress={pickImage}>
            <Feather name="plus-square" size={70} color="white" />
          </TouchableOpacity>
          <Text>Add image</Text>
        </View>
        <View style={{ paddingTop: 2, marginHorizontal: 50 }}>
          <Text>Description</Text>
          <TextInput
          value={desciption}
          onChangeText={(text)=>setdesciption(text)}
            placeholder="write Description"
            style={{ borderWidth: 2, width: '100%', height: 100 }}></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '40%',
            height: 50,
            alignItems: 'center',
            backgroundColor: 'skyblue',
            margin: 70,
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handleupload}>
            <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4 }}></View>
        
        {image && (
          <Image
            source={{uri:image}}
            style={{ width: 200, height: 200, alignSelf: 'center' }}
          />
        )}
      </View>
    </ScrollView>
    :
     <ActivityIndicator size="large" color="blue" />
  );
}

