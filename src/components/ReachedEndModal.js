import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFormattedDate } from "../Utils/getFormattedDate";
import { useMyContext } from "../context/DataContext";
import { CommonActions } from "@react-navigation/native";

const ReachedEndModal = ({ refresh }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    survey_funds_values,
    dashboardId_2,
    selectedValue,
    setsurvey_funds_values,
    resetValues,
  } = useMyContext();

  const toggleModal = async () => {
    const [secondFour] = [survey_funds_values.slice(4, 8)];
    const sumSecondFour = secondFour.reduce((acc, val) => acc + val, 0);
    // Check the condition for the first four values
    if (sumSecondFour !== 100) {
      const newArr = survey_funds_values;
      for (let i = 4; i < 8; i++) {
        newArr[i] = 0;
      }
      setsurvey_funds_values(newArr);
      refresh();
      alert(
        "کل 100 فیصد کے برابر ہونا چاہئے۔ براہ کرم چار قیمتیں دوبارہ درج کریں۔"
      );
    } else {
      try {
        const data = {
          prop_id: dashboardId_2,
          type:
            selectedValue === "اضافی فنڈ" ? "Additional Funds" : "Short Fall",
          spending: survey_funds_values[0],
          budget_support: survey_funds_values[1],
          international_debt: survey_funds_values[2],
          property_tax: survey_funds_values[3],
          high_residential: survey_funds_values[4],
          medium_residential: survey_funds_values[5],
          high_commercial: survey_funds_values[6],
          medium_commercial: survey_funds_values[7],
          end_survey_time: getFormattedDate(),
        };
        // Saving data for Survey on google sheets3
        await axios.post(
          "https://sheet.best/api/sheets/0a60219d-2b6d-44c6-ad46-61dde7a90090/tabs/Sheet3",
          data
        );
        console.log("Data saved successfully:");
        setModalVisible(!modalVisible);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle specific Axios (API) errors here
          alert("Please check your internet connection and try again");
        } else {
          // Handle other types of errors here
          alert(error.message);
        }
      }
    }
  };

  // const handleOkPress = () => {
  //   navigation.navigate("HomeStack");
  // };
  const handleOkPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      })
    );
    resetValues();
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
