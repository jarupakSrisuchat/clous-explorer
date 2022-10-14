import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import Link from "../../components/link/baseLink";
import InformationList from "../../components/list/informaion";
import { useChainContext } from "../../contexts/chain";

const Schemas = (props) => {
    const {sixApiClient, ...chainContext} = useChainContext();
    const {chain} = useParams()
    const [all, setAll] = useState([])

    useEffect(() => {
        chainContext.setChainName(chain);
      }, [chain]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        console.log('have')
        const allNFTSchema = await sixApiClient.nftmngrModule.queryNftSchemaAll()
        console.log(allNFTSchema)
        setAll(allNFTSchema.data.nFTSchema)
    },[sixApiClient])


    
    return(
        <>
        <Heading mb={15}>All schema</Heading>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
      >
        <Box width={"100%"}>
          <InformationList
            header
            style={{ textAlign: "center", fontWeight: 700 }}
            left={"Name"}
            center={""}
            right={""}
          />
        </Box>
      </Card>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10, display: 'flex', rowGap: 20, flexDirection: 'column' }}
      >
      {all.map((item,index) => {
        console.log(item)
        return(
            <InformationList
                  style={{ flexWrap: "wrap" }}
                  left={<Link to={`${item.code}`}>{item.code}</Link>}
                />
        )
      })}
      </Card>
        </>
    )
}

export default Schemas