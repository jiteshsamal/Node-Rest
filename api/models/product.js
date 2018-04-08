const mongoose=require('mongoose');
const productSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Price: { type: Number, required: false },
    Name:{ type: String, required: false },
    Details:{ type: String, required: false }
});

module.exports=mongoose.model('Product',productSchema);