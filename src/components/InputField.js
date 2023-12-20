import { View, Text, TextInput, Dimensions } from "react-native";
import React from "react";

const InputField = ({
  text,
  handleInputChange,
  value,
  editable: enabled,
  required,
}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        width:
          Dimensions.get("window").width - Dimensions.get("window").width / 10,
      }}
    >
      <Text
        style={{
          marginVertical: 15,
          marginTop: 8,
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        {text}
        {required && (
          <Text style={{ color: "red", fontSize: 20, fontWeight: 400 }}>*</Text>
        )}
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: enabled ? "grey" : "#000",
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
          color: enabled ? "grey" : "#000",
        }}
        pointerEvents={enabled ? "none" : "auto"}
        editable={!enabled}
        placeholder="Type here..."
        onChangeText={(e) => handleInputChange(e)}
        value={value}
        keyboardType="numeric"
      />
    </View>
  );
};

export default InputField;
