import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";
import { useMyContext } from "../context/DataContext";

const ShortFall = () => {
  const { survey_funds_values, setsurvey_funds_values } = useMyContext();
  const handleSliderChange = (index, value) => {
    const newadditional_funds_values = [...survey_funds_values];
    newadditional_funds_values[index] = value;
    setsurvey_funds_values(newadditional_funds_values);
  };


  return (
    <View
      style={{
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>
        اس سے حکومت کو کم خدمات فراہم کرنے یا ٹیکس بڑھانے کی ضرورت پیدا ہوگی۔ اس
        کمی کو پورا کرنے کے لیے، آپ درج ذیل میں سے ہر ایک میں کتنے فیصد اضافہ
        کریں گے
      </Text>

      <IndividualSlider
        text={"سہولیات پر اخراجات کو کم کرنا "}
        value={survey_funds_values[0]}
        setValue={(value) => handleSliderChange(0, value)}
      />
      <IndividualSlider
        text={"صوبائی/وفاقی حکومت سے مزید بجٹ سپورٹ کی درخواست کرنا "}
        value={survey_funds_values[1]}
        setValue={(value) => handleSliderChange(1, value)}
      />
      <IndividualSlider
        text={"مزید بین الاقو امی قرض حاصل کرنا"}
        value={survey_funds_values[2]}
        setValue={(value) => handleSliderChange(2, value)}
      />
      <IndividualSlider
        text={"پراپرٹی ٹیکس میں اضافہ "}
        value={survey_funds_values[3]}
        setValue={(value) => handleSliderChange(3, value)}
      />

      {survey_funds_values[3] > 0 && (
        <>
          <Text style={styles.text}>
            آپ جو اضافی ٹیکس بڑھائیں گے، ان میں سے آپ درج ذیل میں سے کتنا فیصد
            بڑھائیں گے۔
          </Text>
          <IndividualSlider
            text={"زیادہ قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح میں اضافہ"}
            value={survey_funds_values[4]}
            setValue={(value) => handleSliderChange(4, value)}
          />
          <IndividualSlider
            text={
              "درمیانی/کم قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح میں اضافہ "
            }
            value={survey_funds_values[5]}
            setValue={(value) => handleSliderChange(5, value)}
          />
          <IndividualSlider
            text={"زیادہ قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح میں اضافہ"}
            value={survey_funds_values[6]}
            setValue={(value) => handleSliderChange(6, value)}
          />
          <IndividualSlider
            text={
              "درمیانے/کم قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح میں اضافہ"
            }
            value={survey_funds_values[7]}
            setValue={(value) => handleSliderChange(7, value)}
          />
        </>
      )}
      <ReachedEndModal />
    </View>
  );
};

export default ShortFall;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
});
