import { Box, useColorMode } from "@chakra-ui/react";

export default function Card({
  style,
  width = "",
  children,
  padding = 7,
  borderRadius = "lg",
  fontWeight = 700,
  className,
}) {
  // 2. Wrap ChakraProvider at the root of your app
  const colorMode = useColorMode();

  return (
    <Box
      style={style}
      width={width == "" ? "none" : width}
      fontWeight={fontWeight}
      padding={padding}
      boxShadow={"md"}
      borderRadius={borderRadius}
      bg={colorMode.colorMode == "dark" ? "#283046" : "#FFF"}
      textColor={colorMode.colorMode == "dark" ? "#FFF" : "#000"}
      className={className}
    >
      {children}
    </Box>
  );
}
