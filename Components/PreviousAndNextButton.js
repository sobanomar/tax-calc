import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
const PreviousAndNextButton = ({
  handleNextPress,
  handlePreviousPress,
  inputText,
  propertyNumber,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        marginVertical: 20,
      }}
    >
      <Button
        onPress={handlePreviousPress}
        mode="contained"
        style={{ backgroundColor: "rgb(204, 204, 255)", width: "120px" }}
        textColor="#000"
        disabled={inputText.length === 0 || propertyNumber === 0}
      >
        <Icon name="angle-left" size={15} style={{ marginRight: 5 }} /> Previous
      </Button>
      <Button
        onPress={handleNextPress}
        mode="contained"
        style={{
          backgroundColor: "rgb(204, 204, 255)",
          width: "120px",
        }}
        textColor="#000"
        disabled={inputText.length === 0 || propertyNumber === 14}
      >
        Next <Icon name="angle-right" size={15} style={{ marginLeft: 5 }} />
      </Button>
    </View>
  );
};

export default PreviousAndNextButton;
