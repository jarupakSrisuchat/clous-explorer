import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import InformationList from "../../components/list/informaion";
import { useChainContext } from "../../contexts/chain";
import { useThemeContext } from "../../contexts/theme";
import { useWindowDimension } from "../../contexts/window";
import { formatCoin, getChainInfo } from "../../utils";
import { getValidatorSet } from "../../utils/api";

export default function Validators() {
  const theme = useThemeContext();
  const { chain } = useParams();
  const chainContext = useChainContext();
  const [validators, setValidators] = useState([]);
  const { width, heigth } = useWindowDimension();

  useEffect(() => {
    chainContext.setChainName(chain);
  }, [chain]);

  useEffect(async () => {
    if (chainContext.chain && getChainInfo(chain)) {
      await getValidatorSet(chain).then((e) => {
        setValidators(e);
      });
    }
  }, [chainContext.chain]);

  if (!chainContext.info || !getChainInfo(chain)) {
    return null;
  }
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <div>
      <Heading mb={15}>Validators</Heading>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
      >
        <Box width={"100%"}>
          <InformationList
            header
            style={{ textAlign: "center", fontWeight: 700 }}
            left={"PIORITY"}
            center={"ADDRESS"}
            right={"VOTING POWER"}
          />
        </Box>
      </Card>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
      >
        {validators.length > 0
          ? validators.map((item, index) => {
              return (
                <InformationList
                  style={{ flexWrap: "wrap" }}
                  left={index}
                  center={
                    <AccountLink address={item.operator_address}>
                      {item.description.moniker}
                    </AccountLink>
                  }
                  right={
                    formatCoin(chain, getChainInfo(chain).mainCoin, item.tokens)
                      .amount +
                    " " +
                    formatCoin(chain, getChainInfo(chain).mainCoin, item.tokens)
                      .denom
                  }
                  leftLabel={"PIORITY"}
                  centerLabel={"ADDRESS"}
                  rightLabel={"VOTING POWER"}
                />
              );
            })
          : null}
      </Card>
    </div>
  );
}
