import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
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
import Feather from "react-native-vector-icons/Feather";
import { joinRoom, disconnect } from "./store/actions/videoActions";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const VideoCall = (props) => {
  useEffect(() => {
    let isFront = true;
    console.log("apppointid", props.route.params.appointmentId);

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
          console.log(sourceInfos);
          console.log(videoSourceId);
        }
      }
      console.log(mediaDevices);

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 330,
            height: 330,
            frameRate: 10,
            facingMode: isFront ? "user" : "environment",
            deviceId: videoSourceId,
          },
        })
        .then((stream) => {
          // Got stream!
          props.joinRoom(stream, props.route.params.appointmentId);
          console.log(stream);
        })
        .catch((error) => {
          console.log(error);
          // Log error
        });
    });
  }, []);

  const { streams, remoteStreams } = props.video;
  // console.log("Other stream")
  // console.log(streams)
  // console.log(props.video.myStream)
  // console.log("end stream")
  console.log(`streams.length`, streams.length);
  return (
    <ScrollView style={{ display: "flex", flex: 1, padding: 10 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 330,
          borderColor: "yellow",
          borderWidth: 4,
        }}
      >
        {props.video.myStream ? (
          <RTCView
            streamURL={props.video.myStream.toURL()}
            style={{ width: 80, height: 330 }}
          />
        ) : null}
      </View>
      <View style={{}}>
        <View
          style={{ display: "flex", flex: 1, paddingTop: 10, width: "100%" }}
        >
          {streams.length > 0
            ? streams.map((stream, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 280,
                      backgroundColor: "red",
                      borderWidth: 1,
                      borderColor: "#fff",
                      marginRight: 10,
                      padding: 5,
                    }}
                  >
                    <RTCView
                      streamURL={stream.toURL()}
                      style={{ width, height: height * 0.4 }}
                    />
                  </View>
                );
              })
            : null}

          <View>
            {remoteStreams.length > 0 ? (
              <View
                style={{
                  backgroundColor: "blue",
                  borderWidth: 1,
                  borderColor: "#fff",
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: height * 0.4,
                }}
              >
                <RTCView
                  streamURL={remoteStreams[0].toURL()}
                  style={{ width: 80, height: 330 }}
                />
              </View>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "23%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            marginLeft: 130,
            borderRadius: 600,
            borderWidth: 2,
            height: 80,
            borderColor: '#fff',
          }}
          onPress={() => props.disconnect(props.route.params.appointmentId)}
        >
        <Feather name="phone-off" color="white" size={25} />
        </TouchableOpacity>
        {/* <Button title="Disconnect" onPress={()=>props.disconnect(props.route.params.appointmentId)}></Button> */}
      </View>
    </ScrollView>
  );
  return null;
};

const mapStateToProps = ({ video }) => ({
  video,
});

export default connect(mapStateToProps, { joinRoom, disconnect })(VideoCall);
