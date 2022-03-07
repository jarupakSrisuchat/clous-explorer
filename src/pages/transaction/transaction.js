import { Badge, Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import SubText from "../../components/text/subText";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import { formatCoin, getChainInfo } from "../../utils";
import { getAmount, getTxByHash } from "../../utils/api";
import MenuList from "../blocks/menuList";

export default function Transaction() {
  // 2. Wrap ChakraProvider at the root of your app
  const theme = useThemeContext();
  const { chain, hash } = useParams();
  const chainContext = useChainContext();
  const [transaction, setTransaction] = useState(null);
  const [proposer, setProposer] = useState(null);
  const { width, height } = useWindowDimension();

  useEffect(() => {
    chainContext.setChainName(chain);
  }, [chain]);

  useEffect(async () => {
    if (getChainInfo(chain)) {
      await getTxByHash(chain, hash).then((e) => setTransaction(e));
    }
  }, [chainContext.height]);

  if (!chainContext.info || !transaction) {
    return null;
  }

  let mainCoin = chainContext.info.mainCoin;

  return (
    <Box>
      <Heading className="textOverflow" mb={15}>
        Transaction
        <SubText>{hash}</SubText>
      </Heading>

      <Card width="100%">
        <Text fontSize={24} mb={15}>
          HEADER
        </Text>
        <Divider style={{ height: 0 }} mb={15} />
        <MenuList left={"Hash"} right={hash} />
        <MenuList
          left={"type"}
          right={
            <Badge colorScheme={"green"}>
              {transaction.tx.body.messages[0]["@type"]}
            </Badge>
          }
        />
        <MenuList
          left={"From"}
          right={transaction.tx.body.messages[0].from_address}
        />
        <MenuList
          left={"To"}
          right={transaction.tx.body.messages[0].to_address}
        />
        <MenuList
          left={"Amount"}
          right={
            formatCoin(chain, mainCoin, getAmount(transaction, mainCoin).amount)
              .amount +
            " " +
            formatCoin(chain, mainCoin, getAmount(transaction, mainCoin).amount)
              .denom
          }
        />
        <MenuList
          left={"Fee"}
          right={
            formatCoin(chain, mainCoin, getAmount(transaction, mainCoin).fee)
              .amount +
            " " +
            formatCoin(chain, mainCoin, getAmount(transaction, mainCoin).fee)
              .denom
          }
        />
      </Card>
      <Card width="100%" style={{ marginTop: 15 }}>
        <Text fontSize={24} mb={15}>
          Logs
        </Text>
        <Divider mb={15} />
        <ReactJson
          name={"logs"}
          displayDataTypes={false}
          displayObjectSize={false}
          theme={"bright"}
          src={transaction.tx_response.logs}
          style={{ maxHeight: 500, overflow: "scroll", margin: 50 }}
        />
      </Card>
      <Card width="100%" style={{ marginTop: 15 }}>
        <Text fontSize={24} mb={15}>
          TX
        </Text>
        <Divider mb={15} />
        <ReactJson
          name={"tx"}
          displayObjectSize={false}
          displayDataTypes={false}
          theme={"bright"}
          src={transaction.tx_response.tx}
          style={{ maxHeight: 500, overflow: "scroll", margin: 50 }}
        />
      </Card>
    </Box>
  );
}
