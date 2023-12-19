import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import IndividualSlider from "./IndividualSlider";
import ReachedEndModal from "./ReachedEndModal";

const ShortFall = () => {
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
        اس سے حکومت کو کم خدمات فراہم کرنے یا ٹیکس بڑھانے کی ضرورت پیدا ہوگی۔ اس
        کمی کو پورا کرنے کے لیے، آپ درج ذیل میں سے ہر ایک میں کتنے فیصد اضافہ
        کریں گے
      </Text>

      <IndividualSlider
        text={"سہولیات پر اخراجات کو کم کرنا "}
        value={first}
        setValue={setfirst}
      />
      <IndividualSlider
        text={"صوبائی/وفاقی حکومت سے مزید بجٹ سپورٹ کی درخواست کرنا "}
        value={second}
        setValue={setSecond}
      />
      <IndividualSlider
        text={"مزید بین الاقو امی قرض حاصل کرنا"}
        value={third}
        setValue={setThird}
      />
      <IndividualSlider
        text={"پراپرٹی ٹیکس میں اضافہ "}
        value={fourth}
        setValue={setFourth}
      />

      {fourth > 0 && (
        <>
          <Text style={styles.text}>
            آپ جو اضافی ٹیکس بڑھائیں گے، ان میں سے آپ درج ذیل میں سے کتنا فیصد
            بڑھائیں گے۔
          </Text>
          <IndividualSlider
            text={"زیادہ قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح میں اضافہ"}
            value={fifth}
            setValue={setFifth}
          />
          <IndividualSlider
            text={
              "درمیانی/کم قیمت والی رہائشی جائیدادوں پر ٹیکس کی شرح میں اضافہ "
            }
            value={sixth}
            setValue={setSixth}
          />
          <IndividualSlider
            text={"زیادہ قیمت والی تجارتی جائیدادوں پر ٹیکس کی شرح میں اضافہ"}
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

export default ShortFall;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
});
