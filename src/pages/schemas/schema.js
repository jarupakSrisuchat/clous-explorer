import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import AccountLink from "../../components/link/accountLink";
import Link from "../../components/link/baseLink";
import InformationList from "../../components/list/informaion";
import { useChainContext } from "../../contexts/chain";

const Schema = (props) => {
  const {sixApiClient, ...chainContext} = useChainContext();
    const [schema, setSchema] = useState([])
    const {code,chain} = useParams()
    const [isCollapse, setIsCollapse] = useState(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const schema_ = await sixApiClient.nftmngrModule.queryNftSchema(code)
        console.log(schema_)
        setSchema(schema_.data.nFTSchema)
        // console.log(schema_.data)
    },[sixApiClient])

    useEffect(() => {
      chainContext.setChainName(chain);
    }, [chain]);

    
    return(
        <>
        <Heading mb={15}>{code}</Heading>
      <Card
        padding={3}
        style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 10, display: 'flex', rowGap: 20, flexDirection: 'column' }}
      >
        <Button onClick={e => {
          e.preventDefault()
          setIsCollapse(!isCollapse)
        }}>Toggle</Button>
<ReactJson
          name={code}
          collapsed={isCollapse}
          displayDataTypes={false}
          displayObjectSize={false}
          theme={"bright"}
          src={schema}
          style={{ maxHeight: 'fit-content', overflow: "scroll", margin: 50 }}
        />
      </Card>
        </>
    )
}

export default Schema