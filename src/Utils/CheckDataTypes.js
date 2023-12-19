export function checkDataTypes(data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.log("Invalid input. Please provide a non-empty array of objects.");
    return;
  }

  // Get the first object in the array
  const sampleObject = data[0];

  // Iterate over the keys of the sample object
  for (const key in sampleObject) {
    if (sampleObject.hasOwnProperty(key)) {
      const dataType = typeof sampleObject[key];
      console.log(`${key}: ${dataType}`);
    }
  }
}
