import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";

const AdditionalFund = () => {
  const [first, setfirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [fifth, setFifth] = useState(0);
  const [sixth, setSixth] = useState(0);
  const [seventh, setSeventh] = useState(0);
  const [eighth, setEighth] = useState(0);
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
        value={first}
        setValue={setfirst}
      />
      <IndividualSlider
        text={"صوبائی/وفاقی حکومت سے بجٹ سپورٹ میں کمی"}
        value={second}
        setValue={setSecond}
      />
      <IndividualSlider
        text={"بین الاقوامی ڈونرز کے واجب الاداقرض کی ادائیگی "}
        value={third}
        setValue={setThird}
      />
      <IndividualSlider
        text={"پراپرٹی ٹیکس کم کرنا"}
        value={fourth}
        setValue={setFourth}
      />

      {fourth > 0 && (
        <>
          <Text style={styles.text}>
            آپ جو ٹیکس کم کریں گے ان میں سے آپ درج ذیل ٹیکسوں میں سے کتنے فیصد
            کم کریں گے۔
          </Text>
          <IndividualSlider
            text={"زیادہ قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح کم کرنا"}
            value={fifth}
            setValue={setFifth}
          />
          <IndividualSlider
            text={
              "درمیانی/کم قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح کو کم کرنا"
            }
            value={sixth}
            setValue={setSixth}
          />
          <IndividualSlider
            text={"اعلی قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح کو کم کرن"}
            value={seventh}
            setValue={setSeventh}
          />
          <IndividualSlider
            text={
              "درمیانے/کم قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح میں اضافہ"
            }
            value={eighth}
            setValue={setEighth}
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
