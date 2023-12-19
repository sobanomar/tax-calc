import { View, Text } from "react-native";
import React from "react";

const Heading = ({ text }) => {
  return (
    <View>
      <Text
        style={{
          marginVertical: 30,
          fontSize: 30,
          fontWeight: "300",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Heading;
