import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useMyContext } from "../context/DataContext";
import AdditionalFund from "./AdditionalFund";
import ShortFall from "./ShortFall";
import { Picker } from "@react-native-picker/picker";

const RangeSliderInput = () => {
  const { selectedValue, setSelectedValue } = useMyContext();
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
        <Picker.Item
          style={{ color: "#000" }}
          label="Select an option"
          value={null}
        />
        <Picker.Item
          style={{ color: "#000" }}
          label="اضافی فنڈ"
          value="اضافی فنڈ"
        />
        <Picker.Item
          style={{ color: "#000" }}
          label="شارٹ فال"
          value="شارٹ فال"
        />
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
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
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
