import { View, Text } from "react-native";
import React from "react";
import { formatPropVal } from "../Utils/FormatPropertyValue";

const DataField = ({ name, value }) => {
  return (
    <View
      style={{
        padding: 10,
        marginVertical: 5,
        backgroundColor: "rgb(224 224 255)",
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 17,
          width: "55%",
        }}
      >
        {name}:
      </Text>
      <Text
        style={{
          fontSize: 17,
          width: "45% ",
        }}
      >
        {name === "Property Value" || name === "Rent Value"
          ? formatPropVal(value)
          : value}
      </Text>
    </View>
  );
};

export default DataField;
