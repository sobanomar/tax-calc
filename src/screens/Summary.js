import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { LineChart } from "react-native-chart-kit";
import Heading from "../components/Heading";
import { Button, DataTable } from "react-native-paper";
import { useMyContext } from "../context/DataContext";
import ATRGraphChart from "../components/ATRGraphChart";

import Icon from "react-native-vector-icons/FontAwesome";

const Summary = ({ navigation }) => {
  const [data, setData] = useState([]);
  const atrValue = useRef([]);
  const propValue = useRef([]);
  const aggregatedPropValues = useRef([]);
  const aggregatedAtrValues = useRef([]);

  const { inputData, setInputData, chartData } = useMyContext();

  useEffect(() => {
    calculateATR();
    // return () => {
    //   atrValue.current = [];
    //   propValue.current = [];
    // };
  }, [inputData]);

  const calculateATR = async () => {
    // console.log("InputData: ", inputData);
    const tempATR = [];
    const tempProp = [];
    const tempAggregatedValues = [];
    inputData &&
      inputData.map((item) => {
        tempATR.push((item.preferred_tax.value / item.prop_val.value) * 100);
        tempProp.push(item.prop_val.value);
        atrValue.current = tempATR;
        propValue.current = tempProp;
      });

    // Aggregating prop values
    for (let i = 0; i < propValue.current.length; i += 3) {
      const group = propValue.current.slice(i, i + 3); // Extract a group of four data points
      const sum = group.reduce((total, value) => total + value, 0); // Calculate sum
      const average = sum / group.length; // Calculate average
      const scientificNotation = average.toExponential();
      const [coefficient, exponent] = scientificNotation.split("e");
      const formattedNumber =
        parseFloat(coefficient).toFixed(1) + "e" + exponent;

      tempAggregatedValues.push(formattedNumber); // Store the aggregated value
    }
    aggregatedPropValues.current = tempAggregatedValues;
    setData(inputData);
  };

  const handleNextPress = () => navigation.navigate("ATRPlot");

  chartData.current = {
    labels: aggregatedPropValues.current.sort((a, b) => a - b),
    datasets: [
      {
        data: atrValue.current,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Heading text={"ATR vs Prop Value"} />
              <ATRGraphChart color={"blue"} />
            </View>
            {inputData && inputData.length > 0 && (
              <View style={{ marginVertical: 20, alignItems: "center" }}>
                <Heading text={"Data"} />
                <ScrollView
                  horizontal
                  style={{
                    width: 400,
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    padding: 10,
                  }}
                >
                  <ScrollView horizontal>
                    <View>
                      {/* Table Headings */}
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottomWidth: 2,
                          borderBottomColor: "grey",
                        }}
                      >
                        {Object.keys(inputData[0]).map((item) => (
                          <Text
                            key={item}
                            style={{
                              margin: 10,
                              fontSize: 15,
                              fontWeight: 500,
                              width: 80,
                              textAlign: "center",
                            }}
                          >
                            {inputData[0][item].name}
                          </Text>
                        ))}
                      </View>

                      {/* Table Data */}
                      <View>
                        {inputData.map((item, index) => (
                          <View
                            key={Object.keys(item)}
                            style={{
                              flexDirection: "row",
                              borderBottomWidth: 1,
                              borderBottomColor: "grey",
                              alignItems: "center",
                            }}
                          >
                            {Object.keys(item).map((data) => (
                              <View key={data}>
                                {data !== "preferred_tax" ? (
                                  <Text
                                    style={{
                                      margin: 10,
                                      fontSize: 15,
                                      fontWeight: 400,
                                      width: 80,
                                      textAlign: "center",
                                    }}
                                  >
                                    {item[data].value}
                                  </Text>
                                ) : (
                                  <TextInput
                                    style={{
                                      margin: 10,
                                      fontSize: 15,
                                      fontWeight: 400,
                                      width: 80,
                                      textAlign: "center",
                                      backgroundColor: "rgb(224 224 255)",
                                      borderRadius: 5,
                                      padding: 10,
                                      borderWidth: 1,
                                      borderColor: "gray",
                                    }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setInputData((prevData) => {
                                        const newData = [...prevData];
                                        newData[index] = {
                                          ...newData[index],
                                          [data]: { value },
                                        };
                                        return newData;
                                      });
                                    }}
                                    // onChange={(value) =>
                                    //   console.log(value.target.value)
                                    // }
                                    defaultValue={item[data].value}
                                  />
                                )}
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>
                    </View>
                  </ScrollView>
                </ScrollView>
              </View>
            )}
          </View>
        )}
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Button
            onPress={handleNextPress}
            style={{ backgroundColor: "rgb(204, 204, 255)" }}
            mode="contained"
            labelStyle={{ color: "#000" }}
          >
            {"Finalize Data Now"}
            <Icon name="angle-right" size={15} style={{ marginLeft: 5 }} />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Summary;
