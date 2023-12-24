import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFormattedDate } from "../Utils/getFormattedDate";
import { useMyContext } from "../context/DataContext";
import { CommonActions } from '@react-navigation/native';

const ReachedEndModal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const initialSliderValues = [0, 0, 0, 0, 0, 0, 0, 0];
  const { survey_funds_values, dashboardId_2, selectedValue, setsurvey_funds_values } = useMyContext();
  const toggleModal = () => {
    const data = {
      prop_id: dashboardId_2,
      type: selectedValue === "اضافی فنڈ" ? "Additional Funds" : "Short Fall",
      spending: survey_funds_values[0],
      budget_support: survey_funds_values[1],
      international_debt: survey_funds_values[2],
      property_tax: survey_funds_values[3],
      high_residential: survey_funds_values[4],
      medium_residential: survey_funds_values[5],
      high_commercial: survey_funds_values[6],
      medium_commercial: survey_funds_values[7],
      end_survey_time: getFormattedDate()
    };
    // Saving data for Survey on google sheets3
    axios.post(
      "https://sheet.best/api/sheets/77c9dbee-d31a-4611-b602-745598fceb84/tabs/Sheet3",
      data
    )
      .then(response => {
        console.log("Data saved successfully:");
        setModalVisible(!modalVisible);
      })
      .catch(error => {
        alert("Error saving data. Please submit again.");
      });
  };


  // const handleOkPress = () => {
  //   navigation.navigate("HomeStack");
  // };
  const handleOkPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeStack' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={toggleModal}
        mode="contained"
        labelStyle={{ color: "#000" }}
        style={{
          backgroundColor: "rgb(204, 204, 255)",
          marginTop: 20, // Adjust spacing as needed
        }}
      >
        Submit
      </Button>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>
                You have reached the end of dashboard, please go back to survey
                CTO
              </Text>
              <Button
                onPress={handleOkPress}
                mode="contained"
                labelStyle={{ color: "#000" }}
                style={{
                  backgroundColor: "rgb(204, 204, 255)",
                  marginTop: 20, // Adjust spacing as needed
                }}
              >
                Okay
              </Button>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  blurView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
  },
});

export default ReachedEndModal;
