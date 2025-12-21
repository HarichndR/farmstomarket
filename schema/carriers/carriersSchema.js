const mongoose = require('mongoose');
const reviewsSchema= require('../reviewsSchema');

const carriersVehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },

    IMG_URLs:{
        type:[String],
        required:true
    },
    name: {
        type: String,
        required: true
    },
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    category: {
        type: String,
        enum: ['Small', 'Medium', 'big', 'large' ,'tracto'],
        required: true,
    },
    priceperKM: {
        type: String,
    },
    
    availabiltyStatus:{
        type:String,
        enum:['available', 'booked', 'outOfservice'],
        default:'available'
    },

    bookedShedyule:{
 // implimet logics
    },
    
    description: {
        type: String,
        // write description aboute vehicle
    },

    // usage 
    vehicleLicensVerificationStatus: {
        type: String,
        enum: ['verified', 'unverified', 'blocked'],
        default: 'unverified'
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    Reviews:{
        type:[reviewsSchema],
        

    },

    bookedTime:{
        type:[Object],
    }
},{timestamps:true});timestamps: true 

carriersVehicleSchema.index({location:'2dsphere'});
const CarriersVehicle = mongoose.model('CarriersVehicle', carriersVehicleSchema);


module.exports= CarriersVehicle;


