import { Badge, Box, Stack, useColorMode } from "@chakra-ui/react";
import { useWindowDimension } from "../../contexts/window";

export default function TracsactionList({
  style,
  txhash,
  type,
  amount,
  fee,
  time,
  status,
}) {
  // 2. Wrap ChakraProvider at the root of your app
  const { width, heigth } = useWindowDimension();
  const colorMode = useColorMode().colorMode;

  if (width < 768) {
    return (
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        justifyContent={"space-between"}
        padding={3}
        width={"100%"}
        style={style}
        backgroundColor={colorMode == "dark" ? "" : ""}
      ></Stack>
    );
  } else {
    return (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        padding={1}
        width={"100%"}
        fontWeight={500}
        fontSize={14}
        verticalAlign={"middle"}
        style={style}
      >
        <div
          className="textOverflow"
          style={{ paddingRight: 10, width: "30%", maxWidth: 250 }}
        >
          {txhash}
        </div>
        <div
          style={{
            paddingRight: 10,
          }}
        >
          <Badge colorScheme={"green"}>{type}</Badge>
        </div>
        <div
          style={{
            paddingRight: 10,
          }}
        >
          {amount}
        </div>
        <div style={{ display: "flex" }}>{time}</div>
      </Box>
    );
  }
}
