import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const defaultTheme = {
    mode: "dark",
    colors: {
      primary: "#14AAFF",
      secondary: "#AEF7F2",
      background: "0B0B0F",
      card: "#232328",
      disable: "#69686D",
      text: "#FFF",
    },
  };

  const [theme, setTheme] = useState(defaultTheme);

  const value = {
    theme,
  };
  return (
    <ThemeContext.Provider value={value.theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
