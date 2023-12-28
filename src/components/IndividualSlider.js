import Slider from "@react-native-community/slider";
import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const IndividualSlider = ({ text, value, setValue }) => {
  const formatPercentage = (value) => {
    // Ensure that the displayed percentage is always positive
    const positiveValue = Math.max(value, 0);
    return `${positiveValue.toFixed(0)}%`;
  };

  return (
    <View
      style={{
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{text}</Text>
      <View>
        <View style={styles.container}>
          <Text>{formatPercentage(value)}</Text>
        </View>
        {/* <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          step={2}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#bdc3c7"
          thumbTintColor="#3498db"
          value={value}
          onValueChange={(value) => {
            setValue(value);
          }}
          lowerLimit={1}
        /> */}
        <TextInput
          style={{
            height: 40,
            width:
              Dimensions.get("window").width -
              Dimensions.get("window").width / 3,
            borderColor: "#000",
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
            borderRadius: 5,
            color: "#000",
          }}
          pointerEvents={"auto"}
          placeholder="Type here..."
          onChangeText={(e) => setValue(e)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  slider: {
    width: Dimensions.get("window").width - Dimensions.get("window").width / 3,
    height: 20,
  },
});

export default IndividualSlider;
