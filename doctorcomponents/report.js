import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const Tab = createMaterialTopTabNavigator();

export const Report = (props) => {
  // const [getResult,setResult]=React.useState( {
  //   "anger": 0,
  //   "boredom": 0,
  //   "fear": 0,
  //   "hate": 0,
  //   "insomnia": 0,
  //   "sadness": 0,
  // });
  const [getResult, setResult] = React.useState({
    anger: 0,
    fear: 0,
    hate: 0,
    insomnia: 0,
    sadness: 0,
    socialMedia: 0,
  });

  const [isloading, setloading] = React.useState(true);
  useEffect(() => {
    console.log("my props");
    console.log(props.route.params.item);
    setResult(props.route.params.item.reportData);
  }, []);

  useEffect(() => {
    console.log("now object is cange");
    console.log(getResult);
     setloading(false);
  }, [getResult]);

  return isloading === true ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <BarChart
            data={{
              labels: [
                "anger",
                "fear",
                "hate",
                "insomnia",
                "sadness",
                " SocialMedia",
              ],
              datasets: [
                {
                  data: [
                    getResult.anger * 100,
                    getResult.fear * 100,
                    getResult.hate * 100,
                    getResult.insomnia * 100,
                    getResult.sadness * 100,
                    getResult.socialMedia * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={400}
            yAxisLabel={"% "}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "#99f7e3",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </View>
      <View>
  <LineChart
    data={{
      labels: [                "anger",
      "fear",
      "hate",
      "insomnia",
      "sadness",
      "socialMedia",],
      datasets: [
        {
          data: [
            getResult.anger * 100,
            getResult.fear * 100,
            getResult.hate * 100,
            getResult.insomnia * 100,
            getResult.sadness * 100,
            getResult.socialMedia * 100,
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="% "
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    paddingRight: 50,
  },
});
