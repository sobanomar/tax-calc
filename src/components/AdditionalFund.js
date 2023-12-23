import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMyContext } from "../context/DataContext";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";

const AdditionalFund = () => {
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
        اس سے حکومت کے لیے مزید سہولیات فراہم کرنے یا ٹیکس کم کرنے کا امکان پیدا
        ہو گا۔ اس اضافی فنڈ کا کتنے فیصد آپ درج ذیل پر خرچ کریں گے۔
      </Text>

      <IndividualSlider
        text={"عوامی سہولیات پر اخراجات میں اضافہ"}
        value={survey_funds_values[0]}
        setValue={(value) => handleSliderChange(0, value)}
      />
      <IndividualSlider
        text={"صوبائی/وفاقی حکومت سے بجٹ سپورٹ میں کمی"}
        value={survey_funds_values[1]}
        setValue={(value) => handleSliderChange(1, value)}
      />
      <IndividualSlider
        text={"بین الاقوامی ڈونرز کے واجب الاداقرض کی ادائیگی "}
        value={survey_funds_values[2]}
        setValue={(value) => handleSliderChange(2, value)}
      />
      <IndividualSlider
        text={"پراپرٹی ٹیکس کم کرنا"}
        value={survey_funds_values[3]}
        setValue={(value) => handleSliderChange(3, value)}
      />

      {survey_funds_values[3] > 0 && (
        <>
          <Text style={styles.text}>
            آپ جو ٹیکس کم کریں گے ان میں سے آپ درج ذیل ٹیکسوں میں سے کتنے فیصد
            کم کریں گے۔
          </Text>
          <IndividualSlider
            text={"زیادہ قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح کم کرنا"}
            value={survey_funds_values[4]}
            setValue={(value) => handleSliderChange(4, value)}
          />
          <IndividualSlider
            text={
              "درمیانی/کم قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح کو کم کرنا"
            }
            value={survey_funds_values[5]}
            setValue={(value) => handleSliderChange(5, value)}
          />
          <IndividualSlider
            text={"اعلی قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح کو کم کرن"}
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

export default AdditionalFund;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
});
