import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

const PieChartJS = ({ values }) => {
  const data = [
    {
      percentage: values[0],
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[1],
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[2],
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      percentage: values[3],
      color: "#ffffff",
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
