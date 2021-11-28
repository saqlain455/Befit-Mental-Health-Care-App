import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
export const TextA=({navigation})=> {
    const [getText, setText] = useState('');
    return (
        <View><Text>test work</Text></View>
    );
  }

  

//   <ScrollView style={{ height: 100 }}>
//   <View style={styles.MainContainer}>
//     <Text style={{ fontSize: 20, margin: 10 }}>
//       Write your Mental Health Problem
//     </Text>
//     <TextInput
//       style={styles.TextInputStyleClass}
//       underlineColorAndroid="transparent"
//       placeholder={'Type Something in Text Area.'}
//       placeholderTextColor={'#9E9E9E'}
//       numberOfLines={10}
//       multiline={true}
//       onSubmitEditing={Keyboard.dismiss}
//       onChangeText={(UserName) => setText(UserName)}
//     />
//     <TouchableOpacity onPress={() => {}}>
//       <View
//         style={{
//           width: '50%',
//           height: 40,
//           backgroundColor: 'blue',
//           alignSelf: 'center',
//           marginTop: 30,
//           borderRadius: 20,
//         }}>
//         <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>
//           Analysis
//         </Text>
//       </View>
//     </TouchableOpacity>
//   </View>
// </ScrollView>
