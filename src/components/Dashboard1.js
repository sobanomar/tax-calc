import React, { useRef, useState } from "react";
import Heading from "../components/Heading";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ATRGraphChart from "../components/ATRGraphChart";
import { formatPropVal } from "../Utils/FormatPropertyValue";
import { LineChart } from "react-native-chart-kit";

const Dashboard1 = ({ navigation }) => {
  const [inputId, setInputId] = useState("");
  const [csvData, setCsvData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

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
  };

  const handleSubmit = () => {
    // console.log(taxRates, inputValues);

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
      setIsSubmitted(true);
      // handleDownloadCSV();
    } else {
    }
  };

  const [inputValues, setInputValues] = useState({
    house1: "",
    house2: "",
    house3: "",
    house4: "",
    house5: "",
  });

  const [taxRates, setTaxRates] = useState({
    house1: 0,
    house2: 0,
    house3: 0,
    house4: 0,
    house5: 0,
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
    // console.log(isFormFilled);
    let filled = false;
    if (
      inputValues.house1 !== "" &&
      inputValues.house2 !== "" &&
      inputValues.house3 !== "" &&
      inputValues.house4 !== "" &&
      inputValues.house5 !== ""
    )
      filled = true;
    else filled = false;
    setIsFormFilled(filled);
  };

  const handleInputChange1 = (id) => {
    setInputId(id);
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

  const getHomeNumber = (house) => {
    switch (house) {
      case "house1":
        return "گھر 1";
      case "house2":
        return "گھر 2";
      case "house3":
        return "گھر 3";
      case "house4":
        return "گھر 4";
      case "house5":
        return "گھر 5";
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: "90%" }}>
            <Heading text={"Correcting Misperceptions Dashboard"} />
            <Text
              style={{
                marginVertical: 10,
                marginTop: 8,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Enter Property ID:
              <Text style={{ color: "red", fontSize: 20, fontWeight: 400 }}>
                *
              </Text>
            </Text>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                padding: 10,
                borderRadius: 5,
              }}
              placeholder="Type here..."
              onChangeText={handleInputChange1}
              keyboardType="numeric"
            />
            <Text
              style={{
                color: "black",
                marginTop: 50,
                fontSize: 25,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
              }}
            >
              {
                "براہ مہربانی اپنے مطابق ہر گھر کو دیکھ کر اس پر بننے والے ٹیکس کی رقم کا اندازہ لگایئں"
              }
            </Text>

            <Text
              style={{
                color: "red",
                marginTop: 20,
                marginBottom: 50,
                fontSize: 25,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
              }}
            >
              {
                "نوٹ: پراپرٹی ٹیکس کی اوسط شرح ٹیکس کی رقم مکان کی کل قیمت کا کتنے فیصد حصہ کے بارے میں بتاتا ہے۔ یہ ایک شہری کو اپنی پراپرٹی کی کل قیمت پر ٹیکس کے بوجھ کے بارے میں بتاتا ہے۔"
              }
            </Text>

            {["house1", "house2", "house3", "house4", "house5"].map((house) => (
              <View key={house} style={{ marginVertical: 20 }}>
                <Image
                  source={getImagePath(house)}
                  style={[styles.propertyImage, { resizeMode: "contain" }]}
                />
                <View key={house} style={styles.propertyCard}>
                  <Text
                    style={[
                      styles.propertyText,
                      { marginVertical: 10, fontWeight: "bold", fontSize: 25 },
                    ]}
                  >
                    {getHomeNumber(house)}
                  </Text>
                  <Text
                    style={[
                      styles.propertyText,
                      { marginBottom: 10, fontWeight: 700, fontSize: 17 },
                    ]}
                  >
                    Location:{" "}
                    <Text style={{ fontWeight: 400 }}>
                      {" "}
                      {getLocation(house)}{" "}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.propertyText,
                      { marginBottom: 10, fontWeight: 700, fontSize: 17 },
                    ]}
                  >
                    Plot size:{" "}
                    <Text style={{ fontWeight: 400 }}>
                      {" "}
                      {getPlotSize(house)}{" "}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.propertyText,
                      { marginBottom: 10, fontWeight: 700, fontSize: 17 },
                    ]}
                  >
                    Built area:{" "}
                    <Text style={{ fontWeight: 400 }}>
                      {" "}
                      {getBuiltArea(house)}{" "}
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.propertyText,
                      { marginBottom: 15, fontWeight: 700, fontSize: 17 },
                    ]}
                  >
                    Capital value:{" "}
                    <Text style={{ fontWeight: 400 }}>
                      {" "}
                      {formatPropVal(getCapitalValue(house))}{" "}
                    </Text>
                  </Text>
                  {taxRates[house] !== 0 && !isNaN(taxRates[house]) && (
                    <Text
                      style={{
                        marginVertical: 10,
                        fontWeight: "bold",
                        textAlign: "center",
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
                  <TextInput
                    style={[
                      styles.inputField,
                      { marginVertical: 10, width: "90%" },
                    ]}
                    placeholder="Enter Tax Value"
                    onChangeText={(value) => handleInputChange(house, value)}
                    keyboardType="numeric"
                    value={inputValues[house]}
                  />
                </View>
              </View>
            ))}

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

            {isFormFilled && (
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
            )}
            {isSubmitted && (
              <>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Heading text={"ATR vs Prop Value"} />
                  <View>
                    <LineChart
                      data={{
                        labels: ["0.67", "1.57", "3.70", "13.40", "44.50"],
                        datasets: [
                          {
                            data: Object.values(taxRates),
                          },
                        ],
                      }}
                      height={300}
                      width={
                        Dimensions.get("window").width -
                        Dimensions.get("window").width / 10
                      }
                      yAxisLabel=""
                      chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
                      }}
                      bezier
                      style={{ borderRadius: 16 }}
                    />
                  </View>
                </View>
                <View style={styles.propertyCard}>
                  <Button
                    onPress={() => navigation.navigate("HomeStack")}
                    mode="contained"
                    labelStyle={{ color: "#000" }}
                    style={styles.button}
                  >
                    Back To Home
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  propertyText: {
    textAlign: "center",
    // add other styles for text if needed
  },
});

export default Dashboard1;
