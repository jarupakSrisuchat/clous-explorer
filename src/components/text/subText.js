import { Text } from "@chakra-ui/react";

export default function SubText({ style, children }) {
  // 2. Wrap ChakraProvider at the root of your app

  return (
    <Text
      style={style}
      fontSize={"sm"}
      color={"gray.500"}
      colorScheme="blackAlpha"
      className="textOverflow"
    >
      {children}
    </Text>
  );
}
