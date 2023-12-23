import React from "react";
import { Text, View } from "react-native";

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
