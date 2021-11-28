import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView,Alert,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart, ProgressChart,
  ContributionGraph,
  StackedBarChart,
  } from 'react-native-chart-kit';
const Tab = createMaterialTopTabNavigator();


  
export const Report=(props)=> {
  
  const [getResult,setResult]=React.useState( {
    "anger": 0,
    "boredom": 0,
    "fear": 0,
    "hate": 0,
    "insomnia": 0,
    "sadness": 0,
  });
  const [isloading,setloading]=React.useState(true);
  useEffect(() => {
    console.log("my props")
    console.log(props.route.params.Cresult)
   setResult(props.route.params.Cresult)
  }, [])

  useEffect(() => {
    console.log("now object is cange")
    console.log(getResult)
     setloading(false)

  }, [getResult])

  return (
      isloading===true ? <View style={styles.loading}> 
      <ActivityIndicator size="large" color="blue" />
     </View>:
      <ScrollView>

      <View style={styles.container}>
      <View>
      <BarChart data={{
      labels: [ 'anger',
      'boredom',
      'fear',
      'hate',
      'insomnia',
      'sad',
      ],
      datasets: [
      {
      data: [getResult.anger*100, getResult.boredom*100,getResult.fear*100, getResult.hate*100, getResult.insomnia*100, getResult.sadness*100],
      },
      ],
      }}
      width={Dimensions.get('window').width}
      height={400}
      yAxisLabel={'% '} chartConfig={{
      backgroundColor: 'white',
      backgroundGradientFrom: 'white',
      backgroundGradientTo: '#99f7e3',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
      borderRadius: 16,
      },
      }}
      style={{ marginVertical: 8,
      borderRadius: 16,
      }}
      />
      </View>
      </View>
      
      </ScrollView>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30, backgroundColor: '#ecf0f1',
    paddingRight:50
    },
    });