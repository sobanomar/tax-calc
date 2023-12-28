import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useMyContext } from '../context/DataContext';
import AdditionalFund from './AdditionalFund';
import ShortFall from './ShortFall';

const RangeSliderInput = () => {
  const { selectedValue, setSelectedValue } = useMyContext();
  const [options, setOptions] = useState([
    { id: 1, label: 'اضافی فنڈ', value: 'اضافی فنڈ', selected: false },
    { id: 2, label: 'شارٹ فال', value: 'شارٹ فال', selected: false },
  ]);
  const [showAdditionalFund, setShowAdditionalFund] = useState(false);
  const [showShortFall, setShowShortFall] = useState(false);

  const handleOptionPress = (option) => {
    // Update the selected value in the context
    setSelectedValue(option.value);

    // Toggle the visibility of AdditionalFund and ShortFall based on the selected value
    if (option.value === 'اضافی فنڈ') {
      setShowAdditionalFund(true);
      setShowShortFall(false);
    } else if (option.value === 'شارٹ فال') {
      setShowShortFall(true);
      setShowAdditionalFund(false);
    }

    // Update the selected state for each option
    setOptions((prevOptions) =>
      prevOptions.map((prevOption) => ({
        ...prevOption,
        selected: prevOption.value === option.value,
      }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>کیا آپکا شارٹ فال آیا یا اضافی فنڈ</Text>

      {/* Custom touchable elements for options */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.button, option.selected && option.value === 'شارٹ فال' ? styles.selectedButtonRed : (option.selected && option.value === 'اضافی فنڈ' ? styles.selectedButtonGreen : null)]}
          onPress={() => handleOptionPress(option)}
        >
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Conditionally render AdditionalFund or ShortFall based on selected value */}
      {showAdditionalFund && <AdditionalFund />}
      {showShortFall && <ShortFall />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - Dimensions.get('window').width / 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 24,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
  },
  selectedButtonRed: {
    backgroundColor: 'red',
  },
  selectedButtonGreen: {
    backgroundColor: 'green',
  },
});

export default RangeSliderInput;
