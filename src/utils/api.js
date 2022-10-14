import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex } from "@cosmjs/encoding";
import axios from "axios";
import BigNumber from "bignumber.js";
import { getChainApi } from ".";
import { apiUrl } from "../cosmos/api";

export async function getBlocks(chain, min, max) {
  let result = [];
  for (var i = min; i <= max; i++) {
    await axios.get(getChainApi(chain) + apiUrl.blocks + i).then(async (e) => {
      let tmp = e;
      let proposer = await getValidatorFromHex(
        chain,
        tmp.data.block.header.proposer_address
      );
      tmp.data.block.header = {
        ...tmp.data.block.header,
        proposer: proposer,
      };
      //   console.log(tmp.data.block.header);
      result.unshift(tmp.data.block);
    });
  }
  return result;
}

export async function getValidatorSet(chain) {
  let validators = null;
  await axios.get(getChainApi(chain) + apiUrl.validatorSets).then((e) => {
    validators = e.data.validators;
  });
  //   let result = [];
  //   for (var i = 0; i < validators.length; i++) {
  //     result[validators[i].proposer_priority] = validators[i];
  //   }
  return validators;
}

export async function getBlock(chain, height) {
  let result = null;

  await getBlocks(chain, height, height).then((e) => {
    result = e[0];
  });

  return result;
}

export async function getTxs(chain, filter) {
  let result = null;
  await axios.get(getChainApi(chain) + apiUrl.txs + filter).then((e) => {
    result = e.data.tx_responses;
  });
  return result;
}

export async function getTxByHash(chain, hash) {
  let result = null;
  await axios.get(getChainApi(chain) + apiUrl.tx + "/" + hash).then((e) => {
    console.log(e.data);
    result = e.data;
  });
  return result;
}

export function getAmount(tx, denom) {
  let result = new BigNumber(0);
  let fee = new BigNumber(0);
  let messages = tx.tx.body.messages;
  let authInfo = tx.tx.auth_info;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i]["@type"] == "/ethermint.evm.v1.MsgEthereumTx") {
      let value = result.plus(BigNumber(messages[i].data.value));
      result = value;
    } else {
      messages[i].amount?.map((e) => {
        e.denom == denom
          ? (result = result.plus(BigNumber(e.amount)))
          : (result = result.plus(BigNumber(0)));
      });
    }
  }

  authInfo.fee?.amount?.map((e) => {
    e.denom == denom
      ? (fee = fee.plus(BigNumber(e.amount)))
      : (fee = fee.plus(BigNumber(0)));
  });

  return {
    amount: result.toString(),
    fee: fee.toString(),
  };
}

export async function getValidatorFromHex(chain, hex) {
  let result = null;
  let validators = await getValidatorSet(chain);
  result = validators.find((e) => {
    let raw = sha256(fromBase64(e.consensus_pubkey.key));
    const address = toHex(raw).slice(0, 40).toUpperCase();
    return address == hex;
  });
  return result;
}

export async function getParams(chain) {
  let result = null;
  let staking = null;
  await axios.get(getChainApi(chain) + apiUrl.params.staking).then((e) => {
    staking = e;
  });
}
