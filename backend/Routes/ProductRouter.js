const ensureAuthenticated = require('../Middleware/Auth');
const express = require('express');
const cors= require('cors');
require('dotenv').config();
const Transaction = require('../Models/Transactions.js');
const mongoose = require('mongoose');
const app = express();

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log("---------Login details---------",req.user);
})

router.post('/transaction', async (req, res)=>{
    await mongoose.connect(process.env.MONGO_CONN)
    const {userid,price,name,description,datetime} = req.body;
    const transaction = await Transaction.create({userid,price,name,description,datetime});
    // console.log(transaction)
    res.json(transaction);
});

router.get('/transactions/:userid', async (req,res)=>{
    await mongoose.connect(process.env.MONGO_CONN);
    const {userid} = req.params;
    const transactions = await Transaction.find({userid:userid});
    console.log("transactions fetched");
    res.json(transactions);
    // console.log('transactions')
})

router.delete('/transaction/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Transaction.findByIdAndDelete({_id:id});
        res.json({ message: 'Transaction deleted' });
    }catch(err){
        res.json({ message:"Internal error"})
    }
});


module.exports = router;