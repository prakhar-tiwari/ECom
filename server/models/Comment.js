const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('Comment',commentSchema);