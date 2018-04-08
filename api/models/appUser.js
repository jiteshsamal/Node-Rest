const mongoose=require('mongoose');
const appUserSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, required: false },
    Password:{ type: String, required: false }
});

module.exports=mongoose.model('AppUser',appUserSchema);