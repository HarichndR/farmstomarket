const mongoose= require('mongoose');

const Manual_Farming_EquipmentSchema= new mongoose.Schema({
    // name , description , usage, rating, bookingStutus ownerid

    usage:{
        type:String,
        enum:['seeder', 'grass remover'],// add more as per time
        default:'seeder'
    },

    price_per_day:{
        type:String,
    }
    
});

module.exports= Manual_Farming_EquipmentSchema;

