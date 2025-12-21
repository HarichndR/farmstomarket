const mongoose = require("mongoose");


const farmerSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: { type: String, required: true }
    },
    farm_size: { type: String }
});

farmerSchema.index({ location: '2dsphere' });

module.exports = farmerSchema; // Export only the schema
