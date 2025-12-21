const valid_create_product=(req, res, next)=>{
    try{
    const{name,  price , Description, Stutus,quintity,}=req.body;
    if(!name) return res.status(400).json({msg:'name is required'});
    if(!price) return res.status(400).json({msg:"price is required"});
    if(!Description || Description.length > 80) return res.status(400).json({msg:"Description is required"});
    if(!Stutus) return res.status(400).json({msg:"Stutus is required"});
    if(!quintity) return res.status(400).json({msg:'quintity is required'});

    
    }
    catch(err){
    res.json({msg:err});
    }
    next();
};
module.exports= valid_create_product;