import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "../context/DataContext";
import { BarChart } from "react-native-chart-kit";
import { generateArray3ForEachPair } from "../Utils/GenerateFinalArray";
import { calculateRevenueAnalysis } from "../services/CalculateRevenueAnalysis";
import Heading from "../components/Heading";
import RangeSliderInput from "../components/RangeSliderInput";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

const RevenueAnalysis = ({ navigation }) => {
  const { inputData, idFilteredData } = useMyContext();

  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [isGreater, setIsGreater] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [isCalculatingRevenue, setIsCalculatingRevenue] = useState(true);
  const [errorData, setErrorData] = useState(false);
  const [isErrorCalculatingRevenue, setIsErrorCalculatingRevenue] =
    useState(false);
  const finalData = useRef();
  const [reCalculateRevenueAnalysis, setReCalculateRevenueAnalysis] =
    useState(false);

  useEffect(() => {
    console.log(Dimensions.get("window").width);
    // Create Array 3 for each corresponding pair
    if (idFilteredData.current && inputData) {
      finalData.current = generateArray3ForEachPair(
        idFilteredData.current,
        inputData
      );
    }

    // Log the result
  }, [inputData, idFilteredData]);

  const handleReload = () => {
    console.log("reload");
    setIsCalculatingRevenue(true);
    setReCalculateRevenueAnalysis(!reCalculateRevenueAnalysis);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming finalData.current is your data
        const response = await calculateRevenueAnalysis(finalData.current);
        console.log(response.ok);

        if (response.ok) {
          // Legitimate response
          const data = await response.json();

          setIsCalculatingRevenue(false);
          setIsErrorCalculatingRevenue(false);
          console.log(data);
          setApiResponse(data);

          if (data.total_revenue && data.total_revenue[0] > 5.45) {
            setIsGreater(true);
          }
          var roundedValues;
          const [secondValue, firstValue, thirdValue] = data?.total_revenue;
          roundedValues = data?.total_revenue.map((value) => value.toFixed(2));

          setTotalRevenue(roundedValues);

          const chartData = [
            { value: firstValue.toFixed(2), label: "1st Value" },
            { value: secondValue.toFixed(2), label: "2nd Value" },
          ];

          setChartData(chartData);
          // Perform rendering logic here
        } else {
          // Error response
          const error = response;
          console.error("Error response:", error);
          setErrorData(error);
          setIsCalculatingRevenue(false);
          setIsErrorCalculatingRevenue(true);
        }
      } catch (error) {
        console.error("Error :", error.message);

        // Handle errors here
      }
    };

    fetchData();
  }, [finalData.current, reCalculateRevenueAnalysis]); // Include finalData.current as a dependency if needed

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
