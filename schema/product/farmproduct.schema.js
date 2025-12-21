const mongoose = require('mongoose');

const farmproductSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productIMG:{
        type:[String],
        default:[],
    },
    price:{
        type:String,
        required:true,
    },
    bread:{
        type:String,

    },
    Descriptin:{
        type:String,

    },
    Stutus:{
        type:String
    },
    quintity:{
        type:String,

    },
    categories:{
        type:String,
        enum:['Nuts',' vegitables', 'Fruits', 'DryFruits','Grains',
            'Spices and Herbs','Flowers', 'Fibers' ,'Cash_Crops','Beverage_Crops'
        ],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    
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
        //address: { type: String, required: true }
    },
 
},{timestamp:true});
farmproductSchema.index({location:'2dsphere'});
const farmProduct=  mongoose.model('Farmproduct', farmproductSchema);
module.exports= farmProduct;