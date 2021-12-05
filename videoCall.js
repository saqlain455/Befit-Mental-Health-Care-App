import React,{useEffect} from "react";
import {View} from 'react-native'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
  } from 'react-native-webrtc';
import { joinRoom } from "./store/actions/videoActions";
import {connect} from 'react-redux'
 const VideoCall = () => {
    useEffect(()=>{

        let isFront = true;

        mediaDevices.enumerateDevices().then((sourceInfos) => {
          console.log(sourceInfos);
          let videoSourceId;
          for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (
              sourceInfo.kind == "videoinput" &&
              sourceInfo.facing == (isFront ? "front" : "environment")
            ) {
              videoSourceId = sourceInfo.deviceId;
            }
          }
          mediaDevices
            .getUserMedia({
              audio: true,
              video: {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: isFront ? "user" : "environment",
                deviceId: videoSourceId,
              },
            })
            .then((stream) => {
              // Got stream!
              console.log(stream)
            })
            .catch((error) => {
              // Log error
            });
        });

    },[])
    return (
        <View>
            
        </View>
    )
}

const mapStateToProps=({video})=>({
    video,
})


export default connect(mapStateToProps,{joinRoom})(VideoCall);
