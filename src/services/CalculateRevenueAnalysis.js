const url = "http://18.205.239.27:5000/analysis";

// Assuming finalData.current is your data
export const calculateRevenueAnalysis = async (finalData) => {
  // const data = finalData;

  try {
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

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the JSON data
    // const jsonData = await response.json();
    return response;
  } catch (error) {
    console.error("Error :", error.message);
    return error.message;
    // Handle errors here
  }
};
