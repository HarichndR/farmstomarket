const mongoose = require('mongoose');

const thresherSchema= new mongoose.Schema({
    // crope type price per QNTL, 

    crop:{
        type:String,
        enum:["WHEAT", "RICE", "BARLEY",
            "JOWAR", "BAJRA", "MAIZE",
            "SOYBEAN", "CHANA", "ARHAR ",
            "MOONG ", "URAD ",
            "MASOOR ","GROUNDNUT ", "TIL ",
            "MUSTARD","SUNFLOWER", "ALSISAR "],
        
    },

    price_per_QNTL:{
        type:String,
        
    }
})