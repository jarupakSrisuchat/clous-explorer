import {
  ChevronDownIcon,
  HamburgerIcon,
  SearchIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { chainIndex } from "../../chainConfig";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import { getChainInfo } from "../../utils";

export default function Navigation({ btnRef, onOpen, style }) {
  // 2. Wrap ChakraProvider at the root of your app
  const theme = useThemeContext();
  const { colorMode, toggleColorMode } = useColorMode();
  const chainContext = useChainContext();
  const { width, height } = useWindowDimension();
  const sm = 768;
  const chainList = chainIndex;
  return (
    <Flex
      pt={7}
      pb={7}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
      style={style}
    >
      <Flex
        justifyContent={width < sm ? "space-between" : "flex-start"}
        alignItems={"center"}
        mb={width < sm ? 4 : 0}
        width={width < sm ? "100%" : "35%"}
      >
        <Button
          colorScheme={"blue"}
          mr={4}
          display={width >= 1024 ? "none" : "block"}
        >
          CLOUS EXPLORER
        </Button>
        {chainContext.info ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {chainContext.info.name ? (
                <div className="textOverflow">
                  {chainContext.info.name.toUpperCase()}
                </div>
              ) : (
                <Spinner />
              )}
            </MenuButton>
            <MenuList>
              {chainList.map((item, index) => {
                return (
                  <MenuItem key={index}>
                    {getChainInfo(item).name.toUpperCase()}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        ) : null}
      </Flex>

      <Flex
        pl={width < sm ? 0 : 4}
        width={width < sm ? "100%" : "60%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Input></Input>
        <IconButton icon={<SearchIcon />} ml={5}></IconButton>
        <IconButton
          icon={<SunIcon />}
          onClick={toggleColorMode}
          ml={5}
        ></IconButton>
        <IconButton
          display={width < 1024 ? "block" : "none"}
          icon={<HamburgerIcon />}
          ref={btnRef}
          onClick={onOpen}
          ml={5}
        ></IconButton>
      </Flex>
    </Flex>
  );
}
