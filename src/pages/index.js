import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../components/navbar";
import SideBar from "../components/sidebar";
import { useChainContext } from "../contexts/chain";
import { useThemeContext } from "../contexts/theme";
import { useWindowDimension } from "../contexts/window";
import Block from "./blocks/block";
import Blocks from "./blocks/blocks";
import Dashboard from "./dashboard/dashboard";
import Transaction from "./transaction/transaction";
import Validators from "./validators/validator";

export const Index = () => {
  // 2. Wrap ChakraProvider at the root of your app
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const theme = useThemeContext();
  const chainContext = useChainContext();
  const { width, height } = useWindowDimension();
  useEffect(() => {
    chainContext.toggleTrigger();
    const interval = setInterval(() => {
      chainContext.toggleTrigger();
    }, 10000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <Flex
      justifyContent={"space-evenly"}
      height={"100vh"}
      style={{ overflow: "hidden" }}
    >
      <SideBar />
      <Box
        width={"100%"}
        pr={width < 1024 ? 10 : 10}
        pl={width < 1024 ? 10 : 6}
        style={{ overflow: "scroll" }}
      >
        <Navigation onOpen={onOpen} btnRef={btnRef} />
        <Routes>
          <Route path="/:chain" element={<Dashboard />} />
          <Route path="/:chain/blocks" element={<Blocks />} />
          <Route path="/:chain/validators" element={<Validators />} />
          <Route path="/:chain/blocks/:number" element={<Block />} />
          <Route path="/:chain/transaction/:hash" element={<Transaction />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default Index;
