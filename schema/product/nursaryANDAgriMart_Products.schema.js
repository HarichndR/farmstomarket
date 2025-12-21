const mongoose = require('mongoose');
const reviewsSchema= require('../reviewsSchema');


const VariesQuantityPriceSchema = new mongoose.Schema({
    quantity: { type: Number, required: true }, 
    price: { type: Number, required: true },
    discount: { 
        type: Number,
    },
    discount_Ends: { 
        type: Date,
    },
});

const NurseryAndAgriMartSchema = new mongoose.Schema({
    productIMGURL: {
        type: [String],
        required: true,
        default: ['url'],
    },
    name: {
        type: String,
        required: true, // Corrected spelling to `required`
    },
    category: { // Corrected spelling to `category`
        type: String, 
        enum: ['Nursery', 'AgriMart'], 
        default: 'AgriMart',
    },
    description: { // Corrected spelling to `description`
        type: String,
        required: true,
    },
    brandName: {
        type: String,
    },
    quantityAndPrice: {
        type: [VariesQuantityPriceSchema], 
    },
    
    
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    reviews: {
        type: [reviewsSchema],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    
}, { timestamps: true });

// Geospatial index for location
NurseryAndAgriMartSchema.index({ location: '2dsphere' });

// Model creation
const ProductForNurseryAndAgriMart = mongoose.model('Nursery_and_Agri_Mart', NurseryAndAgriMartSchema);

module.exports = ProductForNurseryAndAgriMart;
