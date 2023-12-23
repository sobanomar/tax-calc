import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
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
      <BarChart
        data={{
          labels: ["Hello", "Sir"],
          datasets: [
            {
              data: [100, 200],
              colors: [
                (opacity = 1) => `rgba(0, 0, 255,${opacity})`,
                (opacity = 1) => `rgba(255, 0, 0,${opacity})`,
              ],
            },
          ],
        }}
        width={
          Dimensions.get("window").width - Dimensions.get("window").width / 10
        }
        height={300}
        fromZero={true}
        yAxisInterval={20}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          fillShadowGradientOpacity: 1,
          color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 2,
          propsForLabels: { fontWeight: "bold", color: "red" },
          barRadius: 5,
          barPercentage: Dimensions.get("window").width / 160,
        }}
        showBarTops={false}
        // propsForLabels={{ fontWeight: "bold", fontSize: 16 }}
        withCustomBarColorFromData={true}
        showValuesOnTopOfBars={true}
        style={{ ...styles.chart, borderRadius: 16, padding: 10 }}
      />

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
