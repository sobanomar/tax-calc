import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { generateArray3ForEachPair } from "../Utils/GenerateFinalArray";
import Heading from "../components/Heading";
import RangeSliderInput from "../components/RangeSliderInput";
import { useMyContext } from "../context/DataContext";
import { calculateRevenueAnalysis } from "../services/CalculateRevenueAnalysis";
import { addEventListener } from "@react-native-community/netinfo";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { getFormattedDate } from "../Utils/getFormattedDate";

const RevenueAnalysis = ({ navigation }) => {
  const { inputData, idFilteredData, startTimeDash2, namedash2 } =
    useMyContext();

  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [isGreater, setIsGreater] = useState(false);
  const [isConnectedToInternet, setIsConnectedToInternet] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isCalculatingRevenue, setIsCalculatingRevenue] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [retry, setRetry] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [isErrorCalculatingRevenue, setIsErrorCalculatingRevenue] =
    useState(false);
  const finalData = useRef();
  const [reCalculateRevenueAnalysis, setReCalculateRevenueAnalysis] =
    useState(false);

  const { resetValues } = useMyContext();

  useEffect(() => {
    // Create Array 3 for each corresponding pair
    if (idFilteredData.current !== null) {
      if (inputData) {
        finalData.current = generateArray3ForEachPair(
          idFilteredData.current,
          inputData
        );
      }
    }

    // Log the result
  }, [inputData, idFilteredData, reCalculateRevenueAnalysis]);

  const handleReload = () => {
    setReCalculateRevenueAnalysis(!reCalculateRevenueAnalysis);
  };

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setIsConnectedToInternet(state.isConnected);
      setIsCalculatingRevenue(state.isConnected);
      if (state.isConnected) setRetry(!retry);
    });

    // Cleanup function
    unsubscribe();
  }, [reCalculateRevenueAnalysis]);

  useEffect(() => {
    const fetchData = async () => {
      {
        // Assuming finalData.current is your data
        const response = await calculateRevenueAnalysis(finalData.current);
        if (response.status === 200) {
          const data = await response.json();
          setIsCalculatingRevenue(false);
          setIsErrorCalculatingRevenue(false);
          setApiResponse(data);

          if (data.total_revenue && data.total_revenue[0] > 5.45) {
            setIsGreater(true);
          }
          var roundedValues;
          const [secondValue, firstValue, thirdValue] = data?.total_revenue;
          roundedValues = data?.total_revenue.map((value) => value.toFixed(2));

          setTotalRevenue(roundedValues);

          const chartData = [
            { value: firstValue.toFixed(2), label: "Actual Value" },
            { value: secondValue.toFixed(2), label: "Predicted Value" },
          ];

          setChartData(chartData);
          // Perform rendering logic here
        } else if (response.status === 500) {
          setErrorData("Internal Server Error");
          setIsCalculatingRevenue(false);
          setIsErrorCalculatingRevenue(true);
        } else {
          setIsErrorModal(true);
        }

        // Saving data for Dashbaord 1 on google sheets
      }
    };

    if (isConnectedToInternet) {
      fetchData();
    }
  }, [isConnectedToInternet, retry]);

  const start_time = startTimeDash2.current;

  useEffect(() => {
    const postOnSheet = () => {
      const sheet_data = [];

      for (
        let i = 0;
        i < Math.min(idFilteredData.current.length, inputData.length);
        i++
      ) {
        const item1 = idFilteredData.current[i];
        const item2 = inputData[i];

        const data1 = {
          start_time: start_time,
          enumerator_name: namedash2,
          prop_id: parseInt(item2.prop_id.value),
          number_of_property: parseInt(item2.num.value),
          prop_val: parseInt(item2.prop_val.value),
          preferred_tax_liability: parseInt(item2.preferred_tax.value),
          tax_liability_current: parseInt(item2.current_tax.value),
          atr_preferred:
            (parseFloat(item2.preferred_tax.value) /
              parseFloat(item1.prop_val)) *
            100,
          atr_current:
            (parseFloat(item2.current_tax.value) / parseFloat(item1.prop_val)) *
            100,
          revenue_value: isErrorModal ? 0 : apiResponse.total_revenue[0],
          end_time: getFormattedDate(),
        };
        sheet_data.push(data1);
      }
      axios
        .post(
          "https://sheet.best/api/sheets/dea43d8d-a148-4a47-8cef-a255ef09310a/tabs/Sheet2",
          sheet_data
        )
        .then((response) => {
          console.log("Data saved successfully:");
        })
        .catch((error) => {
          alert("Error saving data. Please submit again.");
        });
    };
    if (apiResponse !== null || isErrorModal !== false) {
      idFilteredData.current !== null && postOnSheet();
    }
  }, [apiResponse, isErrorModal]);

  const handleOkPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      })
    );
    resetValues();
  };

  if (isErrorModal) {
    return (
      <View style={styles.containerModal}>
        <Modal transparent={true} animationType="slide" visible={isErrorModal}>
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>آپ کے دیے گئے جوابات درست نہیں۔</Text>
                <Button
                  onPress={handleOkPress}
                  mode="contained"
                  labelStyle={{ color: "#000" }}
                  style={{
                    backgroundColor: "rgb(204, 204, 255)",
                    marginTop: 20, // Adjust spacing as needed
                  }}
                >
                  Okay
                </Button>
              </View>
            </SafeAreaView>
          </BlurView>
        </Modal>
      </View>
    );
  }

  if (!isConnectedToInternet && apiResponse === null) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Heading text={"Revenue Analysis"} />
        <Text>You are not connected to Internet...</Text>
        <Text>Check your internet connection</Text>
        <Button
          onPress={handleReload}
          mode="contained"
          labelStyle={{ color: "#000" }}
          style={{
            backgroundColor: "rgb(204, 204, 255)",
            marginVertical: 20,
          }}
        >
          Retry
        </Button>
      </View>
    );
  }

  if (isCalculatingRevenue) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Heading text={"Revenue Analysis"} />
        <ActivityIndicator
          color="rgb(204, 204, 255)"
          style={{ marginVertical: 40 }}
          size={"large"}
        />
        <Text>Calculating Revenue Analysis...</Text>
      </View>
    );
  }

  if (isErrorCalculatingRevenue) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Heading text={"Revenue Analysis"} />
        <Text style={{ padding: 5 }}>Error Calculating Revenue Analysis</Text>
        <Text style={{ color: "red", padding: 5 }}>{errorData}</Text>
        <Button
          onPress={handleReload}
          mode="contained"
          labelStyle={{ color: "#000" }}
          style={{
            backgroundColor: "rgb(204, 204, 255)",
            marginVertical: 20,
          }}
        >
          Retry Calculating Revenue Analysis
        </Button>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Heading text={"Revenue Analysis"} />
        <Text style={styles.text}>
          <Text>گزشتہ سال لاہور سے پراپرٹی ٹیکس کی مد میں </Text>
          <Text style={styles.blueText}>
            {totalRevenue[1]} ارب روپے اکٹھے کئے گئے۔
          </Text>
          <Text>
            {
              "آپ کے دیے گئے جوابات کے مطابق، ہمارا اندازہ ہے کہ آپ کے تجویز کردہ ٹیکس پلان کے تحت "
            }
          </Text>
          <Text
            style={
              apiResponse?.total_revenue && apiResponse?.total_revenue[0] > 5.45
                ? styles.greenText
                : styles.redText
            }
          >
            {totalRevenue[0]} بلین روپے
          </Text>
          <Text>{"  جمع ہونگے۔\nاس سے "}</Text>
          <Text
            style={
              apiResponse?.total_revenue && apiResponse?.total_revenue[0] > 5.45
                ? styles.greenText
                : styles.redText
            }
          >
            {totalRevenue[2]} ارب روپے
          </Text>
          <Text>
            {apiResponse?.total_revenue &&
              apiResponse?.total_revenue[0] > 5.45 ? (
              <>
                <Text> کے</Text>
                <Text style={styles.greenText}> اضافی فنڈز</Text>
                <Text> جمع ہونگے۔</Text>
              </>
            ) : (
              <>
                <Text> کا</Text>
                <Text style={styles.redText}> شارٹ فال</Text>
                <Text> ہو گا۔</Text>
              </>
            )}
          </Text>
        </Text>
        {isGreater ? (
          <BarChart
            data={{
              labels: chartData.map((item) => item.label),
              // labels: ["1st Value", "2nd Value"],
              datasets: [
                {
                  data: chartData.map((item) => item.value),
                  // data: [100, 200],
                  colors: [
                    (opacity = 0.7) => `rgba(0, 0, 255,${opacity})`,
                    (opacity = 0.7) => `rgba(0, 255, 0,${opacity})`,
                  ],
                },
              ],
            }}
            width={
              Dimensions.get("window").width -
              Dimensions.get("window").width / 10
            }
            height={300}
            fromZero={true}
            yAxisInterval={20}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
              decimalPlaces: 2,
              propsForLabels: { fontWeight: "bold", color: "red" },
              barRadius: 5,
              barPercentage: Dimensions.get("window").width / 160,
            }}
            showBarTops={false}
            withCustomBarColorFromData={true}
            showValuesOnTopOfBars={true}
            style={{ ...styles.chart, borderRadius: 16, padding: 10 }}
          />
        ) : (
          <BarChart
            data={{
              labels: chartData.map((item) => item.label),
              datasets: [
                {
                  data: chartData.map((item) => item.value),
                  colors: [
                    (opacity = 0.7) => `rgba(0, 0, 255,${opacity})`,
                    (opacity = 0.7) => `rgba(255, 0, 0,${opacity})`,
                  ],
                },
              ],
            }}
            width={
              Dimensions.get("window").width -
              Dimensions.get("window").width / 10
            }
            height={300}
            fromZero={true}
            yAxisInterval={20}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
              decimalPlaces: 2,
              propsForLabels: { fontWeight: "bold", color: "red" },
              barRadius: 5,
              barPercentage: Dimensions.get("window").width / 160,
            }}
            showBarTops={false}
            withCustomBarColorFromData={true}
            showValuesOnTopOfBars={true}
            style={{ ...styles.chart, borderRadius: 16, padding: 10 }}
          />
        )}
        <RangeSliderInput />
      </View>
    </ScrollView>
  );
};

export default RevenueAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  blurView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 10,
    width: "80%",
  },
  blueText: {
    color: "blue",
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
  chart: {
    marginVertical: 8,
  },
});
