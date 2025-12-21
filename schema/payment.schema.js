const mongoose= require('mongoose');

const paymentSchema= new mongoose.Schema({
    // tid, mode, status
    transiction_id:{
        type:String,
        //this id come from actual payment data where all thigs stored
    },
 
    price:{
      type:Number,
      
    },
    payment_mode:{
      type:String,
      enum:['cash', 'upi','card'],
      default:'cash',
    },

    payment_Status:{
        type:String,
        enum:['paid', 'pending', 'unpaid'],
        default:'pending',
    },

},{timestamp:true});

module.exports= paymentSchema;