const valid_AddEquipments_inputs = (req, res, next) => {

    const ownerID  = req.user.id;
    if (!ownerID) return res.status(400).json({ msg: 'can`t get ow ownerid' });
    const { name, description, IMG_URLs, category, crop, price_per_acer, price_per_QNTL, current_attached_acceseris,usage, price_per_day} = req.body;
    if (!req.user.coordinates) return res.status(400).json({ msg: 'can`t get cordinates from req.user' });
   
    if (!name) return res.status(400).json({ msg: 'can`t get name' });
    if (!description) return res.status(400).json({ msg: 'can`t get description' });
    if (!IMG_URLs) return res.status(400).json({ msg: 'can`t get IMG_URLs' });
    if(!category) return res.status(400).json({msg:'can`t get category'});

    if(category== 'seeder'){
        if(!crop) return res.status(400).json({msg:'can`t get crop'});
        if(!price_per_acer) return res.status(400).json({msg:'can`t get price_per_acer'});

    }
    if(category== 'tractor'){
        if(!current_attached_acceseris) return res.status(400).json({msg:'can`t get current_attached_acceseris'}); 
        if(!price_per_acer) return res.status(400).json({msg:'can`t get price_per_acer'});   
    }

    if(category== 'thresher'){
        if(!crop) return res.status(400).json({msg:'can`t get crop'});  
        if(!price_per_QNTL) return res.status(400).json({msg:'can`t get crop'});
    }
    if(category== 'manual_Equipment'){
        if(!price_per_day) return res.status(400).json({msg:'can`t get price_per_day'});
        if(!usage) return res.status(400).json({msg:'can`t get usage'});
    }


    next()
}

module.exports={valid_AddEquipments_inputs};