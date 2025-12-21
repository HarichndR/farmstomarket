const { options } = require('../Route/api/products/AgriMartANDnursery.route');
const ProductforNerseryandandAgriMart= require('../schema/product/nursaryANDAgriMart_Products.schema');
const getByDistance= require('../services/getProductByDistance');
const mongoose = require('mongoose'); 

const AddProductNerandAgriMart=async(req, res)=>{
    try{
    const{name, brandName, description,}=req.body;
    let{quantityAndPrice}=req.body;
    if(typeof quantityAndPrice=='string'){
        try{
        quantityAndPrice= JSON.parse(quantityAndPrice);
        console.log(quantityAndPrice);
        }catch(err){
            console.log(err);
            return res.status(401).json({msg:err});
        }
    }

    // category get by user role
    // location get by jwt
    // valiadtion done by valideter
    const user= req.user;
    const location={
        type:'Point',
        coordinates:user.coordinates,
    }
    
    
    console.log(user);
    let category=user.User_Role;
    
 let productIMGURL='';
    const data= await ProductforNerseryandandAgriMart.create({
     name,
     description,
     brandName,
     quantityAndPrice,
     productIMGURL,
     category,
     location,
     createdBy:user.id, 
    });
    res.status(201).json(data);
} catch(err){console.log(err)}
}
   










const getAgriMartANDnuresery=async(req, res)=>{
try{
    const maxDistance=1500000;
    const page=1;//for pegmention
    const category= req.params;
const coordinates=req.user.coordinates;
const data = await getByDistance(ProductforNerseryandandAgriMart, coordinates[0], coordinates[1],0,maxDistance,page, category);

if(!data) return res.status(404).json({msg:' data not found'})
return res.status(200).json({data});
}catch(err){
    console.log(err);
    return res.status(400).json({err});
}
}








// this only for AgriMart and nresery
const getAgriMartProductByUserId=async(req, res)=>{
    try{
    const user= req.user;
    console.log(user)
     const data= await ProductforNerseryandandAgriMart.find({createdBy:user.id, category:'AgriMart'});
     if(!data)return res.status(404).json({msg:'not found'})
        console.log(data)
    return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}






const getNuresryProductByUserId=async(req, res)=>{
    try{
    const user= req.user;
    console.log(user)
     const data= await ProductforNerseryandandAgriMart.find({createdBy:user.id, category:'Nursery'});
     if(!data)return res.status(404).json({msg:'not found'})
        console.log(data)
    return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}







const UpdateAgriMartANDnursery=async(req, res)=>{
    try{
const {productId}= req.params;
const {ArrayOFQauntityObjID}= req.query;
const {updates}= req.body;
if(!productId) return res.status(400).json({msg:'productId not provided'});
if(!ArrayOFQauntityObjID) return res.status(400).json({msg:'ArrayOFQauntityObjID not provided'});
if(!updates) return res.status(400).json({msg:'updates not provided'});
 if(updates.quantityAndPriceUpdates){
    const idsArr= ArrayOFQauntityObjID.split(',').map(id=>new mongoose.Types.ObjectId(id.trim()));
    const arrayFilters=idsArr.map((id, index)=>({[`elem${index}._id`]:new mongoose.Types.ObjectId(id)}));
 console.log('filterArray', arrayFilters);

   if(arrayFilters.length!== updates.quantityAndPriceUpdates.price.length ) return res.status(404).json({msg:'price or discount not match with length of items ids'});
  
   const setUpdates={};
   idsArr.forEach((_, index)=>{
    if(updates.quantityAndPriceUpdates.price){
    setUpdates[`quantityAndPrice.$[elem${index}].price`]=updates.quantityAndPriceUpdates.price[index] || 0}
    if(updates.quantityAndPriceUpdates.discount){
    setUpdates[`quantityAndPrice.$[elem${index}].discount`]= updates.quantityAndPriceUpdates.discount[index] || 0}
   })

    const updatestatus =await ProductforNerseryandandAgriMart.updateOne(
        {_id:productId},
        {$set:setUpdates},
        {arrayFilters}
    )
     return res.status(200).json({msg:'information updated', updatestatus})}
}
    catch(err){
        return res.status(500).json({msg:err.message})
    }


};

const deleteAgriMartANDnrsery=async(req, res)=>{
    try{
    const {productId}= req.params;
    console.log(productID);
    if(!productId) return res.status(400).json({msg:'product id not provided'});

    const productID= new mongoose.Types.ObjectId(productId.trim());
    const productdeletestatus= await ProductforNerseryandandAgriMart.deleteOne({_id:productID});
    console.log(productdeletestatus);
    if(productdeletestatus.deletedCount==0) return res.status(404).json({msg:'user not faund'});
     return res.status(200).json({msg:'agri and nursery product delete',productdeletestatus})
    }
    catch(err){
        return res.status(500).json({msg:`agri and nursery product delete${err.message}`});
    }
}




const deleteAgriMartANDnrseryQauntityAndPrice=async(req, res)=>{
    try{
var{productId}=req.params;

var{itemId}= req.query; 

console.log(productId, itemId);
if(!productId)return res.status(400).json({msg:'product id not provided'});

if(!itemId) return res.status(400).json({msg:'item id is not provided'});
itemId= new mongoose.Types.ObjectId(itemId.trim());
productId= new mongoose.Types.ObjectId(productId.trim());
const itemUpdateStatus= await ProductforNerseryandandAgriMart.updateOne({_id:productId},
 {$pull:{quantityAndPrice:{_id:itemId}}}
);
console.log(itemUpdateStatus);
if(itemUpdateStatus.modifiedCount==0)return res.status(404).json({msg:'itemid not match'});
return res.status(200).json({msg:'item deleted'});
}catch(err){
    return res.status(500).json({msg:err.message})
}
};





module.exports= {AddProductNerandAgriMart, getAgriMartANDnuresery, getAgriMartProductByUserId,UpdateAgriMartANDnursery, deleteAgriMartANDnrsery, deleteAgriMartANDnrseryQauntityAndPrice, getNuresryProductByUserId};