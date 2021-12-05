import * as Animatable from "react-native-animatable";

import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  colors
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DoctorReg } from "./components/doctorReg";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { MyDrawer } from "./drawer.js";
import{ MyDrawer1 } from "./drawer1.js";
import React from "react";
import Signup from "./signUp.js";
import { StatusBar } from "expo-status-bar";
import SwitchSelector from "react-native-switch-selector";

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textinputchange: false,
      username: "",
      password: "",
      secureTextEntry: true,
      data: {},
      switch: "p"
    };
  }

  //   componentDidMount() {
  //    this.gettoken;
  //  }

  //save object
  storeData = async (value) => {
    try {
      // var id= value.user._id
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("Token", value.token);
      await AsyncStorage.setItem("data", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  storeDoctorToken = async (value) => {
    try {
      // var id= value.user._id
      await AsyncStorage.setItem("DoctorToken", value.token);
    } catch (e) {
      // saving error
    }
  };
    storePatientToken = async (value) => {
    try {
      // var id= value.user._id
      await AsyncStorage.setItem("PatientToken", value.token);
    } catch (e) {
      // saving error
    }
  };

  gettoken() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer  ");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    console.log(this.state.username + "pas" + this.state.password);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch("http://192.168.18.48:3000/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.user._id);
        console.log(result.user);
        this.setState({
          data: result
        });
        // result.success==true? this.props.navigation.replace('MyDrawer'):Alert.alert('Username or password is incorrect')

        this.storeData(result);
        // if (result.success == true) {
        //   this.props.navigation.replace("MyDrawer");
        // }

        if (this.state.switch === "p") {
          if (result.success == true) {
            this.storePatientToken(result)
            this.props.navigation.replace("MyDrawer");
          } else {
            Alert.alert("Username or password is incorrect");
          }
        } else if (this.state.switch === "d") {
          if (result.success == true && result.user.doctor) {
            this.storeDoctorToken(result)
            this.props.navigation.navigate("MyDrawer1");
          } else {
            Alert.alert("U are not verfied yet");
          }
        }
      })
      .catch((error) => {
        //   console.log('error',error);
        Alert.alert("Username or password is incorrect");
      });

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

  textinputchange(value) {
    if (value.length != 0) {
      this.setState({
        check_textinputchange: true,
        username: value
      });
    } else {
      this.setState({
        check_textinputchange: false
      });
    }
  }
  secureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.switch == "p" ? "#05375a" : "#4dc2f8" }
        ]}
      >
        <ScrollView>
          <SwitchSelector
            onPress={(value) => this.setState({ switch: value })}
            selectedColor={"white"}
            buttonColor={this.state.switch == "p" ? "#05375a" : "#4dc2f8"}
            borderRadius={0}
            initial={0}
            hasPadding
            options={[
              { label: "Patient", value: "p" }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "Doctor", value: "d" } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
            accessibilityLabel="gender-switch-selector"
          />
          {this.state.switch == "p" ? (
            <React.Fragment>
              <View style={styles.header}>
                <Text style={styles.heade_text}>Welcome to BeFit!</Text>
                <Text style={{ color: "white", marginLeft: 80 }}>
                  you can use this as patient{" "}
                </Text>
              </View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.footer_text}>Username</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#05375a" size={25} />
                  <TextInput
                    placeholder="Input name"
                    onChangeText={(text) => this.textinputchange(text)}
                    style={styles.text_input}
                  ></TextInput>
                  {this.state.check_textinputchange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>
                <Text style={[styles.footer_text, { marginTop: 10 }]}>
                  Password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color="#05375a" size={25} />
                  {this.state.secureTextEntry ? (
                    <TextInput
                      placeholder="Your password"
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                      style={styles.text_input}
                    ></TextInput>
                  ) : (
                    <TextInput
                      placeholder="Your password"
                      secureTextEntry={false}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                      style={styles.text_input}
                    ></TextInput>
                  )}
                  <TouchableOpacity onPress={() => this.secureTextEntry()}>
                    {this.state.secureTextEntry ? (
                      <Feather name="eye-off" color="green" size={20} />
                    ) : (
                      <Feather name="eye" color="green" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <LinearGradient
                    colors={["#4c669f", "#3b5998"]}
                    style={styles.sigIn}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.gettoken();
                      }}
                    >
                      <Text style={styles.text_sign}>Sign In</Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Signup")}
                    style={[
                      styles.sigIn,
                      { borderColor: "#4dc2f8", borderWidth: 1, marginTop: 15 }
                    ]}
                  >
                    <Text style={([styles.text_sign], { color: "#4dc2f8" })}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={styles.header}>
                <Text style={styles.heade_text}>Welcome to BeFit!</Text>
                <Text style={{ color: "white", marginLeft: 80 }}>
                  you can use this as Doctor{" "}
                </Text>
              </View>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.footer_text}>Username</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="#05375a" size={25} />
                  <TextInput
                    placeholder="Input name"
                    onChangeText={(text) => this.textinputchange(text)}
                    style={styles.text_input}
                  ></TextInput>
                  {this.state.check_textinputchange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>
                <Text style={[styles.footer_text, { marginTop: 10 }]}>
                  Password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color="#05375a" size={25} />
                  {this.state.secureTextEntry ? (
                    <TextInput
                      placeholder="Your password"
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                      style={styles.text_input}
                    ></TextInput>
                  ) : (
                    <TextInput
                      placeholder="Your password"
                      secureTextEntry={false}
                      value={this.state.password}
                      onChangeText={(text) => this.setState({ password: text })}
                      style={styles.text_input}
                    ></TextInput>
                  )}
                  <TouchableOpacity onPress={() => this.secureTextEntry()}>
                    {this.state.secureTextEntry ? (
                      <Feather name="eye-off" color="green" size={20} />
                    ) : (
                      <Feather name="eye" color="green" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <LinearGradient
                    colors={["#4dc2f8", "#4dc2f8"]}
                    style={styles.sigIn}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.gettoken();
                      }}
                    >
                      <Text style={styles.text_sign}>Sign In</Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("DoctorReg")}
                    style={[
                      styles.sigIn,
                      { borderColor: "#4dc2f8", borderWidth: 1, marginTop: 15 }
                    ]}
                  >
                    <Text style={([styles.text_sign], { color: "#4dc2f8" })}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </React.Fragment>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 5
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  heade_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10
  },
  footer_text: {
    color: "#05375a",
    fontSize: 18
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5
  },
  text_input: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a"
  },
  button: {
    alignItems: "center",
    marginTop: 50
  },
  sigIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text_sign: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
