const url = "https://proptaxapp.com/analysis";

// Assuming finalData.current is your data
export const calculateRevenueAnalysis = async (finalData) => {
  // const data = finalData;

  // Make a POST request
  console.log("Calculating...");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed
    },
    body: JSON.stringify(finalData),
  });
  // Parse and return the JSON data
  // const jsonData = await response.json();
  return response;
};
