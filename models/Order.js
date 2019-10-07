const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    products:[{
        product:{
            type:Object,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    user:{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },
    totalPrice:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Order',orderSchema);