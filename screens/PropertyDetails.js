import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../Components/Heading";
import DataField from "../Components/DataField";
import InputField from "../Components/InputField";
import Papa from "papaparse";
import { Asset } from "expo-asset";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import PreviousAndNextButton from "../Components/PreviousAndNextButton";

const noEntryData = {
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
};

const PropertyDetails = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const dataById = useRef();
  const [isFetching, setisFetching] = useState(true);
  const propertyNumber = useRef(0);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // expo-asset file loading
      // const source = require("../assets/properties_data.csv");
      // const csvAsset = Asset.fromModule(source);
      // await csvAsset.downloadAsync();
      // const localUri = csvAsset.localUri;
      // const content = await fetch(localUri).then((response) => response.text());

      const csvAsset = Asset.fromModule(
        require("../assets/properties_data.csv")
      );
      await csvAsset.downloadAsync();
      const localUri = csvAsset.localUri;

      // Use expo-file-system for web and mobile
      let content;

      if (Platform.OS === "web") {
        const response = await fetch(localUri);
        content = await response.text();
      } else {
        const csvModule = await Asset.fromModule(
          require("../assets/properties_data.csv")
        ).downloadAsync();
        content = await FileSystem.readAsStringAsync(csvModule.localUri);
      }
      console.log(content);

      const parsedData = Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parsedData);
      setisFetching(false);
      // console.log("Parsed Data: ", parsedData.length);
    } catch (error) {
      console.error("File Reading Error:", error.message);
    }
  };

  const handleInputChange = (id) => {
    setInputText(id);
    // setDataById(data.filter((item) => item.prop_id === id));
    dataById.current = data.filter((item) => item.prop_id === id);
    const currentData = dataById.current[propertyNumber.current];
    updateData(currentData);
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
      setFormData(noEntryData);
    }
  };

  const handlePrevious = () => {
    // Logic for Previous button
    propertyNumber.current -= 1;
    updateData(dataById.current[propertyNumber.current]);
    console.log(propertyNumber.current);
  };

  const handleNext = () => {
    // Logic for Next button
    propertyNumber.current += 1;
    updateData(dataById.current[propertyNumber.current]);
    console.log(propertyNumber.current);
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

        {/* Input Field */}
        <View
          style={{
            marginVertical: 10,
            width: 300,
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
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
            placeholder="Type here..."
            onChangeText={(id) => handleInputChange(id)}
            keyboardType="numeric"
            value={inputText}
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
            marginVertical: 30,
            alignItems: "center",
          }}
        >
          <InputField
            text={"آپ کی رائے میں اس پراپرٹی کا پراپرٹی ٹیکس کیا ہونا چاہیے؟"}
          />
          <InputField
            text={
              "اگر جواب دہندہ پراپرٹی ٹیکس کا اندازہ نہیں لگا سکا تو -99 درج کریں"
            }
          />
          <InputField
            text={"آپ کی رائے میں اس پراپرٹی کا موجودہ پراپرٹی ٹیکس کیا ہے؟"}
          />
        </View>

        {/* Next Previous Button  */}
        <PreviousAndNextButton
          inputText={inputText}
          handleNextPress={handleNext}
          handlePreviousPress={handlePrevious}
          propertyNumber={propertyNumber.current}
        />
      </View>
    </ScrollView>
  );
};

export default PropertyDetails;
