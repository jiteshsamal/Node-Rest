const mongoose=require('mongoose');
const expenseSchema= mongoose.Schema({
    Date:Date,
    Price:Number,
    Reason:String,
    Location:String
});

module.exports=mongoose.model('Expense',expenseSchema,);