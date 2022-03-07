import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import Link from "../../components/link/baseLink";
import InformationList from "../../components/list/informaion";
import ParamsList from "../../components/list/paramsList";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import { formatTime, formatTimeDiff, getChainInfo } from "../../utils";
import { getBlocks } from "../../utils/api";

const Dashboard = () => {
  const theme = useThemeContext();
  const { chain } = useParams();
  const chainContext = useChainContext();
  const [blocks, setBlocks] = useState([]);
  const windowDimensions = useWindowDimension();

  useEffect(() => {
    chainContext.setChainName(chain);
  }, [chain]);

  useEffect(async () => {
    if (chainContext.height > 20 && getChainInfo(chain)) {
      await getBlocks(
        chain,
        chainContext.height - 10,
        chainContext.height
      ).then((e) => {
        setBlocks(e);
      });
    }
  }, [chainContext.height]);

  if (!chainContext.info) {
    return "404: Failed to load chain info";
  }

  if (!chainContext.info.name) {
    return "405: Invalid chain name";
  }
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>
      <Center flexDirection={"column"}>
        <Heading mb={4}>{chainContext.info.name.toUpperCase()}</Heading>
        <Card padding={8} width={"100%"}>
          <StatGroup textAlign={"center"}>
            <Stat>
              <Box paddingRight={10} paddingLeft={10} minW={100}>
                <StatLabel>Height</StatLabel>
                <StatNumber>{chainContext.height}</StatNumber>
              </Box>
            </Stat>
            <Stat>
              <Box paddingRight={10} paddingLeft={10} minW={100}>
                <StatLabel>Transaction</StatLabel>
                <StatNumber>123</StatNumber>
              </Box>
            </Stat>
            <Stat>
              <Box paddingRight={10} paddingLeft={10} minW={100}>
                <StatLabel>Bond token</StatLabel>
                <StatNumber>123</StatNumber>
              </Box>
            </Stat>
            <Stat>
              <Box paddingRight={10} paddingLeft={10} minW={100}>
                <StatLabel>Inflation</StatLabel>
                <StatNumber>123</StatNumber>
              </Box>
            </Stat>
          </StatGroup>
        </Card>
        {chainContext.params ? (
          <Stack spacing={10} width={"100%"} mt={10}>
            <ParamsList
              title={"Staking params"}
              params={chainContext.params.staking}
            ></ParamsList>
            <ParamsList
              title={"Governance params"}
              params={chainContext.params.gov}
            ></ParamsList>
            <ParamsList
              title={"Slashing params"}
              params={chainContext.params.slashing}
            ></ParamsList>
          </Stack>
        ) : null}

        <Center display={"flex"} width={"100%"} mt={5} flexWrap={"wrap"}>
          <Box className="column50" padding={5}>
            <Card width={"100%"}>
              <Heading>Latest blocks</Heading>
              {blocks.length > 0 ? (
                blocks.map((item, index) => {
                  //   let time = item.header.time.split(/[T.]+/);
                  let blockTime = formatTime(chain, item.header.time);
                  let timeDif = formatTimeDiff(blockTime.timestamp, Date.now());
                  return (
                    <InformationList
                      style={{ marginTop: 10, flexWrap: "wrap" }}
                      left={
                        <Link
                          to={"/" + chain + "/blocks/" + item.header.height}
                        >
                          {item.header.height}
                        </Link>
                      }
                      center={
                        <AccountLink
                          address={item.header.proposer.operator_address}
                        >
                          {item.header.proposer.description.moniker}
                        </AccountLink>
                      }
                      right={item.data.txs.length}
                      rightSecond={timeDif}
                      leftLabel={"HEIGHT"}
                      centerLabel={"PROPOSER"}
                      rightLabel={"TX(s)"}
                      rightSecondLabel={"TIME"}
                    />
                  );
                })
              ) : (
                <Flex width={"100%"} justifyContent={"center"}>
                  <Spinner style={{ alignItems: "center" }} />
                </Flex>
              )}
            </Card>
          </Box>
          <Box className="column50" padding={5}>
            <Card width={"100%"}>
              <Heading>Latest blocks</Heading>
              {blocks.length > 0 ? (
                blocks.map((item, index) => {
                  //   let time = item.header.time.split(/[T.]+/);
                  let blockTime = formatTime(chain, item.header.time);
                  let timeDif = formatTimeDiff(blockTime.timestamp, Date.now());
                  return (
                    <InformationList
                      style={{ marginTop: 10, flexWrap: "wrap" }}
                      left={
                        <Link
                          to={"/" + chain + "/blocks/" + item.header.height}
                        >
                          {item.header.height}
                        </Link>
                      }
                      center={
                        <AccountLink
                          address={item.header.proposer.operator_address}
                        >
                          {item.header.proposer.description.moniker}
                        </AccountLink>
                      }
                      right={item.data.txs.length}
                      rightSecond={timeDif}
                      leftLabel={"HEIGHT"}
                      centerLabel={"PROPOSER"}
                      rightLabel={"TX(s)"}
                      rightSecondLabel={"TIME"}
                    />
                  );
                })
              ) : (
                <Flex width={"100%"} justifyContent={"center"}>
                  <Spinner style={{ alignItems: "center" }} />
                </Flex>
              )}
            </Card>
          </Box>
        </Center>
      </Center>
    </>
  );
};

export default Dashboard;
