import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useMyContext } from "../context/DataContext";

const RevenueAnalysis = () => {
  const { inputData, idFilteredData } = useMyContext();

  useEffect(() => {
    console.log(idFilteredData);
    console.log(inputData);
  }, [inputData, idFilteredData]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>RevenueAnalysis</Text>
    </View>
  );
};

export default RevenueAnalysis;
