const axios = require("axios");
const { ethers } = require("ethers");
const RPC_URL_BSC_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const RPC_URL_BSC_MAINNET = "https://bsc-dataseed.binance.org/";
var providerFromBSCOnTestNet = new ethers.getDefaultProvider(
  RPC_URL_BSC_TESTNET
);
var providerFromBSCOnMainnet = new ethers.getDefaultProvider(
  RPC_URL_BSC_MAINNET
);
async function checkMainNetURL() {
  const apiUrl = "https://bscexchange.finance/api/v1/wallet/configurations";
  let responseResult;
  await axios
    .get(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      responseResult = response.data;
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  if (responseResult[2].name === "mainnet") return providerFromBSCOnMainnet;
  return providerFromBSCOnTestNet;
}
module.exports = {
  checkMainNetURL: checkMainNetURL(),
};
