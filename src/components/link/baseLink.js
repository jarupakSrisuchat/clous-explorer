import { LinkBox, useColorMode } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export default function Link({ children, to, style }) {
  const colorMode = useColorMode().colorMode;
  return (
    <LinkBox
      color={colorMode == "dark" ? "blue.300" : "blue.500"}
      as={ReachLink}
      to={to}
      style={style}
    >
      {children}
    </LinkBox>
  );
}
