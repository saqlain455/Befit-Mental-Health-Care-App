import * as FileSystem from 'expo-file-system';
import React,{useEffect} from 'react';

import { ActivityIndicator, Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit';

import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export const VoiceScreen = ({ navigation }) => {
  const [sound, setSound] = React.useState();
  const [RecordedURI, SetRecordedURI] = React.useState('');
  const [recording, setRecording] = React.useState();
  const [Voiceid, setVoiceid] = React.useState('');
  const [resultTranscript, setresultTranscript] = React.useState();
  const [isloading, setloading] = React.useState(true);
  const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
    isMeteringEnabled: true,
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    // ios: {
    //   extension: '.wav',
    //   audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    //   sampleRate: 44100,
    //   numberOfChannels: 2,
    //   bitRate: 128000,
    //   linearPCMBitDepth: 16,
    //   linearPCMIsBigEndian: false,
    //   linearPCMIsFloat: false,
    // },
  };

  // React.useEffect(() => {
  //   healthCondition()
  // }, [resultTranscript])


  // it return final result 
  const healthCondition = (re) => {
    //use formdata
    var formData = new FormData();
    // const t = resultTranscript
    var t= re
    formData.append('text', t);
    fetch('http://10.113.49.222:3000/patient/predictText/' + t, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        //  Alert.alert(result)
        navigation.replace('Report',{Cresult:result})
      }).then((result)=>{
        // console.log(result)
        // navigation.navigate('Report',{result:result})
      })
      .catch((error) => console.log('error', error));

  }

  const gettranscription = () => {
    if (Voiceid != '') {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://10.113.49.222:3000/patient/transcript/" + Voiceid, requestOptions)
        .then(response => response.json())
        .then(async(result) => {
          console.log(result.text)
          await setresultTranscript(result.text)
          await healthCondition(result.text)
        })
        .catch(error => console.log('error', error));
    }
  }

  const getAnalysis = async () => {
    var photo = {
      uri: RecordedURI,
      type: 'audio/wav',
      name: 'audio.wav',
    };

    //use formdata
    var Vid = ""
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append('filesent', photo);
    await fetch('http://10.113.49.222:3000/patient/sendVoice', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.VOICEID);
        Vid = result.VOICEID
        setVoiceid(Vid)
        
      }
      )
      .catch((error) => console.log('error', error));


    //////////////////////////////////////////////////////


    // if(Voiceid!=''){
    //   var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };

    //   fetch("http://192.168.100.107:3000/patient/transcript/"+Voiceid,requestOptions)
    //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));  
    // }


  };



  // useEffect(()=>{
  //   getPermissions()
  // },[])

  // const getPermissions = async () => {
  //   try {
  //     console.log('Requesting permissions..');

  //     const AudioPerm = await Audio.requestPermissionsAsync();
  //     if (AudioPerm.status === 'granted') {
  //     console.log('Audio Permission Granted');
  //     }
  //   } catch (err) {
  //    console.log('Failed to get permissions', err);
  //   }
  // };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    SetRecordedURI(uri);
    const info = await FileSystem.getInfoAsync(recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log('Recording stopped and stored at', uri);
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: RecordedURI }, {});
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (

    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
          <MaterialIcons name={recording ? "stop" : "keyboard-voice"} size={80} color="blue" />
        </TouchableOpacity>
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
        // onPress={recording ? stopRecording : startRecording}
        />
      </View>
      <Button title="getAnalysis" onPress={getAnalysis} />
      <Button title="gettranscription" onPress={gettranscription} />
      
    </View>
  );
}
 // <Button title="Play Sound" onPress={playSound} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
