import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

const PieChartJS = ({ values }) => {
  const data = [
    {
      percentage: values[0],
      color: "red", // Red color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[1],
      color: "blue", // Blue color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[2],
      color: "green", // Green color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[3],
      color: "yellow", // Yellow color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <PieChart
      hasLegend={false}
      data={data}
      width={Dimensions.get("window").width / 3.5}
      paddingLeft="50"
      height={220}
      chartConfig={chartConfig}
      accessor={"percentage"}
      backgroundColor={"transparent"}
      absolute
    />
  );
};

export default PieChartJS;
