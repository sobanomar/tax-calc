// MyContext.js
import React, { createContext, useContext, useRef, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [inputData, setInputData] = useState([]);
  const chartData = useRef(null);
  const idFilteredData = useRef(null);
  const [dashboardId_2, setDashboardId_2] = useState("");
  const [namedash2, setNameDash2] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const data_dash1 = useRef(null);

  const startTimeDash1 = useRef(null);
  const endTimeDash1 = useRef(null);
  const startTimeDash2 = useRef(null);
  const endTimeDash2 = useRef(null);
  const [survey_funds_values, setsurvey_funds_values] = useState([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  return (
    <MyContext.Provider
      value={{
        namedash2,
        setNameDash2,
        data_dash1,
        selectedValue,
        setSelectedValue,
        dashboardId_2,
        setDashboardId_2,
        inputData,
        setInputData,
        chartData,
        idFilteredData,
        survey_funds_values, // Include additional_funds_values in the context
        setsurvey_funds_values, // Provide the setter function
        startTimeDash1,
        endTimeDash1,
        startTimeDash2,
        endTimeDash2,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
