const validate_AgriMart_AND_Nursery_input=(req, res, next)=>{
    try{
    console.log(req.body);
    let{name, brandName,description, quantityAndPrice}=req.body;
    if(!name)return res.status(400).json({msg:'name not provided'});
    if(!brandName)return res.stutus(400).json({msg:'brandName not provided'});
    if(!description)return res.status(400).json({msg:'description not provided'});
    if(!quantityAndPrice)return res.status(400).json({msg:'quantity or price not provided'});
    

    // if(!quantityAndPrice.quantity)return res.status(401).json({msg:'quantity is requred'});
    // if(!quantityAndPrice.price) return res.status(401).json({msg:'price not provided'});
     }
    catch(err){
        return res.status(401).json(err);
    }
    next();
};

module.exports= {validate_AgriMart_AND_Nursery_input};