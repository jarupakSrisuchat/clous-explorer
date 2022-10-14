export const chainIndex = ["six","six-test"];

export const chainInfo = [
  {
    name: "Six datalayer mainnet",
    chainId: "six-9000",
    rpc: "https://sixnft-rpc.sixprotocol.net:26657",
    api: "https://sixnft-rpc.sixprotocol.net/",
    mainCoin: "stake",
    coins: {
      stake: {
        format: "STAKE",
        decimals: 18,
      },
    },
  },
  {
    name: "Six datalayer testnet",
    chainId: "six-3000",
    rpc: "http://sixnft.fivenet.sixprotocol.net:26657",
    api: "http://sixnft.fivenet.sixprotocol.net:1317",
    sixApi: "http://sixnft.fivenet.sixprotocol.net",
    mainCoin: "stake",
    coins: {
      stake: {
        format: "STAKE",
        decimals: 18,
      },
    },
  },
];
