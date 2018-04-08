const mongoose=require('mongoose');
const orderSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Quantity: { type: Number, required: false },
    Product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    Details:{ type: String, required: false }
});

module.exports=mongoose.model('Order',orderSchema);