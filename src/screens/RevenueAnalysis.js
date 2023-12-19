import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "../context/DataContext";
import { BarChart } from "react-native-chart-kit";
import { generateArray3ForEachPair } from "../Utils/GenerateFinalArray";
import { calculateRevenueAnalysis } from "../services/CalculateRevenueAnalysis";
import Heading from "../components/Heading";

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
    finalData.current = generateArray3ForEachPair(
      idFilteredData.current,
      inputData
    );

    // Log the result
  }, [inputData, idFilteredData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming finalData.current is your data
        const response = await calculateRevenueAnalysis(finalData.current);
        console.log("response: ", response);

        setIsCalculatingRevenue(false);
        setApiResponse(response);

        if (response.total_revenue && response.total_revenue[0] > 5.45) {
          setIsGreater(true);
        }

        if (response.total_revenue) {
          const [secondValue, firstValue, thirdValue] = response?.total_revenue;
          const roundedValues = response?.total_revenue.map((value) =>
            value.toFixed(2)
          );
        }

        setTotalRevenue(roundedValues);

        const chartData = [
          { value: firstValue, label: "1st Value" },
          { value: secondValue, label: "2nd Value" },
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
          style={{ marginTop: 100 }}
          size={"large"}
        />
        <Text>Calculating Revenue Analysis...</Text>
      </View>
    );
  }

  return (
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
        <Text style={styles.greenText}>{totalRevenue[0]} بلین روپے</Text>
        <Text>{"  جمع ہونگے۔\nاس سے "}</Text>
        <Text style={styles.greenText}>{totalRevenue[2]} ارب روپے</Text>
        <Text>{"  کے اضافی فنڈز جمع ہونگے۔"}</Text>
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
    </View>
  );
};

export default RevenueAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    padding: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: -2,
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

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { BarChart } from "react-native-chart-kit";

// const RevenueAnalysis = () => {
//   const [chartData, setChartData] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState([]);

//   useEffect(() => {
//     const apiResponse = {
//       success: true,
//       total_revenue: [8.3921312945586622, 5.45, 2.9446870544133786],
//     };

//     const [secondValue, firstValue, thirdValue] = apiResponse.total_revenue;
//     const roundedValues = apiResponse.total_revenue.map((value) =>
//       value.toFixed(2)
//     );

//     setTotalRevenue(roundedValues);

//     const chartData = [
//       { value: firstValue, label: "1st Value" },
//       { value: secondValue, label: "2nd Value" },
//     ];

//     setChartData(chartData);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         <Text>گزشتہ سال لاہور سے پراپرٹی ٹیکس کی مد میں </Text>
//         <Text style={styles.blueText}>
//           {totalRevenue[1]} ارب روپے اکٹھے کئے گئے۔
//         </Text>
//         <Text>
//           {
//             "آپ کے دیے گئے جوابات کے مطابق، ہمارا اندازہ ہے کہ آپ کے تجویز کردہ ٹیکس پلان کے تحت "
//           }
//         </Text>
//         <Text style={styles.greenText}>{totalRevenue[0]} بلین روپے</Text>
//         <Text>{"  جمع ہونگے۔\nاس سے "}</Text>
//         <Text style={styles.greenText}>{totalRevenue[2]} ارب روپے</Text>
//         <Text>{"  کے اضافی فنڈز جمع ہونگے۔"}</Text>
//       </Text>

//       <BarChart
//         data={{
//           labels: chartData.map((item) => item.label),
//           datasets: [
//             {
//               data: chartData.map((item) => item.value),
//               color: (opacity = 1) => (opacity > 0 ? "blue" : "transparent"),
//             },
//           ],
//         }}
//         width={350}
//         height={300}
//         fromZero={true}
//         yAxisInterval={20}
//         chartConfig={{
//           backgroundGradientFrom: "#fff",
//           backgroundGradientTo: "#fff",
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           decimalPlaces: 2,
//           propsForLabels: { fontWeight: "bold", color: "red" },
//         }}
//         style={styles.chart}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 30,
//     padding: 16,
//   },
//   text: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     lineHeight: 24,
//     letterSpacing: -2,
//   },
//   blueText: {
//     color: "blue",
//   },
//   redText: {
//     color: "red",
//   },
//   greenText: {
//     color: "green",
//   },
//   chart: {
//     marginVertical: 8,
//   },
// });

// export default RevenueAnalysis;
