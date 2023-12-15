import { View, Text, TextInput } from "react-native";
import React from "react";

const InputField = ({ text, handleInputChange, value }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        width: "85%",
      }}
    >
      <Text
        style={{
          marginVertical: 10,
          marginTop: 8,
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
        }}
        placeholder="Type here..."
        onChangeText={(e) => handleInputChange(e)}
        value={value}
        keyboardType="numeric"
      />
    </View>
  );
};

export default InputField;
