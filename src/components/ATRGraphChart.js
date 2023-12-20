import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useMyContext } from "../context/DataContext";

const ATRGraphChart = ({ color }) => {
  const { chartData } = useMyContext();
  return (
    <View>
      <LineChart
        data={chartData.current}
        height={300}
        width={
          Dimensions.get("window").width - Dimensions.get("window").width / 10
        }
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color:
            color === "blue"
              ? (opacity = 1) => `rgba(0, 0, 255, ${opacity})`
              : (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};

export default ATRGraphChart;
