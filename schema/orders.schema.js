const mongoose= require('mongoose');
const paymentSchema= require('./payment.schema');
const orderStatusSchema= new mongoose.Schema({
status:{
    type:String,
    default:'pending'
},
time:{
    type:Date,
   default:Date.now(),
}
});
const orderSchema= new mongoose.Schema({
// payment, owner, booker, productid, order time , order status,    category for filter,
orderuuid:{
 type:String,
},
product_ID:{
    type:mongoose.Schema.Types.ObjectId,
    refPath:'category'
},
category:{
    type:String,
    enum:['Nursery_and_Agri_Mart','Farmproduct'],
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
},
costomer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},

payment:{
type:paymentSchema,
},

orderStatus:{
    type:[orderStatusSchema],
},

},{timestamp:true});

const order= mongoose.model('order', orderSchema);
module.exports= order;