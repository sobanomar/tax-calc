import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import DataField from "../components/DataField";
import InputField from "../components/InputField";
import PreviousAndNextButton from "../components/PreviousAndNextButton";
import Papa from "papaparse";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useMyContext } from "../context/DataContext";
import { getFormattedDate } from "../Utils/getFormattedDate";

const PropertyDetails = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [inputId, setInputId] = useState("");
  const [userName, setUserName] = useState("");
  const dataById = useRef();
  const [isFetching, setisFetching] = useState(false);
  const propertyNumber = useRef(0);
  const [inputEnabled, setInputEnabled] = useState(true);
  const [preferredTaxLiability, setPreferredTaxLiability] = useState(0);
  const [noPreferredTaxLiability, setNoPreferredTaxLiability] = useState(0);
  const [currentTaxLiability, setCurrentTaxLiability] = useState(0);
  const preferredATRValue = useRef(0);
  const currentATRValue = useRef(0);
  // data structure
  const [formData, setFormData] = useState({
    num: {
      name: "Number Of Property",
      value: "-",
    },
    locality_name: {
      name: "Locality Name",
      value: "-",
    },
    land_area_marla: {
      name: "Land Area (Marla)",
      value: "-",
    },
    built_area_sqft: {
      name: "Built Area (sqft)",
      value: "-",
    },
    onlyuse: {
      name: "Use",
      value: "-",
    },
    storeys: {
      name: "Storeys",
      value: "-",
    },
    prop_val: {
      name: "Property Value",
      value: "-",
    },
    rent_val: {
      name: "Rent Value",
      value: "-",
    },
    prop_id: {
      name: "Property ID",
      value: "-",
    },
  });

  const {
    inputData,
    setInputData,
    idFilteredData,
    startTimeDash2,
    endTimeDash2,
  } = useMyContext();

  useEffect(() => {
    const propertiesData = require("../../assets/properties_data.json");
    setData(propertiesData);

    startTimeDash2.current = getFormattedDate();
    console.log("Start Time ", startTimeDash2.current);
    console.log("Last End Time ", endTimeDash2.current);

    // fetchData();
  }, []);

  const fetchData = async () => {
    //   try {
    //     const csvAsset = Asset.fromModule(
    //       require("../../assets/properties_data.csv")
    //     );
    //     await csvAsset.downloadAsync();
    //     const localUri = csvAsset.localUri;
    //     // Use expo-file-system for web and mobile
    //     let content;
    //     if (Platform.OS === "web") {
    //       const response = await fetch(localUri);
    //       content = await response.text();
    //     } else {
    //       const csvModule = await Asset.fromModule(
    //         require("../assets/properties_data.csv")
    //       ).downloadAsync();
    //       content = await FileSystem.readAsStringAsync(csvModule.localUri);
    //     }
    //     // console.log(content);
    //     const parsedData = Papa.parse(content, {
    //       header: true,
    //       skipEmptyLines: true,
    //     }).data;
    //     setData(parsedData);
    //     setisFetching(false);
    //     // console.log("Parsed Data: ", parsedData);
    //   } catch (error) {
    //     console.error("File Reading Error:", error.message);
    //   }
  };

  const handleInputChange = (id) => {
    setInputId(id);
    propertyNumber.current = 0;
    // setDataById(data.filter((item) => item.prop_id === id));
    dataById.current = data.filter((item) => {
      const idNumber = parseInt(id);
      return item.prop_id === idNumber;
    });
    idFilteredData.current = dataById.current;
    const currentData = dataById.current[propertyNumber.current];
    updateData(currentData);
  };

  const handleInputName = (name) => {
    setUserName(name);
  };

  const updateData = (data) => {
    if (data) {
      Object.keys(formData).map((fieldName) => {
        setFormData((prevData) => {
          return {
            ...prevData,
            [fieldName]: {
              ...prevData[fieldName],
              value: data[fieldName],
            },
          };
        });
      });
    } else {
      resetData();
      // setFormData(noEntryData);
    }
  };

  const resetData = () => {
    Object.keys(formData).map((fieldName) => {
      setFormData((prevData) => {
        return {
          ...prevData,
          [fieldName]: {
            ...prevData[fieldName],
            value: "-",
          },
        };
      });
    });
  };

  const handlePrevious = () => {
    // Logic for Previous button
    propertyNumber.current -= 1;
    updateData(dataById.current[propertyNumber.current]);
  };

  const handleNext = () => {
    setInputEnabled(false);

    const newData = { ...formData };

    if (preferredTaxLiability > 0) {
      newData.preferred_tax = {
        name: "Preferred Tax Liability",
        value: preferredTaxLiability,
      };
    }

    if (currentTaxLiability > 0) {
      newData.current_tax = {
        name: "Current Tax Liability",
        value: currentTaxLiability,
      };
    }

    setInputData((prevInputData) => {
      const updatedData = [...prevInputData];
      updatedData[propertyNumber.current] = newData;
      return updatedData;
    });

    if (propertyNumber.current === 10) navigation.navigate("Summary");
    if (propertyNumber.current < 10) {
      setPreferredTaxLiability(0);
      setCurrentTaxLiability(0);
      propertyNumber.current = propertyNumber.current + 1;
      updateData(dataById.current[propertyNumber.current]);
    }
  };

  if (isFetching) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator
          color="rgb(204, 204, 255)"
          style={{ marginTop: 100 }}
          size={"large"}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Heading */}
        <Heading text={"Property Details"} />

        {/* Input ID */}
        <View
          style={{
            marginVertical: 10,
            width: "90%",
          }}
        >
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
              borderColor: !inputEnabled ? "grey" : "#000",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
              color: !inputEnabled ? "grey" : "#000",
            }}
            placeholder="Type here..."
            onChangeText={handleInputChange}
            keyboardType="numeric"
            pointerEvents={inputEnabled ? "auto" : "none"}
            editable={inputEnabled}
            value={inputId.current}
          />
        </View>

        {/* Input Name */}
        <View
          style={{
            marginVertical: 10,
            width: "90%",
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              marginTop: 8,
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Enter your name:
            <Text style={{ color: "red", fontSize: 20, fontWeight: 400 }}>
              *
            </Text>
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: !inputEnabled ? "grey" : "#000",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
              color: !inputEnabled ? "grey" : "#000",
            }}
            placeholder="Type here..."
            onChangeText={handleInputName}
            pointerEvents={inputEnabled ? "auto" : "none"}
            editable={inputEnabled}
            value={userName.current}
          />
        </View>

        {/* Data Fields */}
        <View
          style={{
            width: "90%",
            marginVertical: 10,
          }}
        >
          {Object.keys(formData).map((fieldName) => (
            <DataField
              key={fieldName}
              name={formData[fieldName]?.name}
              value={formData[fieldName]?.value}
            />
          ))}
        </View>

        {/* Property Tax Input */}
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          {preferredTaxLiability > 0 && (
            <Text
              style={{
                marginTop: 30,
                fontSize: 17,
                fontWeight: "bold",
                width: "90%",
                textAlign: "center",
              }}
            >
              {`پراپرٹی ${
                propertyNumber.current + 1
              } کے لیئے آپ کے پسند کردہ پراپرٹی ٹیکس کی رقم `}
              <Text
                style={{ color: "red" }}
              >{`${preferredTaxLiability} روپے`}</Text>
              {` کی اوسط ٹیکس کی شرح `}
              <Text
                style={{ color: "red" }}
              >{`${preferredATRValue.current} %`}</Text>
              {` ہے`}
            </Text>
          )}

          <InputField
            editable={inputId.length === 0}
            text={"آپ کی رائے میں اس پراپرٹی کا پراپرٹی ٹیکس کیا ہونا چاہیے؟"}
            handleInputChange={(value) => {
              preferredATRValue.current = (
                (preferredTaxLiability / formData["prop_val"].value) *
                100
              ).toFixed(3);
              setPreferredTaxLiability(value);
            }}
            value={
              // formData[propertyNumber.current]?.preferred_tax?.value
              preferredTaxLiability !== 0 ? preferredTaxLiability : ""
            }
            keyboardType="numeric"
            // required={true}
          />
          <InputField
            editable={inputId.length === 0}
            text={
              "اگر جواب دہندہ پراپرٹی ٹیکس کا اندازہ نہیں لگا سکا تو -99 درج کریں"
            }
            handleInputChange={(value) => {
              setNoPreferredTaxLiability(value);
            }}
          />
          {currentTaxLiability > 0 && (
            <Text
              style={{
                marginTop: 30,
                fontSize: 17,
                fontWeight: "bold",
                width: "90%",
                textAlign: "center",
              }}
            >
              {`پراپرٹی ${
                propertyNumber.current + 1
              } کے لیئے آپ کے مطابق موجودہ پراپرٹی ٹیکس کی رقم `}
              <Text style={{ color: "red" }}>
                {`${currentTaxLiability}`}روپے
              </Text>
              {`  کی اوسط ٹیکس کی شرح `}
              <Text
                style={{ color: "red" }}
              >{`${currentATRValue.current} %`}</Text>
              {` ہے`}
            </Text>
          )}
          <InputField
            editable={inputId.length === 0}
            text={"آپ کی رائے میں اس پراپرٹی کا موجودہ پراپرٹی ٹیکس کیا ہے؟"}
            handleInputChange={(value) => {
              currentATRValue.current = (
                (currentTaxLiability / formData["prop_val"].value) *
                100
              ).toFixed(3);
              setCurrentTaxLiability(value);
            }}
            value={currentTaxLiability !== 0 ? currentTaxLiability : ""}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Next Previous Button  */}
      <View>
        <PreviousAndNextButton
          inputId={inputId}
          handleNextPress={handleNext}
          handlePreviousPress={handlePrevious}
          propertyNumber={propertyNumber.current}
          userName={userName}
          isDisabled={
            formData["num"].value === "-" ||
            (noPreferredTaxLiability !== -99
              ? preferredTaxLiability === 0 || preferredTaxLiability === ""
              : false)
          }
        />
      </View>
    </ScrollView>
  );
};

export default PropertyDetails;
