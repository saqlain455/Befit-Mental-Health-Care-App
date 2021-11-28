import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Searchbar,
  Title,
} from 'react-native-paper';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import { AppointmentDate } from './appointmentdate'
import { MaterialIcons } from '@expo/vector-icons';

export const DoctorProfile = ({ navigation, route }) => {

  const [getitem, setitem] = React.useState([]);
  const LeftContent = (props) => (
    <MaterialIcons name="phone" size={30} color="blue" />
  );

  React.useEffect(() => {
    console.log(route.params.item.name)
     console.log(route.params.item._id)
    console.log("Router parameters",route.params.item)
    setitem(route.params.item)
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.SubContainer}>
          <Image
            source={{
              uri:
                'https://th.bing.com/th/id/OIP.c-LsJtQ-CPkgOqk3NQQ3tQHaJQ?pid=ImgDet&rs=1',
            }}
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          />
          <Text style={{ fontSize: 20 }}>{getitem.name}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Card>
            <TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <MaterialIcons name="video-call" size={50} color="blue" />
              </View>
            </TouchableOpacity>
          </Card>

          <View style={{ flex: 1, margin: 20 }}>
            <Button mode="contained" onPress={() => navigation.navigate('AppointmentDate',{id:route.params.item._id})}>
              Book Video Consultation
            </Button>
          </View>
          <View style={{ flex: 1, margin: 20 }}>
            <Text style={{ fontSize: 22 }}>About</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.text1}>
                Experience:
              </Text>
              <Text style={styles.text2}>
                {getitem.experience}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>
                Email:
              </Text>
              <Text style={styles.text2}>
                {getitem.email}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>
                Address:
              </Text>
              <Text style={styles.text2}>
                {getitem.address}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>
                City:
              </Text>
              <Text style={styles.text2}>
                {getitem.city}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>
          Patients review about doctor
        </Text>
        <ScrollView>
          <View
            style={{
              backgroundColor: '',
              flex: 1,
              height: 300,
              margin: 20,
              flexDirection: 'row',
            }}>
            <View style={{ width: '30%', backgroundColor: '' }}>
              <Image
                source={{
                  uri:
                    'https://th.bing.com/th/id/OIP.c-LsJtQ-CPkgOqk3NQQ3tQHaJQ?pid=ImgDet&rs=1',
                }}
                style={{ width: 70, height: 70, borderRadius: 150 / 2 }}
              />
            </View>
            <View style={{ width: '80%' }}>
              <View style={{ height: '10%' }}>
                <Text style={{ fontSize: 20 }}>Elon</Text>
              </View>
              <View
                style={{
                  height: '50%',
                  marginRight: 20,
                  backgroundColor: 'white',
                }}>
                <Text>Best Doctor for mental health</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  SubContainer: {
    alignItems: 'center',
    margin: 5,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  text1: {
    fontSize: 15, marginLeft: 10, width: '40%', color: 'blue'
  },
  text2: {
    fontSize: 15, marginLeft: 10, width: '60%'
  }
});















