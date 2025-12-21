const mongoose = require('mongoose');
const ReveiwsSchema= require('../reviewsSchema');

const equipmentOwnerSchema= new mongoose.Schema({
loction:{
    type:{
        type:String,
        enum:['Point'],
        default:'Point'
    },
    coordinates:{
        type:[Number],
        requred:true,
    },
    address:{
        type:String,
    },


},

 Reveiws:{
    type:[ReveiwsSchema],
 }
});


module.exports= equipmentOwnerSchema;
                