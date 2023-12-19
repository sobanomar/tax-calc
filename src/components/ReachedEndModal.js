import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

const ReachedEndModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOkPress = () => {
    // Additional logic to handle 'Okay' button press
    toggleModal();
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
