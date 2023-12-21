import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyContext } from "../context/DataContext";
import { getFormattedDate } from "../Utils/getFormattedDate";

const Dashboard1 = ({ navigation }) => {
  const [csvData, setCsvData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { startTimeDash1, endTimeDash1 } = useMyContext();

  useEffect(() => {
    startTimeDash1.current = getFormattedDate();
  }, []);

  const generateCSVContent = () => {
    const formattedCSVData =
      "Location,Plot Size,Built Area,Capital Value,Tax Value,Tax Rate\n";
    return formattedCSVData + "Data1,Data2,Data3,Data4,Data5,Data6\n";
  };

  const handleDownloadCSV = async () => {
    const csvContent = generateCSVContent();
    const path = `${FileSystem.documentDirectory}property_details.csv`;

    await FileSystem.writeAsStringAsync(path, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    setCsvData(csvContent);
    setIsSubmitted(true);
  };

  const handleSubmit = () => {
    const isFormFilled =
      inputValues.house1 !== "0" &&
      inputValues.house2 !== "0" &&
      inputValues.house3 !== "0" &&
      inputValues.house4 !== "0" &&
      inputValues.house5 !== "0";

    if (isFormFilled) {
      const data = {
        House1: inputValues.house1,
        House2: inputValues.house2,
        House3: inputValues.house3,
        House4: inputValues.house4,
        House5: inputValues.house5,
      };
      // console.log(
      //   inputValues.house1,
      //   inputValues.house2,
      //   inputValues.house3,
      //   inputValues.house4,
      //   inputValues.house5
      // );
      axios.post(
        "https://sheet.best/api/sheets/b18c47a7-0c1b-43d1-b159-331fae017dbe",
        data
      );
      handleDownloadCSV();
    } else {
    }
    endTimeDash1.current = getFormattedDate();
    navigation.navigate("HomeStack");
  };

  const [inputValues, setInputValues] = useState({
    house1: "0",
    house2: "0",
    house3: "0",
    house4: "0",
    house5: "0",
  });

  const [taxRates, setTaxRates] = useState({
    house1: null,
    house2: null,
    house3: null,
    house4: null,
    house5: null,
  });

  const handleInputChange = (house, value) => {
    setInputValues((prevValues) => ({ ...prevValues, [house]: value }));
    calculateTaxRate(house, value);
  };

  const calculateTaxRate = (house, value) => {
    const capitalValue = getCapitalValue(house);
    const percentage = (parseFloat(value) / capitalValue) * 100;
    setTaxRates((prevRates) => ({
      ...prevRates,
      [house]: percentage.toFixed(3),
    }));
  };

  const getLocation = (house) => {
    switch (house) {
      case "house1":
        return "Near Ferozepur Road";
      case "house2":
        return "Revenue Cooperative Society College Road";
      case "house3":
        return "Paragon City Barki Road";
      case "house4":
        return "Gulberg V";
      case "house5":
        return "Gulberg III";
      default:
        return "";
    }
  };

  const getPlotSize = (house) => {
    switch (house) {
      case "house1":
        return "5.5 marla";
      case "house2":
        return "10 marla";
      case "house3":
        return "1 Kanal";
      case "house4":
        return "2 Kanal 7 marla";
      case "house5":
        return "4 Kanal";
      default:
        return "";
    }
  };

  const getBuiltArea = (house) => {
    switch (house) {
      case "house1":
        return "1450 sq ft";
      case "house2":
        return "3700 sq ft";
      case "house3":
        return "4700 sq ft";
      case "house4":
        return "10125 sq ft";
      case "house5":
        return "18000 sq ft";
      default:
        return "";
    }
  };

  const getCapitalValue = (house) => {
    switch (house) {
      case "house1":
        return "6700000";
      case "house2":
        return "15700000";
      case "house3":
        return "37000000";
      case "house4":
        return "134000000";
      case "house5":
        return "444000000";
      default:
        return "";
    }
  };

  const getImagePath = (house) => {
    switch (house) {
      case "house1":
        return require("../../assets/house1.png");
      case "house2":
        return require("../../assets/house2.png");
      case "house3":
        return require("../../assets/house3.png");
      case "house4":
        return require("../../assets/house4.png");
      case "house5":
        return require("../../assets/house5.png");
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {["house1", "house2", "house3", "house4", "house5"].map((house) => (
          <React.Fragment key={house}>
            <Image
              source={getImagePath(house)}
              style={[styles.propertyImage, { resizeMode: "contain" }]}
            />
            <View key={house} style={styles.propertyCard}>
              <Text>Location: {getLocation(house)}</Text>
              <Text>Plot size: {getPlotSize(house)}</Text>
              <Text>Built area: {getBuiltArea(house)}</Text>
              <Text>Capital value: {getCapitalValue(house)}</Text>

              <TextInput
                style={styles.inputField}
                placeholder="Enter Tax Value"
                onChangeText={(value) => handleInputChange(house, value)}
                keyboardType="numeric"
                value={inputValues[house]}
              />

              {taxRates[house] !== null && (
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ color: "red" }}>
                    (PKR) {inputValues[house]}
                  </Text>
                  <Text>{" پہ اوسط ٹیکس کی شرح "}</Text>
                  <Text style={{ color: "red" }}>{taxRates[house]}%</Text>
                  <Text>
                    {` گھر ${house.substring(
                      5
                    )} کے لئے آپ کے مطابق بتائے گئے ٹیکس`}
                  </Text>
                </Text>
              )}
            </View>
          </React.Fragment>
        ))}
        <View style={styles.propertyCard}>
          <Button
            onPress={handleSubmit}
            mode="contained"
            labelStyle={{ color: "#000" }}
            style={styles.button}
          >
            Submit
          </Button>
        </View>

        {/* {isSubmitted && (
          <View style={styles.downloadButtonContainer}>
            <Button
              onPress={handleDownloadCSV}
              mode="contained"
              labelStyle={{ color: "#000" }}
              style={styles.button}
            >
              Download CSV
            </Button>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  propertyCard: {
    marginVertical: 16,
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  propertyImage: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "rgb(204, 204, 255)",
    marginVertical: 10,
  },
});

export default Dashboard1;
