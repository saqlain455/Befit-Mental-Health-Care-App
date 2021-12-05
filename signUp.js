import * as Animatable from 'react-native-animatable';

import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      check_textinputchange:false,
      username:'',
      password:'',
      secureTextEntry:true,
      role:''
    }
  }

//   componentDidMount() {
//     this.gettoken();
//  }


 token(){
  let u=this.state.username
  let p=this.state.password
  let r=this.state.role
  console.log(u)
  console.log(p)
  console.log(r)
 }
 

   gettoken(){
    let u=this.state.username
    let p=this.state.password
    console.log(u)
    console.log(p)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer  ");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"username":this.state.username,"password":this.state.password});
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("http://192.168.18.48:3000/users/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        Alert.alert(result.status);
      })
      .catch((error) => console.log("error", error));


  
  //  return fetch(`http://10.0.2.2:3000/users/signup`, {
  //    method: "POST",
  //    Body:JSON.stringify({
  //      'username': 'malikjee',
  //      'password': '123456'
  //  }),
  //    // "headers": {
  //    //     'Authorization': `Bearer {token}`
  //    // }
  //  })
  //  .then(response => response.json())
  //      .then(responseJson => {
  //        console.log(responseJson);
  //      })
  //        .catch(error => {
  //          console.error(error);
  //        })
 }

 textinputchange(value){
  if(value.length!=0){
    this.setState({
      check_textinputchange:true,
      username:value
    })
  }
  else{
    this.setState({
      check_textinputchange:false
    })
  }
 }
 secureTextEntry(){
   this.setState({
    secureTextEntry:!this.state.secureTextEntry
   })
 }
 setRole(value){
  this.setState({
    role:value
   })
   console.log("value.."+value)
 }
render() {
  return (
    <View style={styles.container}>   
      <View style={styles.header} >
        <Text style={styles.heade_text}>Welcome to Sign up!</Text>
      </View>
      <Animatable.View
      animation="fadeInUpBig"
      style={styles.footer}>
        <Text style={styles.footer_text}>Username</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color='#05375a'
            size={25}
          />
          <TextInput placeholder="Input name" onChangeText={(text)=>this.textinputchange(text)} style={styles.text_input}></TextInput>
          {
            this.state.check_textinputchange ?
            <Feather name='check-circle' color='green' size={20}/>
            :null
          }
        

        </View>
        <Text style={[styles.footer_text,{marginTop:10}]} >Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color='#05375a'
            size={25}
          />
          {
            this.state.secureTextEntry?
          <TextInput placeholder="Your password" secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} style={styles.text_input}></TextInput>
          :
          <TextInput placeholder="Your password" secureTextEntry={false} value={this.state.password} onChangeText={(text)=>this.setState({password:text})} style={styles.text_input}></TextInput>
    
        }
          <TouchableOpacity
          onPress={()=>this.secureTextEntry()}
          >
          {
            this.state.secureTextEntry? 
            <Feather name='eye-off' color='green' size={20}/>:    
            <Feather name='eye' color='green' size={20}/>
          }
        
          </TouchableOpacity>
        </View>
        
        <View style={styles.button}>
        <TouchableOpacity
         onPress={()=>{this.gettoken()}} 
         style={[styles.sigIn,{borderColor:'#4dc2f8',borderWidth:1, marginTop:15 }]}
         >
         <LinearGradient colors={['#4c669f', '#3b5998']} style={styles.sigIn}>
         <Text style={styles.text_sign}>Sign Up</Text>
       </LinearGradient>
        
        </TouchableOpacity>

        </View>
      </Animatable.View>     
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a'
  },
  header:{
    flex:1,
    justifyContent:'flex-end',
    paddingHorizontal:20,
    paddingBottom:50   
  },
  footer:{
    flex:4.5,
    backgroundColor:'white',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingHorizontal:20,
    paddingVertical:30    
  },
  heade_text:{
    color:'white',
    fontWeight:'bold',
    fontSize:30    
  },
  footer_text:{
    color:'#05375a',
    fontSize:18
  },
  action:{
    flexDirection:'row',
    marginTop:10,
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2',
    paddingBottom:5
  },
  text_input:{
    flex:1,
    paddingLeft:10,
    color:'#05375a'
  },
  button:{
    alignItems:'center',
    marginTop:50
  },
  sigIn:{
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10    
  },
  text_sign:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
});
