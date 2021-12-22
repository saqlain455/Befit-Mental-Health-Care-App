import { ADD_STREAM, MY_STREAM, ADD_REMOTE_STREAM,Remove_STREAM } from "./types";
import IO from "socket.io-client";
import Peer from "react-native-peerjs";

// Api uri
export const API_URI = `http://192.168.18.48:5000/`;

//socket config
export const socket = IO("http://192.168.18.48:5000", {
  forceNew: true,
});

let my_id = "";

export const joinRoom = (stream,appointmentId) => async (dispatch) => {
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
  const roomID = appointmentId
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
  socket.on("user-disconnected", (id) => {
    console.log("leave client");
    console.log("Disconnect the user")
      console.log('execute destroy')
      console.log(id)
      peerServer.destroy();
  });
  
  peerServer.on('disconnected', function() { 
    console.log("peer disconnect")
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


export const disconnect = (roomID) => async (dispatch) => {
  dispatch({ type: Remove_STREAM, payload: [] });
  console.log("Disconnet it",my_id)
  const id=my_id

 // const roomID='adsjfdlfjj111fdlfljffffffffhbjhdhdhjdlfs'
  socket.emit("leave-room", {id, roomID });
  // console.log("Disconnect the user")
  // peerServer.disconnect();
};

// i start now fron this file 