import { View, Text } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

const PieChartJS = ({ values }) => {
  const data = [
    {
      name: "% First",
      percentage: values[0],
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "% Second",
      percentage: values[1],
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "% Third",
      percentage: values[2],
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "% Fourth",
      percentage: values[2],
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <PieChart
      data={data}
      width={300}
      height={220}
      chartConfig={chartConfig}
      accessor={"percentage"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      absolute
    />
  );
};

export default PieChartJS;
