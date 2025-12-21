const mongoose = require('mongoose');
const ReveiwsSchema= require('../reviewsSchema');
const CarriersOwnerSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        }
    ,
    coordinates: {
        type: [Number],
        required: true,

    },
    address: {
        type: String,
       required: true
    }},

    Reveiws:{
        type:[ReveiwsSchema],
     }
},{ timestamps: true });

module.exports = CarriersOwnerSchema;