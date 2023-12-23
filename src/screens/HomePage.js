import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const HomePage = ({ navigation }) => {
  const navigateToDashboard1 = () => {
    navigation.navigate("Dashboard1");
  };

  const navigateToDashboard2 = () => {
    navigation.navigate("Dashboard2");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigate To</Text>
      <Button
        onPress={navigateToDashboard1}
        mode="contained"
        labelStyle={{ color: "#000" }}
        style={styles.button}
      >
        Dashboard 1
      </Button>
      <Button
        onPress={navigateToDashboard2}
        mode="contained"
        labelStyle={{ color: "#000" }}
        style={styles.button}
      >
        Dashboard 2
      </Button>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgb(204, 204, 255)",
    marginVertical: 10,
  },
});
