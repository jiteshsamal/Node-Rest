const mongoose=require('mongoose');
const expenseSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Price: { type: Number, required: false },
    Date:Date,
    Reason:{ type: String, required: false },
    Location:{ type: String, required: false },
});

module.exports=mongoose.model('Expense',expenseSchema);