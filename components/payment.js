import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import stripe from "tipsi-stripe";
const STRIPE_PUBLISH_KEY =
  "pk_test_51K2v8mKvvnZ4BedM3LQ5adViOlaC6vVs8Np0LHSmSs3vrsbRCmVzH3VyTvOCrrqbijZ3i3v4MapyB9ZRTzIe0eLe00PZhO3Juh";
stripe.setOptions({
  publishingKey:
    "pk_test_51K2v8mKvvnZ4BedM3LQ5adViOlaC6vVs8Np0LHSmSs3vrsbRCmVzH3VyTvOCrrqbijZ3i3v4MapyB9ZRTzIe0eLe00PZhO3Juh",
});

const Payment = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [cardNumber, setNumber] = useState("");
  const [expiryMonth, setexpiryMonth] = useState("");
  const [expiryYear, setexpiryYear] = useState("");
  const [cvc, setcvc] = useState("");
  const [country, setcountry] = useState("");
  const [Amount, setAmount] = useState();
  const [doctorId, setdoctorId] = useState("");

  // "card[number]": 4242424242424242,
  // "card[exp_month]": 11,
  // "card[exp_year]": 2023,
  // "card[cvc]": 123,
  useEffect(() => {
    console.log("your id is ", route.params.id);
    setdoctorId(route.params.id);
  }, []);

  const getCardToken = async (
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    country,
    amount
  ) => {
    try {
      //  console.log(name,cardNumber,expiryYear,cvc,country)
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${STRIPE_PUBLISH_KEY}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      if (
        name &&
        cardNumber &&
        expiryMonth &&
        expiryYear &&
        cvc &&
        country &&
        amount
      ) {
        let cardDetails = {
          "card[name]": name,
          "card[number]": cardNumber,
          "card[exp_month]": expiryMonth,
          "card[exp_year]": expiryYear,
          "card[cvc]": cvc,
          "card[address_city]": "",
          "card[address_country]": country,
          "card[address_line1]": "",
          "card[address_line2]": "",
          "card[address_state]": "",
          "card[address_zip]": "",
        };

        let formBody = [];
        for (let property in cardDetails) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(cardDetails[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formBody,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api.stripe.com/v1/tokens",
          requestOptions
        );
        const result = await response.json();
        Alert.alert(result.id);
        if (result.id) {
          doCharge();
        } else {
          Alert.alert("Your Card is not verfied!");
        }
        console.log("Your token");
        console.log(result);
      } else {

        Alert.alert("All fields are required ")
      }
      // return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const doCharge = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: Amount,
      token: "",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(
      "http://192.168.100.23:3000/patient/processPayment",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        Alert.alert("Thanku! Your payment has been  processed");
        navigation.navigate("AppointmentDate", { id: route.params.id });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // const handlePress = async() => {
  //   try {
  //     const paymentMethod = await stripe.paymentRequestWithCardForm({
  //       card : {
  //         number : '4000002500003155',
  //         cvc : '123',
  //         expMonth : 11,
  //         expYear : 2020
  //       }
  //     })
  //     console.log(`paymentMethod`, paymentMethod)
  //   } catch (e) {
  //     // Handle error
  //     console.log(`e `, e )
  //   }
  // };
  return (
    <ScrollView style={{ marginTop: 50, marginBottom: 50 }}>
      <View
        tyle={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, alignContent: "center" }}>
          Make a payment
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 20 }}>Card Name</Text>
        <TextInput
          placeholder="Visa"
          onChangeText={(text) => {
            setName(text);
          }}
        ></TextInput>
      </View>

      <View>
        <Text style={{ fontSize: 20 }}>cardNumber</Text>
        <TextInput
          placeholder="4242424242424242"
          onChangeText={(text) => {
            setNumber(text);
          }}
          maxLength={16}
          keyboardType="numeric"
        ></TextInput>
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>cvc</Text>
        <TextInput
          placeholder="123"
          onChangeText={(text) => {
            setcvc(text);
          }}
          maxLength={3}
          keyboardType="numeric"
        ></TextInput>
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>expiryMonth</Text>
        <TextInput
          placeholder="12"
          onChangeText={(text) => {
            setexpiryMonth(text);
          }}
          maxLength={2}
          keyboardType="numeric"
        ></TextInput>
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>expiryYear</Text>
        <TextInput
          placeholder="2022"
          onChangeText={(text) => {
            setexpiryYear(text);
          }}
          maxLength={4}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <View>
        <Text style={{ fontSize: 20 }}>country</Text>
        <TextInput
          onChangeText={(text) => {
            setcountry(text);
          }}
        ></TextInput>
      </View>
      <View>
        <Text style={{ fontSize: 20 }}>Amount</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => {
            setAmount(text);
          }}
        ></TextInput>
      </View>

      <Button
        title="Press"
        onPress={() =>
          // getCardToken(name, cardNumber, expiryMonth, expiryYear, cvc, country,Amount)
          //  doCharge()
          getCardToken(
            name,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvc,
            country,
            Amount
          )
        }
      >
        Payment
      </Button>
    </ScrollView>
  );
};

export { Payment };

// import React from "react";
// import { View } from "react-native";
// import { Button } from "react-native-paper";
// import stripe from "tipsi-stripe";
// stripe.setOptions({
//   publishingKey:
//     "pk_test_51K2v8mKvvnZ4BedM3LQ5adViOlaC6vVs8Np0LHSmSs3vrsbRCmVzH3VyTvOCrrqbijZ3i3v4MapyB9ZRTzIe0eLe00PZhO3Juh",
// });

//const STRIPE_PUBLISH_KEY ="pk_test_51K2v8mKvvnZ4BedM3LQ5adViOlaC6vVs8Np0LHSmSs3vrsbRCmVzH3VyTvOCrrqbijZ3i3v4MapyB9ZRTzIe0eLe00PZhO3Juh";

// const Payment = () => {

//   const getCardToken = async (
//     name,
//     cardNumber,
//     expiryMonth,
//     expiryYear,
//     cvc,
//     country,
// ) => {
//     try {
//         let myHeaders = new Headers();
//         myHeaders.append('Authorization', `Bearer ${STRIPE_PUBLISH_KEY}`);
//         myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

//         let cardDetails = {
//             'card[name]': 'Visa (debit)',
//             'card[number]': 4000056655665556,
//             'card[exp_month]': 12,
//             'card[exp_year]': 2024,
//             'card[cvc]': 123,
//             'card[address_city]': '',
//             'card[address_country]': '',
//             'card[address_line1]': '',
//             'card[address_line2]': '',
//             'card[address_state]': '',
//             'card[address_zip]': '',
//         };

//         let formBody = [];
//         for (let property in cardDetails) {
//             let encodedKey = encodeURIComponent(property);
//             let encodedValue = encodeURIComponent(cardDetails[property]);
//             formBody.push(encodedKey + '=' + encodedValue);
//         }
//         formBody = formBody.join('&');

//         let requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formBody,
//             redirect: 'follow',
//         };

//         const response = await fetch(
//             'https://api.stripe.com/v1/tokens',
//             requestOptions,
//         );
//         const result = await response.json();
//         console.log(result)

//         return result;
//     } catch (error) {
//       console.log("oh no  error",error)
//         throw error;
//     }
// };

//   const handlePress = async() => {
//     const token = await stripe.paymentRequestWithCardForm({
//       prefilledInformation: {
//         billingAddress: {
//           name: "Enappd Store",
//           line1: "Canary Place",
//           line2: "3",
//           city: "Macon",
//           state: "",
//           country: "Estonia",
//           postalCode: "31217",
//           email: "admin@enappd.com",
//         },
//       },
//     });
//     console.log(`token`, token)
//   };
//   return (
//     <View>
//       <Button title="Press" onPress={getCardToken}>Hey</Button>
//     </View>
//   );
// };

// export { Payment };
