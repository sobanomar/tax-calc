import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useMyContext } from "../context/DataContext";

const ATRGraphChart = ({ color }) => {
  const { chartData } = useMyContext();
  return (
    <View style={{ marginLeft: 10 }}>
      <LineChart
        data={chartData.current}
        height={300}
        width={
          Dimensions.get("window").width - Dimensions.get("window").width / 8
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
        bezier
        style={{ borderRadius: 16 }}
      />
      <View
        style={{
          position: "absolute",
          left: -55,
          top: 130,
          transform: [{ rotate: "-90deg" }],
          marginLeft: 10,
        }}
      >
        <Text>ATR Value</Text>
      </View>
      <Text style={{ alignSelf: "center", marginTop: 5 }}>
        Property Value (in Crores)
      </Text>
    </View>
  );
};

export default ATRGraphChart;
