import  {
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAM
} from './types'
import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

// Api uri
export const API_URI=`http://192.168.100.23:5000/`

//socket config
export const socket=IO("http://192.168.100.23:5000",{
    forceNew:true
})




export const joinRoom=(stream)=> async(dispatch)=>{
    const peerServer=new Peer(undefined,{
        host:"192.168.100.23",
        secure:false,
        path:'/mypeer',
        port:'5000'
    })
    
   
    dispatch({type:MY_STREAM,payload:stream});
    
    peerServer.on("error",(error)=>{
        console.log('error',error)
    })
    
    peerServer.on('open',(userId)=>{
        const roomID="adsjfdlfjj111fdlfljffffffffhbjhdhdhjdlfs";
        console.log(roomID,userId)
        console.log("Open connection")
         socket.emit('join-room',{userId,roomID})
    
    })

    socket.on('connection',()=>{
        console.log('Connected client')
    })
    
 

    socket.on("user-connected",(userId)=>{
        console.log("on user connected")
        console.log(userId)
        connectToNewUser(userId,stream)
    })

    peerServer.on('call',(call)=>{
        call.answer(stream)
        call.on('stream',(stream)=>{
            dispatch({type:ADD_STREAM,payload:stream})
        })
    })
    async function connectToNewUser(userId,stream){
        const call =await peerServer.call(userId,stream)
    
        call.on('stream',(remoteStream)=>{
            if(remoteStream){
                dispatch({type:ADD_REMOTE_STREAM,payload:remoteStream})
    
            }
        })
    }
    
}
