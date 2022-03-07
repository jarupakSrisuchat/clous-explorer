import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../cosmos/api";
import { getChainInfo } from "../utils";

export const ChainContext = createContext({});

export function useChainContext() {
  return useContext(ChainContext);
}

export const ChainProvider = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [chain, setChainName] = useState("atmos");
  const [info, setInfo] = useState({});
  const [trigger, setTrigger] = useState(0);
  const [params, setParams] = useState(null);

  useEffect(async () => {
    if (info) {
      await getHeight();
      await getParams();
    }
  }, [info, trigger]);

  useEffect(() => {
    setInfo(getChainInfo(chain));
  }, [chain]);

  const getHeight = async () => {
    if (info.api) {
      await axios.get(info.api + apiUrl.blocks_latest).then((e) => {
        setHeight(parseInt(e.data.block.header.height));
      });
    }
  };

  const getParams = async () => {
    if (info.api) {
      let params = new Object();
      params.gov = new Object();
      await axios.get(info.api + apiUrl.params.staking).then((e) => {
        params.staking = e.data.params;
      });
      await axios.get(info.api + apiUrl.params.gov + "/deposit").then((e) => {
        params.gov = { ...params.gov, ...e.data.deposit_params };
      });
      await axios.get(info.api + apiUrl.params.gov + "/tallying").then((e) => {
        params.gov = { ...params.gov, ...e.data.tally_params };
      });
      await axios.get(info.api + apiUrl.params.gov + "/voting").then((e) => {
        params.gov = { ...params.gov, ...e.data.voting_params };
      });
      await axios.get(info.api + apiUrl.params.distribution).then((e) => {
        params.distribution = e.data.params;
      });
      await axios.get(info.api + apiUrl.params.slashing).then((e) => {
        params.slashing = e.data.params;
      });
      console.log(params);
      setParams(params);
    }
  };

  const setChain = (chain) => {
    if (getChainInfo(chain)) {
      setChain(chain);
    } else {
      setChain(null);
    }
  };

  const toggleTrigger = () => {
    setTrigger(Date.now());
  };

  const value = {
    chain,
    setChainName,
    height,
    info,
    toggleTrigger,
    params,
  };
  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};

export default ChainProvider;
