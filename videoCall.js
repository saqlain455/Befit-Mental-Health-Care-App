import React, { useEffect } from "react";
import { View, ScrollView, Text,Dimensions } from "react-native";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
import { joinRoom } from "./store/actions/videoActions";
import { connect } from "react-redux";

const {width, height} = Dimensions.get('window');
const VideoCall = (props) => {
  useEffect(() => {
    let isFront = true;

    mediaDevices.enumerateDevices().then((sourceInfos) => {
      // console.log(sourceInfos);
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
          props.joinRoom(stream);
          //   console.log(stream);
        })
        .catch((error) => {
          // Log error
        });
    });
  }, []);
  const { streams,remoteStreams } = props.video;
    console.log("Other stream")
    console.log(streams)
    console.log(props.video.myStream)
    console.log("end stream")
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.5,
            borderColor: 'yellow',
            borderWidth: 4,
          }}>
          {props.video.myStream ? (
            <RTCView
              streamURL={props.video.myStream.toURL()}
              style={{width, height: height * 0.4}}
            />
          ) : null}
        </View>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <ScrollView horizontal style={{padding: 10}}>
            {/* <>
              {streams.length > 0 ? (
                <>
                  {streams.map((stream, index) => (
                    <View
                      key={index}
                      style={{
                        width: 280,
                        backgroundColor: 'red',
                        borderWidth: 1,
                        borderColor: '#fff',
                        marginRight: 10,
                        padding: 5,
                      }}>
                      <RTCView
                        streamURL={stream.toURL()}
                        style={{width: 180, height: height * 0.4}}
                      />
                    </View>
                  ))}
                </>
              ) : null}
            </> */}

            <>
              {remoteStreams ? (
                remoteStreams.length > 0 ? (
                  <>
                    {remoteStreams.map((stream, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            width: 280,
                            backgroundColor: 'blue',
                            borderWidth: 1,
                            borderColor: '#fff',
                            marginRight: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <RTCView
                            streamURL={stream.toURL()}
                            style={{width: 120, height: height * 0.4}}
                          />
                        </View>
                      );
                    })}
                  </>
                ) : null
              ) : null}
            </>
          </ScrollView>
        </View>
      </View>
  );
};

const mapStateToProps = ({ video }) => ({
  video,
});

export default connect(mapStateToProps, { joinRoom })(VideoCall);
