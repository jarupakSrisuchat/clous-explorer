import BigNumber from "bignumber.js";
import { chainIndex, chainInfo } from "../chainConfig";

export function getChainInfo(chain) {
  let index = chainIndex.indexOf(chain);
  return chainInfo[index];
}

export function getChainRpc(chain) {
  return getChainInfo(chain).rpc;
}

export function getChainApi(chain) {
  return getChainInfo(chain).api;
}

export function formatCoin(chain, _denom, _wei) {
  let decimals = parseInt(getChainInfo(chain).coins[_denom].decimals);
  let amount = BigNumber(_wei).dividedBy(
    10 ** parseInt(getChainInfo(chain).coins[_denom].decimals)
  );
  let denom = getChainInfo(chain).coins[_denom].format;
  return {
    amount: amount.toFormat(),
    denom: denom,
  };
}

export function formatTime(chain, _time) {
  let dateTime = _time.split(/[TZ.]+/);
  let date = dateTime[0].split("-");
  let time = dateTime[1].split(":");
  let timestamp = new Date(
    Date.UTC(date[0], parseInt(date[1]) - 1, date[2], time[0], time[1], time[2])
  );
  return {
    date: timestamp.toDateString(),
    time: timestamp.toTimeString(),
    timestamp: timestamp,
  };
}

export function normalizeTime(timestamp) {
  var diffMs = timestamp;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  if (diffDays > 0) {
    return diffDays + " days";
  } else if (diffHrs > 0) {
    return diffHrs + " hrs";
  } else if (diffMins > 0) {
    return diffMins + " mins";
  } else {
    return parseInt(diffMs / 1000) + "s";
  }
}

export function formatTimeDiff(min, max) {
  var diffMs = max - min;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  if (diffDays > 0) {
    return diffDays + " days ago";
  } else if (diffHrs > 0) {
    return diffHrs + " hrs ago";
  } else if (diffMins > 0) {
    return diffMins + " mins ago";
  } else {
    return parseInt(diffMs / 1000) + "s ago";
  }
}

export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function isStringHasDecimals(value) {
  if (isNumeric(value)) {
    if (value > Math.floor(value)) {
      return true;
    }
  }
  return false;
}
