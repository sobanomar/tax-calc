import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import ATRGraphChart from "../components/ATRGraphChart";
import Heading from "../components/Heading";
import { useMyContext } from "../context/DataContext";

const ATRPlot = ({ navigation }) => {
  const handleNextPress = () => navigation.navigate("RevenueAnalysis");
  const { urduText1, urduText2, urduText3, urduText4, urduTextForAtr } =
    useMyContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Heading text={"Updated ATR vs Prop Value"} />
          {urduTextForAtr.current === 1 ? (
            <Text
              style={[
                styles.propertyText,
                {
                  color: "red",
                  marginVertical: 20,
                  fontSize: 23,
                  marginHorizontal: "10%",
                },
              ]}
            >
              {urduText1} {urduText2}
            </Text>
          ) : urduTextForAtr.current === -1 ? (
            <Text
              style={[
                styles.propertyText,
                {
                  color: "red",
                  marginVertical: 20,
                  fontSize: 23,
                  marginHorizontal: "10%",
                },
              ]}
            >
              {urduText1} {urduText3}
            </Text>
          ) : urduTextForAtr.current === 0 ? (
            <Text
              style={[
                styles.propertyText,
                {
                  color: "red",
                  marginTop: 50,
                  fontSize: 23,
                },
              ]}
            >
              {urduText1} {urduText4}
            </Text>
          ) : null}
          <ATRGraphChart color={"red"} />
          <View style={{ alignItems: "center", marginVertical: 30 }}>
            <Button
              onPress={handleNextPress}
              style={{ backgroundColor: "rgb(204, 204, 255)" }}
              mode="contained"
              labelStyle={{ color: "#000" }}
            >
              {"Generate Revenue Analysis"}
              <Icon name="angle-right" size={15} style={{ marginLeft: 5 }} />
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  propertyText: {
    textAlign: "center",
    marginVertical: 10,
    // add other styles for text if needed
  },
});
export default ATRPlot;
