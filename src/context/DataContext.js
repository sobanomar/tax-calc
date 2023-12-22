// MyContext.js
import React, { createContext, useContext, useRef, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [inputData, setInputData] = useState([]);
  const chartData = useRef(null);
  const idFilteredData = useRef(null);

  const startTimeDash1 = useRef(null);
  const endTimeDash1 = useRef(null);
  const startTimeDash2 = useRef(null);
  const endTimeDash2 = useRef(null);

  return (
    <MyContext.Provider
      value={{
        inputData,
        setInputData,
        chartData,
        idFilteredData,
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
