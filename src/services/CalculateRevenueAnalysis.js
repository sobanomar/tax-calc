const url = "http://18.205.239.27:5000/analysis";

// Assuming finalData.current is your data

export const calculateRevenueAnalysis = (finalData) => {
  const data = finalData;

  // Make a POST request
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if needed
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((apiResponse) => {
      // Store the response in the variable apiResponse
      return apiResponse;
      // You can use the apiResponse variable as needed
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors here
    });
};
