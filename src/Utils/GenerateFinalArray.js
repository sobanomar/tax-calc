import { checkDataTypes } from "./CheckDataTypes";

//Function to create Array 3 for each corresponding pair
export function generateArray3ForEachPair(arr1, arr2) {
  const array3List = [];
  // Iterate over the arrays and generate Array 3 for each corresponding pair
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    // console.log("Entered in loop");
    const item1 = arr1[i];
    const item2 = arr2[i];

    // Calculate atr
    const atr =
      (parseFloat(item2.preferred_tax.value) / parseFloat(item1.prop_val)) *
      100;
    // console.log("atr calculated: ", atr);

    // Create Array 3
    const array3 = {
      atr: parseFloat(atr),
      preferred_tax_liability: parseInt(item2.preferred_tax.value),
      prop_val: parseInt(item1.prop_val),
      group_type: parseInt(item1.group_type),
      value_bin: parseInt(item1.value_bin),
      v1: parseFloat(item1.v1),
      v2: parseFloat(item1.v2),
      v3: parseFloat(item1.v3),
      onlyuse: item1.onlyuse,
      onlyocc: item1.onlyocc,
    };
    array3List.push(array3);
  }

  // checkDataTypes(array3List);

  return array3List;
}

// prop_id                      int64
// s_onlyuse                   object
// s_onlyocc                   object
// group                       object
// v1                         float64
// v2                         float64
// v3                         float64
// onlyuse                     object
// onlyocc                     object
// prop_val                     int64
// value_bin                    int64
// group_type                   int64
// preferred_tax_liability      int64
// atr                        float64
