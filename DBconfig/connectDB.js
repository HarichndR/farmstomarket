const mongoose= require('mongoose');
async function conectDB(URL){
 await mongoose.connect(`${URL}FarmstomarketUserAndProductData`).then(()=>{
    console.log('mogoose connected')}
 )
 .catch(err=> console.error("mongoose connection error"+err))
}
module.exports=conectDB;