import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
// import stripe from "tipsi-stripe";
// stripe.setOptions({
//   publishingKey:
//     "pk_test_51K2v8mKvvnZ4BedM3LQ5adViOlaC6vVs8Np0LHSmSs3vrsbRCmVzH3VyTvOCrrqbijZ3i3v4MapyB9ZRTzIe0eLe00PZhO3Juh",
// });

const Payment = () => {
  
  const handlePress = async() => {
    // const token = await stripe.paymentRequestWithCardForm({
    //   prefilledInformation: {
    //     billingAddress: {
    //       name: "Enappd Store",
    //       line1: "Canary Place",
    //       line2: "3",
    //       city: "Macon",
    //       state: "",
    //       country: "Estonia",
    //       postalCode: "31217",
    //       email: "admin@enappd.com",
    //     },
    //   },
    // });
    // console.log(`token`, token)
  };
  return (
    <View>
      <Button title="Press" onPress={handlePress}>Hey</Button>
    </View>
  );
};

export { Payment };
