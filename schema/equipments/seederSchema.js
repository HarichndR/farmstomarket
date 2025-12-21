const mongoose = require('mongoose');

const seederSchema = new mongoose.Schema({
    // crop, price per quintl, 
    crop: {
        type: String,
        enum: [ "WHEAT",
            "BAJRA", // Pearl Millet
            "JOWAR", // Sorghum
            "MAIZE", // Corn
            "GROUNDNUT", // Peanut
            "BARLEY",
            "RAGI", // Finger Millet
            "RICE", // For dry sowing or direct seeding
            "CHANA", // Gram / Chickpea
            "ARHAR", // Pigeon Pea / Toor Dal
            "MOONG", // Green Gram
            "URAD", // Black Gram
            "MASOOR", // Lentil
            "SOYBEAN",
            "MUSTARD",
            "SESAME",
            "PINUTS", // Til
            "SUNFLOWER",
            "COTTON",
            "CASTOR",
            "FENUGREEK" // Methi
          ]
    },
    price_per_acer:{
        type:String,
    }
});

module.exports=seederSchema;