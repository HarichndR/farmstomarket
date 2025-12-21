const mongoose= require('mongoose');
const paymentSchema= require('./payment.schema');
const BookingStatusSchema=new mongoose.Schema({
    status:{
        type:String,
        default:'pending'
    },
    time:{
        type:Date,
        default:Date.now(),
    }
});
const bookingSchema= new mongoose.Schema({
// think about create price calcalated auotmate
    eqpm_OR_carri_ID:{
        type:mongoose.Schema.Types.ObjectId,
    },
    bookerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:String,
        enum:['carriers', 'equipments', 'manual_equipments'],
        required:true
    },
   
    booking_time:{
      type:Date,
      default:Date.now(),
    },
    payment:{
        type:paymentSchema,
    },
   

    start_time:{
       type:Date, 
    },

    end_time:{
        type:Date,
    },

    work_Location:{
        type:String,
    },

    bookingStatus:{
        type:[BookingStatusSchema]
    },
    bookinguuid:{
        type:String,
    }
    
},{timestamp:true});

const booking= mongoose.model('booking', bookingSchema);

module.exports= booking;

