import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import Link from "../../components/link/baseLink";
import InformationList from "../../components/list/informaion";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import { formatTime, formatTimeDiff, getChainInfo } from "../../utils";
import { getBlocks } from "../../utils/api";

export default function Blocks() {
  // 2. Wrap ChakraProvider at the root of your app
  const theme = useThemeContext();
  const { chain } = useParams();
  const chainContext = useChainContext();
  const [blocks, setBlocks] = useState([]);
  const { width, height } = useWindowDimension();

  useEffect(() => {
    chainContext.setChainName(chain);
  }, [chain]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (getChainInfo(chain)) {
      if (chainContext.height > 50 && getChainInfo(chain)) {
        await getBlocks(
          chain,
          chainContext.height - 50,
          chainContext.height
        ).then((e) => {
          setBlocks(e);
        });
      } else {
        await getBlocks(chain, 1, chainContext.height).then((e) => {
          setBlocks(e);
        });
      }
    }
  }, [chainContext.height]);

  if (!chainContext.info) {
    return "404: Failed to load chain info";
  }

  return (
    <div>
      <Heading mb={15}>Blocks</Heading>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
      >
        <Box width={"100%"}>
          <InformationList
            header
            style={{ textAlign: "center", fontWeight: 700 }}
            left={"#ID"}
            center={"PROPOSER"}
            right={"TX(s)"}
            rightSecond={"TIME"}
          />
        </Box>
      </Card>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
      >
        {blocks.length > 0 ? (
          blocks.map((item, index) => {
            //   let time = item.header.time.split(/[T.]+/);
            let blockTime = formatTime(chain, item.header.time);
            let timeDif = formatTimeDiff(blockTime.timestamp, Date.now());
            return (
              <InformationList
                style={{ marginTop: 10, flexWrap: "wrap" }}
                left={
                  <Link to={"/" + chain + "/blocks/" + item.header.height}>
                    {item.header.height}
                  </Link>
                }
                center={
                  <AccountLink address={item.header.proposer.operator_address}>
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
    </div>
  );
}
