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

export default function OrderMedicine() {
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(true)
  const handleupload = () => {

    setloading(false)
    var photo = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    //use formdata
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append('filesent', photo);

    formData.append('buyer_id', '60bf5057874ad732e888afa1');
    //data.append("description", "2 panadol");
    fetch('http://10.113.61.200:3000/patient/OrderMedicine', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) =>{
        console.log(result)
        setloading(true)
        Alert.alert("Order has been saved")
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
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: 'black', fontSize: 20 }}>
            Process of medicine
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 30,
          }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Feather name="upload" size={20} color="skyblue" width="33" />
            <Text>upload </Text>
          </View>
          <Divider />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <MaterialIcons
              name="verified"
              size={20}
              color="skyblue"
              width="33"
            />
            <Text>Admin will verify order </Text>
          </View>
          <Divider />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Feather name="plus-square" size={20} color="skyblue" width="33" />
            <Text>Get medicine at door step </Text>
          </View>
          <Divider />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: 'skyblue',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
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
            backgroundColor: '#0000cc',
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

