import  {
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAMSTREAM
} from './types'
import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

// Api uri
export const API_URI=`http://192.168.18.48:5000/`

//socket config
export const socket=IO("http://192.168.18.48:3000",{
    forceNew:true
})

socket.on('connection',()=>{
    console.log('Connected client')
})


export const joinRoom=()=> async(dispatch)=>{

}

function connectToNewUser(){

}