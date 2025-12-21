const mongoose = require("mongoose");
const permisionsSchema= require('../permissionsSchema');
const ReviewsSchema = require("../reviewsSchema");
const consultantSchema = new mongoose.Schema({
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
        consultant_qulify:{
            type: Boolean,
            default:false,
        },
        Reviwes:{
            type:[ReviewsSchema]
        },
    permissinons:{
        type:[permisionsSchema]
    }
    
    });
    
    consultantSchema.index({ location: '2dshpere' });
    module.exports= consultantSchema;