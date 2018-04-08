const express = require('express');
const router = express.Router();
const tokenverify=require('../middleware/tokenverify');
const expensecontroller=require('../controller/expenses.controller');



router.get('/getExpenses',tokenverify,expensecontroller.getExpenses);

router.post('/addExpenses',tokenverify,expensecontroller.addExpenses);

router.patch('/editExpenses',tokenverify,expensecontroller.editExpenses);

router.delete('/deleteExpenses',tokenverify,expensecontroller.deleteExpenses);

module.exports=router;