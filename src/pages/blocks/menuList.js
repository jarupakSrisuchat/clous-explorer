import { Box } from "@chakra-ui/react";
import React from "react";

export default function MenuList({ left = "key", right = "value" }) {
  {
    return (
      <Box display={"flex"} mb={4} flexWrap={"wrap"} fontWeight={500}>
        <Box width={"22%"} mb={1} minWidth={160} color={"gray.500"}>
          {left}
        </Box>
        <div className="textOverflow">{right}</div>
      </Box>
    );
  }
}
