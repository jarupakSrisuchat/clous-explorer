import { Stack } from "@chakra-ui/react";

export default function ColumnList({
  left,
  middle,
  right,
  style,
  leftLabel,
  middleLabel,
  rightLabel,
}) {
  // 2. Wrap ChakraProvider at the root of your app

  const labelStyle = {
    fontSize: 12,
    color: "grey",
  };

  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      justifyContent={"space-between"}
      padding={3}
      width={"100%"}
      style={style}
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
        <div>{left}</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          paddingRight: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={labelStyle}>{middleLabel}</div>
        <div style={{ width: "50%" }} className="textOverflow">
          {middle}
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
        <div>{right}</div>
      </div>
    </Stack>
  );
}
