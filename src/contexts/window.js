import React, { createContext, useContext, useEffect, useState } from "react";

export const WindowContext = createContext({});

export function useWindowDimension() {
  return useContext(WindowContext);
}

function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export const WindowProvider = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth, window.innerHeight]);

  const value = {
    width: windowDimensions.width,
    height: windowDimensions.height,
  };
  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

export default WindowProvider;
