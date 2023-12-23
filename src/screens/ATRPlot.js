import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import ATRGraphChart from "../components/ATRGraphChart";
import Heading from "../components/Heading";

const ATRPlot = ({ navigation }) => {
  const handleNextPress = () => navigation.navigate("RevenueAnalysis");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Heading text={"ATR Plot"} />
          <ATRGraphChart color={"red"} />
          <View style={{ alignItems: "center", marginVertical: 10 }}>
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

export default ATRPlot;
