'use strict';
module.exports = function(app) {
  let blockchainCtrl = require('./controllers/BlockChainController');
  let webHookCtrl = require('./controllers/WebHookController');

  // todoList Routes
  app.route('/blockchain/getNewWallet')
    .get(blockchainCtrl.getNewWallet)

  app.route('/blockchain/getBalanceOfUSDT/:address')
    .get(blockchainCtrl.getBalanceOfUSDT)

  app.route('/blockchain/tranferUSDT')
    .get(blockchainCtrl.tranferUSDT)
  app.route('/webhook/confirmTransaction/:transactionHash')
    .get(webHookCtrl.confirmTransactions)

};
