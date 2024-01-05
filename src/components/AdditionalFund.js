import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useMyContext } from "../context/DataContext";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";
import PieChartJS from "./PieChart";

const AdditionalFund = () => {
  const { survey_funds_values, setsurvey_funds_values } = useMyContext();
  const [isNext, setIsNext] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSliderChange = (index, value) => {
    const newadditional_funds_values = [...survey_funds_values];
    newadditional_funds_values[index] = isNaN(value)
      ? 0
      : value === ""
      ? 0
      : parseInt(value);
    setsurvey_funds_values(newadditional_funds_values);
  };

  const handleNextPress = () => {
    const [firstFour] = [survey_funds_values.slice(0, 4)];

    const sumFirstFour = firstFour.reduce((acc, val) => acc + val, 0);
    // Check the condition for the first four values
    if (sumFirstFour !== 100) {
      setsurvey_funds_values([0, 0, 0, 0, 0, 0, 0, 0]);
      alert(
        "کل 100 فیصد کے برابر ہونا چاہئے۔ براہ کرم چار قیمتیں دوبارہ درج کریں۔"
      );
    } else {
      setIsNext(true);
    }
  };

  const refreshValues = () => {
    setRefresh(!refresh);
  };

  return (
    <View
      style={{
        marginVertical: 20,
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>
        اس سے حکومت کے لیے مزید سہولیات فراہم کرنے یا ٹیکس کم کرنے کا امکان پیدا
        ہو گا۔ اس اضافی فنڈ کا کتنے فیصد آپ درج ذیل پر خرچ کریں گے۔
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <PieChartJS values={survey_funds_values.slice(0, 4)} />
        <View>
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
          <Button
            onPress={handleNextPress}
            mode="contained"
            labelStyle={{ color: "#000" }}
            style={{
              backgroundColor: "rgb(204, 204, 255)",
              marginVertical: 20, // Adjust spacing as needed
            }}
          >
            Next
          </Button>
        </View>
      </View>

      {isNext && (
        <>
          <Text style={styles.text}>
            آپ جو ٹیکس کم کریں گے ان میں سے آپ درج ذیل ٹیکسوں میں سے کتنے فیصد
            کم کریں گے۔
          </Text>
          <View
            style={{
              flexDirection: "row",

              alignContent: "center",
              alignItems: "center",
            }}
          >
            <PieChartJS values={survey_funds_values.slice(4, 8)} />

            <View>
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
                text={"اعلی قیمت والی کمرشل پراپرٹی پر ٹیکس کی شرح کو کم کرن"}
                value={survey_funds_values[6]}
                setValue={(value) => handleSliderChange(6, value)}
              />
              <IndividualSlider
                text={
                  "درمیانے/کم قیمت والی کمرشل پراپرٹی پر ٹیکس کی شرح میں اضافہ"
                }
                value={survey_funds_values[7]}
                setValue={(value) => handleSliderChange(7, value)}
              />
              <ReachedEndModal refresh={refreshValues} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default AdditionalFund;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 24,
    width: Dimensions.get("window").width / 1.5,
    marginVertical: 10,
  },
});
