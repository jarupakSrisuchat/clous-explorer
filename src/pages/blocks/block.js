import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import Link from "../../components/link/baseLink";
import TracsactionList from "../../components/list/transactionList";
import SubText from "../../components/text/subText";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import {
  formatCoin,
  formatTime,
  formatTimeDiff,
  getChainInfo,
} from "../../utils";
import {
  getAmount,
  getBlock,
  getTxs,
  getValidatorFromHex,
} from "../../utils/api";
import MenuList from "./menuList";

export default function Block() {
  // 2. Wrap ChakraProvider at the root of your app
  const theme = useThemeContext();
  const { chain, number } = useParams();
  const chainContext = useChainContext();
  const [blocks, setBlocks] = useState(null);
  const [proposer, setProposer] = useState(null);
  const [txs, setTxs] = useState([]);
  const { width, height } = useWindowDimension();

  useEffect(() => {
    chainContext.setChainName(chain);
  }, [chain]);

  useEffect(async () => {
    if (getChainInfo(chain)) {
      await getBlock(chain, number).then(async (e) => {
        setBlocks(e);
        await getValidatorFromHex(chain, e.header.proposer_address).then(
          (e) => {
            setProposer(e);
          }
        );
      });
      await getTxs(chain, "tx.height=" + number).then((e) => {
        setTxs(e);
      });
    }
  }, [chainContext.height]);

  if (!chainContext.info || !blocks || !proposer) {
    return null;
  }

  let blockTime = formatTime(chain, blocks.header.time);
  let timeDif = formatTimeDiff(blockTime.timestamp, Date.now());

  return (
    <Box>
      <Heading mb={15}>Block #{number}</Heading>
      <Card width="100%">
        <Text fontSize={24} mb={15}>
          HEADER
        </Text>
        <Divider style={{ height: 0 }} mb={15} />
        <MenuList left={"Height"} right={number} />
        <MenuList
          left={"Block time"}
          right={
            <>
              {timeDif}
              <SubText>{blockTime.date + " " + blockTime.time}</SubText>
            </>
          }
        />
        <MenuList
          left={"Block hash"}
          right={blocks.last_commit.block_id.hash}
        />
        <MenuList
          left={"Proposer"}
          right={
            <AccountLink address={blocks.header.proposer.operator_address}>
              {blocks.header.proposer.description.moniker}
            </AccountLink>
          }
        />
        <MenuList
          left={"Number of transaction"}
          right={blocks.data.txs.length}
        />
      </Card>
      <Card width="100%" style={{ marginTop: 15 }}>
        <Text fontSize={24} mb={15}>
          Transactions
        </Text>
        <Divider mb={15} />
        {txs
          ? txs.map((item, index) => {
              let time = item.timestamp.split(/[TZ]+/);
              let mainCoin = chainContext.info.mainCoin;
              let coin = formatCoin(chain, mainCoin, getAmount(item, mainCoin));
              return (
                <TracsactionList
                  key={index}
                  txhash={
                    <Link to={"/" + chain + "/transaction/" + item.txhash}>
                      {item.txhash}
                    </Link>
                  }
                  type={item.tx.body.messages[0]["@type"]}
                  amount={coin.amount + " " + coin.denom}
                  time={time[0] + " " + time[1]}
                />
              );
            })
          : null}
      </Card>
    </Box>
  );
}
