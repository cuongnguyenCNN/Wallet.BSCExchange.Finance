'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const {ethers} = require("ethers");
module.exports = {
    confirmTransactions : async (req, res)=>{
        const transaction = await providerFromBSCOnMainnet.getTransaction(req.param.transactionHash)
        const payload = req.body;
        if(req.body.status === 1) res.json({message : 'success'})
        if(req.body.status === 0) res.json({message: 'not success'})
    }
}