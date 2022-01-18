import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
const audioRecorderPlayer = new AudioRecorderPlayer();

import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { PermissionsAndroid } from "react-native";

export const VoiceScreen = ({ navigation }) => {
  const [sound, setSound] = React.useState();
  const [RecordedURI, SetRecordedURI] = React.useState("");
  const [recording, setRecording] = React.useState(false);
  const [Voiceid, setVoiceid] = React.useState("");
  const [resultTranscript, setresultTranscript] = React.useState();
  const [isloading, setloading] = React.useState(false);
  const [audioInfo, setaudioInfo] = useState({
    currentPositionSec: undefined,
    currentDurationSec: undefined,
    playTime: undefined,
    duration: undefined,
  });
  const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
    isMeteringEnabled: true,
    android: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  // React.useEffect(() => {
  //   healthCondition()
  // }, [resultTranscript])

  // it return final result
  const healthCondition = (re) => {
    //use formdata
    var formData = new FormData();
    // const t = resultTranscript
    var t = re;
    formData.append("text", t);
    fetch("http://10.113.61.200:3000/patient/predictText/" + t, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        //  Alert.alert(result)
        navigation.replace("Report", { Cresult: result });
      })
      .then((result) => {
        // console.log(result)
        // navigation.navigate('Report',{result:result})
      })
      .catch((error) => console.log("error", error));
  };

  const gettranscription = () => {
    if (Voiceid != "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://10.113.61.200:3000/patient/transcript/" + Voiceid,
        requestOptions
      )
        .then((response) => response.json())
        .then(async (result) => {
          console.log(result.text);
          await setresultTranscript(result.text);
          await healthCondition(result.text);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const getAnalysis = async () => {
    setloading(true);
    var photo = {
      uri: RecordedURI,
      type: "audio/mp4",
      name: "abc.mp4",
    };

    //use formdata
    var Vid = "";
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append("filesent", photo);
    await fetch("http://10.113.61.200:3000/patient/sendVoice", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.VOICEID);
        Vid = result.VOICEID;
        setVoiceid(Vid);
        setloading(false);
      })
      .catch((error) => console.log("error", error));

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

  const onStartRecord = async () => {
    setRecording(true);

    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setaudioInfo({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    setRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setaudioInfo({
      recordSecs: 0,
    });
    const info = await FileSystem.getInfoAsync(result);
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log("Recording stopped and stored at", info);
    console.log(result);
    SetRecordedURI(info.uri);
  };

  const onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer();
    await audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      setaudioInfo({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log("onStopPlay");
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  useEffect(() => {
    permiss();
  }, []);

  const permiss = async () => {
    if (Platform.OS === "android") {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log("write external stroage", grants);

        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions granted");
        } else {
          console.log("All required permissions not granted");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    SetRecordedURI(uri);
    const info = await FileSystem.getInfoAsync(recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log("Recording stopped and stored at", uri);
  }

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: RecordedURI }, {});
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return isloading ? (
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
    <View style={styles.container}>
      <View style={{ flex: 1,marginTop:100 }}>
        <TouchableOpacity onPress={recording ? onStopRecord : onStartRecord}>
          <MaterialIcons
            name={recording ? "stop" : "keyboard-voice"}
            size={80}
            color="red"
          />
        </TouchableOpacity>
        {/* <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
        // onPress={recording ? stopRecording : startRecording}
        /> */}
        {/* <Button title="Start ply" onPress={onStartPlay} /> */}
        {/* <TouchableOpacity style={{ marginLeft: 20 }} onPress={onStartPlay}>
          <Text style={{ color: "#05375a", fontSize: 10,borderRadius:15,padding: 20  }}>Start ply</Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 300,
          justifyContent: "space-evenly",
          alignItems: "stretch",
        }}
      >
        {/* <Button title="Get Id" onPress={getAnalysis} /> */}
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={onStartPlay}>
          <Text style={{ color: "white", fontSize: 20,backgroundColor:'red',padding: 20,borderRadius:15 }}>Start ply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={getAnalysis}>
          <Text style={{ color: "white", fontSize: 20,backgroundColor:'red',padding: 20,borderRadius:15 }}>Get Id</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={gettranscription}>
          <Text style={{ color: "white", fontSize: 20,backgroundColor:'red',borderRadius:15,padding: 20  }}>Analysis it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// <Button title="Play Sound" onPress={playSound} />
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
