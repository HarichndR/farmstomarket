const mongoose = require('mongoose');
 
const tractorSchema= new mongoose.Schema({
    // cat, current attached acceseris, price per acer, 
    current_attached_acceseris:{
        type:String,
        enum:['Ridger','tiller','Mould Board','rotaware','pestisizer spray']//as per future add more
    },

    price_per_acer:{
        type:String,
        required:true
    },
});
  

module.exports= tractorSchema;