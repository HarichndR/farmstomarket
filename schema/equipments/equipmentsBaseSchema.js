const mongoose = require('mongoose');
const ReviewsSchema= require('../reviewsSchema');
const tractorSchema= require('./tractorSchema');
const thresherSchema= require('./thresherSchema');
const seederSchema= require('./seederSchema');
const Manual_Farming_EquipmentsSchema=require('./manualEquipmentsSchema');

const baseOption = {
    discriminatorKey: 'category',
    collection: 'farming_equipments',
}
const Farming_EquipmentBasesSchema= new mongoose.Schema({
 // name, usage, catgory  , location 
// base Schema availbility, booked and status shedyule working time

name:{
    type:String,
    required:true
},
IMG_URLs:{
    type:[String],
    required:true, 
},

ownerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},

description:{
    type:String,
},

location:{
    type:{
        type:String,
        enum:['Point'],
        default:'Point',
        required:true
    },
    coordinates:{
        type:[Number],
        required:true,
        },

    
},
bookingStatus:{
    type:String,
    enum:['booked', 'availbale', 'outofservice'],
    dafault:['availbale']
},
Reviews:{
    type:[ReviewsSchema],
},

bookedTime:{
    type:[Object],
}

},{timestamps:true}, baseOption);
const FarmingEquipment= mongoose.model('Equipment', Farming_EquipmentBasesSchema);
const tractor= FarmingEquipment.discriminator('tractr',tractorSchema);

const thresher= FarmingEquipment.discriminator('thresher', thresherSchema);

const seeder= FarmingEquipment.discriminator('seeder',seederSchema);

Farming_EquipmentBasesSchema.index({location:'2dsphere'});

const manual_Equipment= FarmingEquipment.discriminator('manual_Equipments',Manual_Farming_EquipmentsSchema )

module.exports={seeder, thresher, tractor, manual_Equipment, FarmingEquipment}