const mongoose = require('mongoose');
const permissionsSchema= new mongoose.Schema({
    permisions:{type:String},
    Allow:{type:Boolean, }
},{timestamp:true});

module.exports= permissionsSchema;