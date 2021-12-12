import { ADD_STREAM, MY_STREAM, ADD_REMOTE_STREAM } from "./types";
import IO from "socket.io-client";
import Peer from "react-native-peerjs";

// Api uri
export const API_URI = `http://192.168.18.48:5000/`;

//socket config
export const socket = IO("http://192.168.18.48:5000", {
  forceNew: true,
});

let my_id = "";
export const joinRoom = (stream) => async (dispatch) => {
  dispatch({ type: MY_STREAM, payload: stream });
  const peerServer = new Peer(undefined, {
    host: "192.168.18.48",
    secure: false,
    path: "/mypeer",
    port: "5000",
  });
  peerServer.on("error", (error) => {
    console.log("error", error);
  });
  const roomID = "adsjfdlfjj111fdlfljffffffffhbjhdhdhjdlfs";
  peerServer.on("open", (userId) => {
    console.log(`userId`, userId);
    dispatch({
      type: "MY_ID",
      payload: userId,
    });
    my_id = userId;
    socket.emit("join-room", { userId, roomID });
  });

  socket.on("connection", () => {
    console.log("Connected client");
  });
  socket.on("disconnect", () => {
    console.log("leave client");
  });

  socket.on("user-connected", (userId) => {
    console.log("conected user", userId);
    connectToNewUser(userId, stream, dispatch, peerServer);
  });

  peerServer.on("call", async (call) => {
    console.log("recieved a call", call.peer);
    if (call.peer !== my_id) {
      //recieve calls
      await call.answer(stream);
      await call.on("stream", (stream) => {
        dispatch({ type: ADD_STREAM, payload: stream });
      });
      
    }
  });
};
const connectToNewUser = async (userId, stream, dispatch, peerServer) => {
  // call others
  const call = await peerServer.call(userId, stream);
  call.on("stream", (remoteStream) => {
    if (remoteStream) {
      dispatch({ type: ADD_STREAM, payload: remoteStream });
    }
  });
};


export const leaveRoom=()=>{
    socket.emit("leave-room", { my_id, roomID });
}