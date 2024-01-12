import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useMyContext } from "../context/DataContext";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";
import { Button } from "react-native-paper";
import PieChartJS from "./PieChart";
import PieChartInfo from "./PieChartInfo";

const ShortFall = () => {
  const { survey_funds_values, setsurvey_funds_values } = useMyContext();
  const [isNext, setIsNext] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [secondFourSum, setSecondFourSum] = useState(0);
  const [textInputs, setTextInputs] = useState(Array(8).fill("")); // State for text input values

  const handleSliderChange = (index, value) => {
    const newadditional_funds_values = [...survey_funds_values];
    newadditional_funds_values[index] = isNaN(value)
      ? 0
      : value === ""
      ? 0
      : parseInt(value);

    setsurvey_funds_values(newadditional_funds_values);

    // Update the text input values
    const newTextInputs = newadditional_funds_values.map((value) =>
      String(value)
    );
    setTextInputs(newTextInputs);
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
        اس سے حکومت کو کم خدمات فراہم کرنے یا ٹیکس بڑھانے کی ضرورت پیدا ہوگی۔ اس
        کمی کو پورا کرنے کے لیے، آپ درج ذیل میں سے ہر ایک میں کتنے فیصد اضافہ
        کریں گے
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
          <PieChartInfo
            color={"#ADD8E6"}
            text={"عوامی سہولتوں میں کمی"}
            percentage={survey_funds_values[4]}
          />
          <PieChartInfo
            color={"green"}
            text={"بجٹ سپورٹ میں اضافہ"}
            percentage={survey_funds_values[5]}
          />
          <PieChartInfo
            color={"red"}
            text={"قرض میں اضافہ"}
            percentage={survey_funds_values[6]}
          />
          <PieChartInfo
            color={"white"}
            text={"جائیداد ٹیکس میں اضافى"}
            percentage={survey_funds_values[7]}
          />
        </View>
        <View style={{ width: Dimensions.get("window").width / 3.5 }}>
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
          <Button
            onPress={handleNextPress}
            mode="contained"
            labelStyle={{ color: "#000" }}
            style={{
              backgroundColor: "rgb(204, 204, 255)",
              marginTop: 20, // Adjust spacing as needed
            }}
          >
            Next
          </Button>
        </View>
      </View>

      {isNext && (
        <>
          <Text style={styles.text}>
            آپ جو اضافی ٹیکس بڑھائیں گے، ان میں سے آپ درج ذیل میں سے کتنا فیصد
            بڑھائیں گے۔
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
              <PieChartInfo
                color={"#ADD8E6"}
                text={"زیادہ قیمت والی رہائشی پراپرٹیز کے ٹیکس میں اضافہ"}
                percentage={survey_funds_values[4]}
              />
              <PieChartInfo
                color={"green"}
                text={"کم قیمت والی رہائشی پراپرٹیز کے ٹیکس میں اضافہ"}
                percentage={survey_funds_values[5]}
              />
              <PieChartInfo
                color={"red"}
                text={"زیادہ قیمت والی تجارتی پراپرٹیز کے ٹیکس میں اضافہ"}
                percentage={survey_funds_values[6]}
              />
              <PieChartInfo
                color={"white"}
                text={"کم قیمت والی تجارتی پراپرٹیز کے ٹیکس میں قمی"}
                percentage={survey_funds_values[7]}
              />
            </View>
            <View style={{ width: Dimensions.get("window").width / 3.5 }}>
              <IndividualSlider
                text={"کم قیمت والی تجارتی پراپرٹیز کے ٹیکس میں اضافہ"}
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
                text={"زیادہ قیمت والی کمرشل پراپرٹی پر ٹیکس کی شرح میں اضافہ"}
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

export default ShortFall;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 24,
    width: Dimensions.get("window").width / 1.5,
    marginVertical: 10,
  },
});
