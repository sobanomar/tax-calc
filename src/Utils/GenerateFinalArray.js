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
      prop_id: parseInt(item1.prop_id), // Convert prop_id to integer if needed
      num: parseInt(item1.num), // Convert num to integer if needed
      atr: atr,
      preferred_tax_liability: parseInt(item2.preferred_tax.value),
      prop_val: parseFloat(item1.prop_val),
      group_type: parseInt(item1.group_type),
      value_bin: parseInt(item1.value_bin),
      v1: 16.34124, // Replace with actual value for v1
      v2: parseFloat(item1.v2),
      v3: parseFloat(item1.v3),
      onlyuse: item1.onlyuse,
      onlyocc: item1.onlyocc,
      prop_val_str:
        (parseFloat(item1.prop_val) / 10000000).toFixed(2) + " crore",
    };

    array3List.push(array3);
  }

  return array3List;
}
