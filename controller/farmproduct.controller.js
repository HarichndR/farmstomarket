
const farmProduct = require('../schema/product/farmproduct.schema');
const getByDistance = require('../services/getProductByDistance');

// make nlp model or anythink which product name into catgories or get from users
const createProduct = async (req, res) => {
    try {
        const { name, price, bread, quintity, Description, Stutus, productIMG } = req.body;
        console.log('user console',req.user);
        const cord=req.user.coordinates;
        const location={
         type:'Point',
         coordinates:cord,
        }
        const msg = await farmProduct.create({
            name,
            price,
            bread,
            quintity,
            Description,
            Stutus,
            productIMG,
            location,
            
        });
        return res.status(201).json({msg:' product is created',msg});
    }
    catch (err) {
        return res.json({msg:err});
    }
};
    



const getFarmProductsByDistance=async (req, res)=>{
    try{
//const {longitiude, latitude, maxDistance, minDistance}= req.body;

 //const getByDistance=async(model, longitude, latitude, minDistance=0, maxDistance=20000, otions.category)
 const user = req.user;
 const products= await getByDistance(farmProduct,user.coordinates[0] , user.coordinates[1]);
 if(!products)return res.send('products not found');
 return res.json(products);
    }
    catch(err){return res.status(500).json(err)};
}



const deleteProductById=async(req, res)=>{
    try{
const{productId}= req.params;
if(!productId) return res.status(400).json({msg:'product id not provided '})
const productdelteUpdates= await farmProduct.deleteOne({_id:productId});
if(productdelteUpdates.deleteCount==0)return res.status(404).json({msg:' id not match any product'});
return res.status(200).json({msg:'product delete sucessfully'})
    }
    catch(err){
        return res.status(500).json({msg:err.messege});
    }
}
module.exports= {createProduct, getFarmProductsByDistance, deleteProductById};