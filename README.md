# BSC_EXCHANGE_WALLET
BSC_EXCHANGE_WALLET

Init Project : npm i and npm start

// Route For Information

+ A new Wallet : your_url:port/blockchain/getNewWallet 
=> Server respose client all of information include: address, privateKey, publicKey with purpose save all them in database for related user.

+ Balance in USDT of an address :  your_url:port/blockchain/getBalanceOfUSDT/your-account-address
=> Server respose amount of token of address.

+ Tranfer Token :  your_url:port/blockchain//blockchain/tranferUSDT?amount=''&toAddress=''&privateKeyOfSender=''

=>  Response 'OK' when transaction sent to blockchain.
    After 2s Server will auto request to blockchain to get status of transaction. 
    If transaction is ok, the console will log 'Token sent successfully'
