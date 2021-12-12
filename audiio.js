import React,{useEffect,useState} from "react";
import {View,Button} from 'react-native'
import AudioRecorderPlayer, {
 AVEncoderAudioQualityIOSType,
 AVEncodingOption,
 AudioEncoderAndroidType,
 AudioSet,
 AudioSourceAndroidType,
}  from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
import { PermissionsAndroid } from 'react-native';
import * as FileSystem from 'expo-file-system';

const AudioRecor = () => {

  const [audioInfo,setaudioInfo]=useState({    
        currentPositionSec: undefined,
        currentDurationSec: undefined,
        playTime:undefined,
        duration: undefined,
    })

    // useEffect(()=>{
    //   console.log(audioInfo)
    // },[audioInfo])
  useEffect(()=>{
    permiss()
  },[])

   const permiss=async()=>{
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
    
        console.log('write external stroage', grants);
    
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  const onStartRecord = async () => {

    const result = await audioRecorderPlayer.startRecorder( );
    audioRecorderPlayer.addRecordBackListener((e) => {
      setaudioInfo({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log(result);
  };
  
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setaudioInfo({
      recordSecs: 0,
    });
    const info = await FileSystem.getInfoAsync(result);
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log('Recording stopped and stored at', info);
    console.log(result);
  };
  
  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    await audioRecorderPlayer.setVolume(1.0)
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
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return <View>
      <Button title="RECORD" onPress={onStartRecord}>
      </Button>
      <Button title="StopRecord" onPress={onStopRecord}>
      </Button>
      <Button title="Play" onPress={onStartPlay}>
      </Button>
      <Button title="Pause" onPress={onPausePlay}>
      </Button>
      <Button title="StopPlay" onPress={onStopPlay}>
      </Button>
  </View>
};

export default AudioRecor