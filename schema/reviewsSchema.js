const mongoose= require('mongoose');
const ReviewsSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    rating:{type:Number, min: 1, max: 5},

    comment:{type:String, },
   
},{timestamps:true});

module.exports= ReviewsSchema;