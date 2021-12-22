// import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import * as ImagePicker from "react-native-image-picker"
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export const Profile = (props) => {
  const [getImg, setimg] = useState(
    "https://th.bing.com/th/id/R.9e84aed5140433e6eb88fecb47436d6d?rik=CzZ%2bjbNECPYgwg&pid=ImgRaw&r=0"
  );
  // const [getdata, setdata] = useState({
  //   user: {
  //     name: "",
  //     email: undefined,
  //     phoneNo: undefined,
  //     cnic: undefined,
  //     address: undefined,
  //     gender: undefined,
  //     dob: undefined
  //   }
  // });
  const [getdata, setdata] = useState({
    name: "",
    email: "",
    phoneNo: "",
    cnic: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [loading, setloading] = useState(false);
  async function btoa(input) {
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = "";
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || ((map = "="), idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
    ) {
      charCode = str.charCodeAt((idx += 3 / 4));
      if (charCode > 0xff) {
        throw new InvalidCharacterError(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }
      block = (block << 8) | charCode;
    }
    return await output;
  }
  async function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return await btoa(binary);
  }

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  const updatee = async () => {
    var myHeaders = new Headers();
    var t, id;
    var data = await AsyncStorage.getItem("data");
    var token = await AsyncStorage.getItem("Token");
    const d = JSON.parse(data);
    id = d.user._id;
    t = token;

    console.log("ID and token is");
    console.log(t + "token and id is " + id);
    myHeaders.append("Authorization", "Bearer " + t);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(getdata);
    console.log("UPdated datatata  is", raw);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://192.168.18.48:3000/patient/updateProfile/" + id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("HI bro updated data is there");
        console.log(result);
         Alert.alert("Your profile data has updated");
      })
      .catch((error) => console.log("error", error));
  };

  //   Tomorrorw i will fetch data from api by user id that is place in asyncStorage

  const fetchUserData = async () => {
    setloading(true);
    var data = await AsyncStorage.getItem("data");
    if (data) {
      console.log("name is here!");
      const d = JSON.parse(data);
      console.log(d.user.username);
      console.log(d);
      await setdata({ ...getdata, name: d.user.username });
      console.log("data is here!");
      console.log(getdata);
      if (getdata.name==="" && !getdata.email==="") {
        console.log("hi")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + d.token);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          "http://192.168.18.48:3000/patient/getownData/" + d.user._id,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            getApidata(result);
          })
          .catch((error) => {
            console.log("error", error);
            setloading(false);
          });
      }
      else{
        setloading(false);
      }
    } else {
      console.log("Ohh wrong bro! user data is not given ");
    }
    // console.log(JSON.parse(jsonValue))
  };
  async function getApidata(result) {
    console.log(result);
    console.log("get api data call");
    console.log(result.img.data.data);
    const base64Flag = "data:image/jpeg;base64,";
    if (result.img.data.data) {
      setloading(false);
      console.log("Image is there");
      const imageStr = await arrayBufferToBase64(result.img.data.data);
      setimg(base64Flag + imageStr);
      setdata(result);
    } else {
      console.log("there is not image");
      setdata(result);
      setloading(false);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   // let base64Img = `data:image;base64,${result.base64}`;
  //   // Alert.alert(base64Img);
  //   if (!result.cancelled) {
  //     setimg(result.uri);
  //     handleupload(result.uri);
  //     //   console.log(result.uri)
  //   }
  // };


  const pickImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        setimg(response.uri);
        handleupload(response.uri);
      }
    });

  }






  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow"
  //   };

  //   fetch(
  //     "http://192.168.18.48:3000/patient/Order/60bf5057874ad732e888afa1",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       //     console.log(result.img.data.data)

  //       var base64Flag = "data:image/jpeg;base64,";
  //       var imageStr = arrayBufferToBase64(result.img.data.data);
  //       setimg(base64Flag + imageStr);
  //       //          console.log(imageStr)
  //     })
  //     .catch((error) => console.log("error", error));

  //   // fetch('http://192.168.1.187:3000/patient/Order/60bf5057874ad732e888afa1',{
  //   //   method:"get"
  //   // })
  //   //     .then((res) =>{

  //   //       res.json()
  //   //     })
  //   //     .then((doc) => {
  //   //       console.log(doc)
  //   //         var base64Flag = 'data:image/jpeg;base64,';
  //   //         var imageStr = arrayBufferToBase64(doc.img.data.data);
  //   //         setimg(base64Flag + imageStr)
  //   //     }).catch(error => {
  //   //          console.log('error',error);
  //   //         // Alert.alert(res)
  //   //        });
  // }, []);

  // const handleupload = (image) => {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "healthApp");
  //   data.append("cloud_name", "imgload");
  //   fetch("https://api.cloudinary.com/v1_1/imgload/image/upload", {
  //     method: "post",
  //     body: data
  //   })
  //     .then((res) => res.json)
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  const handleupload = async (imageofUser) => {
    var photo = {
      uri: imageofUser,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    var data = await AsyncStorage.getItem("data");
    var token = await AsyncStorage.getItem("Token");
    const d = JSON.parse(data);
    id = d.user._id;
    //use formdata
    var formData = new FormData();
    //append created photo{} to formdata
    formData.append("filesent", photo);
    //data.append("description", "2 panadol");
    fetch("http://192.168.18.48:3000/patient/updateProfilePic/" + d.user._id, {
      method: "put",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // var base64Flag = "data:image/jpeg;base64,";
        // var imageStr = arrayBufferToBase64(result.img.data.data);
        // setimg(base64Flag + imageStr);
        Alert.alert("Picture has updated");
      })
      .catch((error) => console.log("error", error));
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size={300} color="skyblue" />
      <Text>Loading Data ...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            height: 200,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 150,
          }}
        >
          <ImageBackground
            source={{
              uri: getImg,
            }}
            style={{ height: 150, width: 150 }}
            imageStyle={{ borderRadius: 100 }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                <MaterialCommunityIcons
                  name="camera"
                  size={50}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 40 }}>
          <View style={styles.input}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              value={getdata.name}
              style={styles.textinput}
              onChangeText={(value) => {
                setdata({ ...getdata, name: value });
              }}
            ></TextInput>
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons name="email" size={20} />
            <TextInput
              value={getdata.email}
              onChangeText={(value) => {
                setdata({ ...getdata, email: value });
              }}
              style={styles.textinput}
            >
              {/* {getdata.email ? getdata.email : ""} */}
            </TextInput>
          </View>
          <View style={styles.input}>
            <FontAwesome name="phone" size={20} />
            <TextInput
              value={getdata.phoneNo}
              onChangeText={(value) => {
                setdata({ ...getdata, phoneNo: value });
              }}
              style={styles.textinput}
            >
              {/* {getdata.phoneNo ? getdata.phoneNo : ""} */}
            </TextInput>
          </View>
          <View style={styles.input}>
            <Ionicons name="location" size={20} />
            <TextInput
              value={getdata.address}
              onChangeText={(value) => {
                setdata({ ...getdata, address: value });
              }}
              style={styles.textinput}
            >
              {/* {getdata.address ? getdata.address : ""} */}
            </TextInput>
          </View>
          <View style={styles.input}>
            <Text>cnic</Text>
            <TextInput
              value={getdata.cnic}
              onChangeText={(value) => {
                setdata({ ...getdata, cnic: value });
              }}
              style={styles.textinput}
            >
              {/* {getdata.cnic ? getdata.cnic : ""} */}
            </TextInput>
          </View>
          <View style={styles.input}>
            <Fontisto name="date" size={20} />
            <TextInput
              placeholder="dd-mm-yy"
              value={getdata.dob}
              onChangeText={(value) => {
                setdata({ ...getdata, dob: value });
              }}
              style={styles.textinput}
            >
              {/* {getdata.dob ? getdata.dob : "MM/DD/YY"} */}
            </TextInput>
          </View>
          <View style={styles.button}>
            <LinearGradient
              colors={["#4dc2f8", "#4dc2f8"]}
              style={styles.sigIn}
            >
              <TouchableOpacity onPress={updatee}>
                <Text>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

//   <Image style={{ height: '70%', width: '100%' }} source={{ uri: getImg }} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 8,
  },
  input: {
    height: 50,
    width: "80%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  sigIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 100,
  },
  textinput: {
    height: "100%",
    width: "100%",
    marginLeft: 50,
  },
});
