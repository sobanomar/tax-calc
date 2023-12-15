import { View, Text } from "react-native";
import React from "react";

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
        {value}
      </Text>
    </View>
  );
};

export default DataField;
