const mongoose= require('mongoose');

const AgriMartSchema= new mongoose.Schema({
    shop_name:{
        type:String,
    },
    location: {
        type: {
           type: String, enum: ['Point'],
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
        enum:['verified', 'unverified']
    },
    
});

AgriMartSchema.index({ location: '2dshpere' });
module.exports= AgriMartSchema;