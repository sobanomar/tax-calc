import { View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const PreviousAndNextButton = ({
  handleNextPress,
  handlePreviousPress,
  inputId,
  propertyNumber,
  userName,
  isDisabled,
}) => {
  const previousButtonDisabled =
    inputId.length === 0 || propertyNumber === 0 || userName.length === 0;
  const nextButtonDisabled = inputId.length === 0 || userName.length === 0;

  const buttonContainerStyle = {
    flex: 1,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginVertical: 20,
  };

  const buttonStyle = {
    backgroundColor: "rgb(204, 204, 255)",
  };

  return (
    <View style={buttonContainerStyle}>
      <Button
        onPress={handlePreviousPress}
        mode="contained"
        labelStyle={{ color: previousButtonDisabled ? "grey" : "#000" }}
        style={{
          ...buttonStyle,
          opacity: previousButtonDisabled ? 0.7 : 1, // Set opacity based on disabled state
        }}
        disabled={previousButtonDisabled}
      >
        <Icon name="angle-left" size={15} style={{ marginRight: 5 }} /> Previous
      </Button>
      <Button
        onPress={handleNextPress}
        mode="contained"
        labelStyle={{
          color: nextButtonDisabled || isDisabled ? "grey" : "#000",
        }}
        style={{
          ...buttonStyle,
          opacity: nextButtonDisabled || isDisabled ? 0.7 : 1, // Set opacity based on disabled state
        }}
        disabled={nextButtonDisabled || isDisabled}
      >
        {propertyNumber < 14 ? "Submit & Next " : "Submit"}
        <Icon name="angle-right" size={15} style={{ marginLeft: 5 }} />
      </Button>
    </View>
  );
};

export default PreviousAndNextButton;
