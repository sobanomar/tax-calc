import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "../context/DataContext";
import { BarChart } from "react-native-chart-kit";
import { generateArray3ForEachPair } from "../Utils/GenerateFinalArray";
import { calculateRevenueAnalysis } from "../services/CalculateRevenueAnalysis";
import Heading from "../components/Heading";
import RangeSliderInput from "../components/RangeSliderInput";
import { ScrollView } from "react-native-gesture-handler";

const RevenueAnalysis = () => {
  const { inputData, idFilteredData } = useMyContext();

  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [isGreater, setIsGreater] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [isCalculatingRevenue, setIsCalculatingRevenue] = useState(true);
  const finalData = useRef();

  useEffect(() => {
    // Create Array 3 for each corresponding pair
    if (idFilteredData.current && inputData) {
      finalData.current = generateArray3ForEachPair(
        idFilteredData.current,
        inputData
      );
    }

    // Log the result
  }, [inputData, idFilteredData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming finalData.current is your data
        const response = await calculateRevenueAnalysis(finalData.current);
        console.log("response: ", response.total_revenue);

        setIsCalculatingRevenue(false);
        setApiResponse(response);

        if (response.total_revenue && response.total_revenue[0] > 5.45) {
          setIsGreater(true);
        }
        var roundedValues;
        const [secondValue, firstValue, thirdValue] = response?.total_revenue;
        roundedValues = response?.total_revenue.map((value) =>
          value.toFixed(2)
        );

        setTotalRevenue(roundedValues);

        const chartData = [
          { value: firstValue.toFixed(2), label: "1st Value" },
          { value: secondValue.toFixed(2), label: "2nd Value" },
        ];

        setChartData(chartData);
      } catch (error) {
        console.error("Error outside:", error.message);
        // Handle errors here
      }
    };

    fetchData();
  }, [finalData.current]); // Include finalData.current as a dependency if needed

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
              datasets: [
                {
                  data: chartData.map((item) => item.value),
                  colors: [
                    (opacity = 0.7) => `rgba(0, 0, 255,${opacity})`,
                    (opacity = 0.7) => `rgba(0, 255, 0,${opacity})`,
                  ],
                },
              ],
            }}
            width={350}
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
              barPercentage: 2.5,
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
            width={350}
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
              barPercentage: 2.5,
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
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 10,
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
