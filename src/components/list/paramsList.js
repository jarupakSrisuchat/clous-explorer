import { Flex, Heading, Stat, StatNumber } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { useChainContext } from "../../contexts/chain";
import { formatCoin, isStringHasDecimals, normalizeTime } from "../../utils";
import Card from "../card";
import SubText from "../text/subText";

export default function ParamsList({ title, params = {} }) {
  const chainContext = useChainContext();
  const json = {
    name: "Hi",
    denom: "aatm",
    min: "100",
  };
  const keys = Object.keys(params);
  return (
    <Card style={{ width: "100%" }}>
      <Heading fontSize={"xl"}>{title}</Heading>
      <Flex padding={4} flexWrap={"wrap"}>
        {keys.map((item, index) => {
          console.log(item);
          let value = params[item];
          if (item == "unbonding_time") {
            value = normalizeTime(parseInt(params[item].split("s")[0]));
          }
          if (item == "min_deposit") {
            let coin = formatCoin(
              chainContext.chain,
              value[0].denom,
              value[0].amount
            );
            if (parseFloat(coin.amount) < 0.01) {
              value = "< 0.01 " + coin.denom;
            } else {
              value = BigNumber(coin.amount).toFormat(2) + " " + coin.denom;
            }
          }
          return (
            <Stat minW={150} pl={7} pr={7}>
              <SubText>{item}</SubText>
              <StatNumber className="textOverflow">
                {isStringHasDecimals(value)
                  ? BigNumber(value).toString()
                  : value}
              </StatNumber>
            </Stat>
          );
        })}
      </Flex>
    </Card>
  );
}
