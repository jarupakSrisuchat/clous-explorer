import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ChainProvider from "./contexts/chain";
import WindowProvider from "./contexts/window";
import Index from "./pages";

export default function App() {
  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: {
          fontWeight: "700",
        },
      },
      Divider: {
        baseStyle: {
          height: 0,
        },
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("gray.50", "gray.800")(props),
        },
      }),
    },
  });
  return (
    <WindowProvider>
      <ChainProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <Index />
          </ChakraProvider>
        </BrowserRouter>
      </ChainProvider>
    </WindowProvider>
  );
}
