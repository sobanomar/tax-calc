// MyContext.js
import React, { createContext, useContext, useRef, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [inputData, setInputData] = useState([]);
  const chartData = useRef();
  const idFilteredData = useRef();

  return (
    <MyContext.Provider
      value={{ inputData, setInputData, chartData, idFilteredData }}
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
