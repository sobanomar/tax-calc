import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import ATRGraphChart from "../components/ATRGraphChart";
import Heading from "../components/Heading";
import { useMyContext } from "../context/DataContext";

import Icon from "react-native-vector-icons/FontAwesome";
import { formatPropVal } from "../Utils/FormatPropertyValue";

const Summary = ({ navigation }) => {
  const [data, setData] = useState([]);
  const atrValue = useRef([]);
  const propValue = useRef([]);
  const aggregatedPropValues = useRef([]);
  const aggregatedAtrValues = useRef([]);
  const initialSliderValues = [0, 0, 0, 0, 0, 0, 0, 0];
  const {
    inputData,
    setInputData,
    chartData,
    urduText1,
    urduText2,
    urduText3,
    urduText4,
    idFilteredData,
    urduTextForAtr,
    setsurvey_funds_values,
    setSelectedValue,
  } = useMyContext();
  const [isUIReady, setIsUIReady] = useState(false);
  useEffect(() => {
    calculateATR();
    setIsUIReady(true);
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
        const singelAtr = (item?.preferred_tax?.value / item?.prop_val?.value) * 100
        tempATR.push(
          isNaN(singelAtr) ? 0 : singelAtr
        );
        tempProp.push(item.prop_val.value);
        atrValue.current = tempATR
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

  const handleNextPress = () => {
    setSelectedValue(null);
    setsurvey_funds_values(initialSliderValues);
    navigation.navigate("ATRPlot");
  };

  chartData.current = {
    labels: aggregatedPropValues.current.sort((a, b) => a - b),
    datasets: [
      {
        data: atrValue.current,
      },
    ],
  };

  const linearRegression = (xValues, yValues) => {
    if (xValues && yValues) {
      xValues = Array.isArray(xValues)
        ? xValues.map((item) => item?.prop_val)
        : [];
    } else {
      console.error("xValues or yValues is null or undefined");
    }
    const n = yValues.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
      sumX += xValues[i];
      sumY += yValues[i];
      sumXY += xValues[i] * yValues[i];
      sumXX += xValues[i] * xValues[i];
    }
    const rawSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const slope = parseFloat(rawSlope.toFixed(10));
    const intercept = (sumY - slope * sumX) / n;
    const slopeSign = Math.sign(slope);
    return { slopeSign };
  };

  urduTextForAtr.current = linearRegression(
    idFilteredData.current,
    atrValue.current
  ).slopeSign;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data && (
          <View style={{ flex: 1, alignItems: "center" }}>
            {urduTextForAtr.current === 1 ? (
              <Text
                style={[
                  styles.propertyText,
                  {
                    color: "red",
                    marginTop: 50,
                    fontSize: 23,
                  },
                ]}
              >
                {urduText1} {urduText2}
              </Text>
            ) : urduTextForAtr.current === -1 ? (
              <Text
                style={[
                  styles.propertyText,
                  {
                    color: "red",
                    marginTop: 50,
                    fontSize: 23,
                  },
                ]}
              >
                {urduText1} {urduText3}
              </Text>
            ) : urduTextForAtr.current === 0 ? (
              <Text
                style={[
                  styles.propertyText,
                  {
                    color: "red",
                    marginTop: 50,
                    fontSize: 23,
                  },
                ]}
              >
                {urduText1} {urduText4}
              </Text>
            ) : null}
            {isUIReady && (
              <>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Heading text={"Original ATR vs Prop Value"} />
                  <ATRGraphChart color={"blue"} />
                </View>
              </>
            )}
            {inputData && inputData.length > 0 && (
              <View
                style={{
                  marginVertical: 20,
                  alignItems: "center",
                }}
              >
                <Heading text={"Data"} />
                <ScrollView
                  horizontal
                  style={{
                    width:
                      Dimensions.get("window").width -
                      Dimensions.get("window").width / 10,
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    padding: 10,
                  }}
                >
                  <ScrollView horizontal>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottomWidth: 2,
                          borderBottomColor: "grey",
                        }}
                      >
                        {Object.keys(inputData[0]).map((item, index) => (
                          <Text
                            key={`${item}-${index}`}
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

                      <View>
                        {inputData.map((item, index) => (
                          <View
                            key={`${item}-${index}`}
                            style={{
                              flexDirection: "row",
                              borderBottomWidth: 1,
                              borderBottomColor: "grey",
                              alignItems: "center",
                            }}
                          >
                            {Object.keys(item, index).map((data) => (
                              <View key={`${item}-${index}-${data}`}>
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
                                    {data === "prop_val" || data === "rent_val"
                                      ? formatPropVal(item[data].value)
                                      : item[data].value}
                                  </Text>
                                ) : (
                                  <TextInput
                                    style={{
                                      margin: 10,
                                      fontSize: 15,
                                      fontWeight: "normal",
                                      width: 80,
                                      textAlign: "center",
                                      backgroundColor: "rgb(224 224 255)",
                                      borderRadius: 5,
                                      padding: 10,
                                      borderWidth: 1,
                                      borderColor: "gray",
                                    }}
                                    onChangeText={(e) => {
                                      const value = e;
                                      setInputData((prevData) => {
                                        const newData = [...prevData];
                                        newData[index] = {
                                          ...newData[index],
                                          [data]: {
                                            name: "Preferred Tax Liability",
                                            value,
                                          },
                                        };
                                        return newData;
                                      });
                                    }}
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

const styles = StyleSheet.create({
  propertyText: {
    textAlign: "center",
    marginVertical: 10,
    // add other styles for text if needed
  },
});

export default Summary;
