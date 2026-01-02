const mongoose= require('mongoose');

const pushNotifictionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    FCMtoken:{
        type:String,

    },
    title:{
    type:String,
    required:true,
    },
    message:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    type:{
        type:String,
        enum:['alert','message','upadte'],
        default:'message'
    },

   sent:{
    type:Boolean,
    default:false
   }
},{timestamps:true});


const pushNotifiction= mongoose.model('pushNotifiction', pushNotifictionSchema);


module.exports=pushNotifiction;