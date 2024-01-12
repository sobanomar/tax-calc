import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const PieChartInfo = ({ text, color, percentage }) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: Dimensions.get("window").width / 3.5,
          marginHorizontal: 40,
          marginVertical: 10,
        },
      ]}
    >
      <Text style={{ marginHorizontal: 10, width: "90%" }}>
        {percentage}% {text}
      </Text>
      <View style={[styles.circle, { backgroundColor: color }]} />
    </View>
  );
};

export default PieChartInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    paddingRight: 10,
  },
});
