import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {Report} from './report'
import { VoiceScreen } from './voicescreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

function TextScreen({navigation}) {
  const [getText, setText] = useState('');
  const getAnalysis=()=>{
    //use formdata
    var formData = new FormData();
    console.log(getText)
    const t=getText
    formData.append('text', t);
    fetch('http://10.113.49.222:3000/patient/predictText/'+t, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) =>{
         console.log(result)
        //  Alert.alert(result)
         navigation.replace('Report',{Cresult:result})
        })
      .catch((error) => console.log('error', error));

    // fetch('http://127.0.0.1:5000/', {
    //   method: 'GET'
    // })
    //   .then((response) => response.text())
    //   .then((result) =>{
    //      console.log(result)
    //     Alert.alert(result)
    //     })
    //   .catch((error) => console.log('error', error));

  }
  return (
    <ScrollView style={{ height: 500 }}>
      <View style={styles.MainContainer}>
        <ScrollView style={{ height: 500 }}>
          <Text style={{ fontSize: 20, margin: 10 }}>
            Write your Mental Health Problem
          </Text>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={'Type Something in Text Area.'}
            placeholderTextColor={'#9E9E9E'}
            numberOfLines={10}
            multiline={true}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(UserName) => setText(UserName)}
          />
          <TouchableOpacity onPress={getAnalysis}>
            <View
              style={{
                width: '50%',
                height: 40,
                backgroundColor: 'blue',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 20,
              }}>
              <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 5, color: 'white' }}>
                Analysis
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

// function VoiceScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <TouchableOpacity onPress={() => { }}>
//         <MaterialIcons name="keyboard-voice" size={80} color="blue" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// function Report() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Your Report will b shown Here</Text>
//     </View>
//   );
// }

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator style={{ paddingTop: 10 }}>
      <Tab.Screen name="Text Analysis" component={TextScreen} />
      <Tab.Screen name="VoiceAnalysis" component={VoiceAnalysisStack} />
    </Tab.Navigator>
  );
}


// export function Health() {
//   return (
//     <NavigationContainer independent={true}>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }
const Stack1 = createStackNavigator()
export const Health = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen name='MyTabs' component={MyTabs}  options={{headerShown: false}}  />
      <Stack.Screen name='Report' component={Report} options={{headerShown: false}}  />
    </Stack1.Navigator>
  )
}



const Stack = createStackNavigator()
export const VoiceAnalysisStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Voice Analysis' component={VoiceScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 10,
    margin: 10,
  },

  TextInputStyleClass: {
    textAlign: 'left',
    height: 150,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
  },
});