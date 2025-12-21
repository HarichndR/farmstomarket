const mongoose=require('mongoose');

const nurserySchema= new mongoose.Schema({
    nursery_name:{
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
    rating:{
        type:String,

    },
    rated_user_count:{
        type:Number,
    }
}); 

nurserySchema.index({ location: '2dshpere' });
module.exports= nurserySchema;