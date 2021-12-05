import React,{useState,useEffect} from "react";
import {
    Button,
    Image,
    View
  } from "react-native";
const Blogitem = ({ item }) => {
  const [getImg, setimg] = useState("");

  function btoa(input) {
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
    return output;
  }
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }

  const mapfun = (result) => {
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = arrayBufferToBase64(item.img.data.data);

    setimg(base64Flag + imageStr);
    return base64Flag + imageStr;
  };

  useEffect(() => {
    mapfun();
  }, []);

  return (
    <View style={{ paddingTop: 50 }}>
      <Image
        source={{
          uri: getImg?getImg: "https://th.bing.com/th/id/R.9e84aed5140433e6eb88fecb47436d6d?rik=CzZ%2bjbNECPYgwg&pid=ImgRaw&r=0",
        }}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
          marginHorizontal: 50,
        }}
      />
    </View>
  );
};
export default Blogitem;
