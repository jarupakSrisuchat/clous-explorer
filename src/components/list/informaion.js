import { Box, Stack, useColorMode } from "@chakra-ui/react";
import { useWindowDimension } from "../../contexts/window";

export default function InformationList({
  left,
  center,
  right,
  rightSecond,
  style,
  header,
  leftLabel,
  centerLabel,
  rightLabel,
  rightSecondLabel,
}) {
  // 2. Wrap ChakraProvider at the root of your app
  const { width, heigth } = useWindowDimension();
  const colorMode = useColorMode().colorMode;
  const labelStyle = {
    fontSize: 12,
    color: "grey",
  };

  if (width < 768 && !header) {
    return (
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        justifyContent={"space-between"}
        padding={3}
        width={"100%"}
        style={style}
        backgroundColor={colorMode == "dark" ? "" : ""}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            paddingRight: 10,
            justifyContent: "space-between",
          }}
        >
          <div style={labelStyle}>{leftLabel}</div>
          <div
            style={{ width: "50%", textAlign: "right" }}
            className="textOverflow"
          >
            {left}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            paddingRight: 10,
            justifyContent: "space-between",
          }}
        >
          <div style={labelStyle}>{centerLabel}</div>
          <div
            style={{ width: "50%", textAlign: "right" }}
            className="textOverflow"
          >
            {center}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            paddingRight: 10,
            justifyContent: "space-between",
          }}
        >
          <div style={labelStyle}>{rightLabel}</div>
          <div
            style={{ width: "50%", textAlign: "right" }}
            className="textOverflow"
          >
            {right}
          </div>
        </div>
        {rightSecond ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              paddingRight: 10,
              justifyContent: "space-between",
            }}
          >
            <div style={labelStyle}>{rightSecondLabel}</div>
            <div
              style={{ width: "50%", textAlign: "right" }}
              className="textOverflow"
            >
              {rightSecond}
            </div>
          </div>
        ) : null}
      </Stack>
    );
  } else {
    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          padding={1}
          fontSize={14}
          width={"100%"}
          fontWeight={500}
          style={style}
        >
          <div style={{ paddingRight: 10 }}>{left}</div>
          <div
            className="textOverflow"
            style={{
              textAlign: "center",
              paddingRight: 10,
            }}
          >
            {center}
          </div>
          <div
            className="textOverflow"
            style={{
              textAlign: "end",
              paddingRight: 10,
            }}
          >
            {right}
          </div>
          {rightSecond ? (
            <div
              className="textOverflow informationList"
              style={{ textAlign: "right" }}
            >
              {rightSecond}
            </div>
          ) : null}
        </Box>
      </>
    );
  }
}
