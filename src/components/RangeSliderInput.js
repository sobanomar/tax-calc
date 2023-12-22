import { View, Picker, StyleSheet, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import AdditionalFund from "./AdditionalFund";
import ShortFall from "./ShortFall";

const RangeSliderInput = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showSlider, setShowSlider] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>کیا آپکا شارٹ فال آیا یا اضافی فنڈ</Text>
      <Picker
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          setSelectedValue(itemValue);
          setShowSlider(true);
        }}
        style={styles.picker}
        selectedValue={selectedValue}
      >
        <Picker.Item label="Select an option" value={null} />
        <Picker.Item label="اضافی فنڈ" value="اضافی فنڈ" />
        <Picker.Item label="شارٹ فال" value="شارٹ فال" />
      </Picker>
      {showSlider && selectedValue === "اضافی فنڈ" && <AdditionalFund />}
      {showSlider && selectedValue === "شارٹ فال" && <ShortFall />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - Dimensions.get("window").width / 10,
  },
  picker: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 20,
  },
});

export default RangeSliderInput;
