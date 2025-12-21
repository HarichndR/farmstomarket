const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    location: {
        type: {
            type:String, enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: { type: String, }
    },
    
    GSTIN:{
        type:String,

    },
    GSTIN_verificition_stutus:{
        type:String,
        enum:['verified', 'unverified'],
        default:'unverified',

    },
    
});
 
buyerSchema.index({ location: '2dshpere' });
module.exports=buyerSchema;