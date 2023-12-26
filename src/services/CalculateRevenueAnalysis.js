import axios from 'axios';

const url = "http://18.205.239.27:5000/analysis";

export const calculateRevenueAnalysis = async (finalData) => {
  try {
    console.log("Calculating...");
    const response = await axios.post(url, finalData, {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
    });

    // Check if the request was successful
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Return the Axios response object
    return response;
  } catch (error) {
    console.error("Error :", error.message);
    return error.message;
    // Handle errors here
  }
};
