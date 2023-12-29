import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMyContext } from "../context/DataContext";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";
import Toast from 'react-native-toast-message';

const AdditionalFund = () => {
  const { survey_funds_values, setsurvey_funds_values } = useMyContext();
  const [firstFourSum, setFirstFourSum] = useState(0);
  const [secondFourSum, setSecondFourSum] = useState(0);
  const [textInputs, setTextInputs] = useState(Array(8).fill("")); // State for text input values

  const handleSliderChange = (index, value) => {
    const newadditional_funds_values = [...survey_funds_values];
    newadditional_funds_values[index] = parseInt(value);
    setsurvey_funds_values(newadditional_funds_values);

    // Update the text input values
    const newTextInputs = newadditional_funds_values.map((value) => String(value));
    setTextInputs(newTextInputs);
  };


  useEffect(() => {
    // Calculate the sum of the first four values
    const [firstFour, secondFour] = [
      survey_funds_values.slice(0, 4),
      survey_funds_values.slice(4, 8),
    ];

    const sumFirstFour = firstFour.reduce((acc, val) => acc + val, 0);
    setFirstFourSum(sumFirstFour);

    const sumSecondFour = secondFour.reduce((acc, val) => acc + val, 0);
    setSecondFourSum(sumSecondFour);

    // Check the condition for the first four values
    if (sumFirstFour > 100) {
      alert(
        'کل فیصد 100 سے زیادہ نہیں ہونا چاہیے۔ براہ کرم چار قیمتیں دوبارہ درج کریں۔'
      );

      // Set the text inputs to the corresponding values of firstFour
      const newTextInputs = firstFour.map((value) => String(value));
      setTextInputs(newTextInputs);

      // Reset the values and text inputs
      setsurvey_funds_values([]);
      setTextInputs(Array(8).fill(''));
    }

    // Check the condition for the next four values
    if (sumSecondFour > 100) {
      alert(
        'کل فیصد 100 سے زیادہ نہیں ہونا چاہیے۔ براہ کرم چار قیمتیں دوبارہ درج کریں۔'
      );

      // Reset only the second set of values
      setsurvey_funds_values((prevValues) => [
        prevValues[0],
        prevValues[1],
        prevValues[2],
        prevValues[3],
        ...Array(4), // Set the next four values to an empty array
      ]);

      // Reset only the second set of text inputs
      setTextInputs((prevTextInputs) => [
        prevTextInputs[0],
        prevTextInputs[1],
        prevTextInputs[2],
        prevTextInputs[3],
        '',
        '',
        '',
        '',
      ]);
    }
  }, [survey_funds_values]);

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
