const CarriersVehicle = require('../schema/carriers/carriersSchema');
const getByDistance = require('../services/getProductByDistance');

const AddCarriers = async (req, res) => {
    try{
    const {ownerID} = req.query;
    const location = {
        type: 'Point',
        coordinates: req.user.coordinates,
    };

    const { vehicleNumber,IMG_URLs, name, description, category } = req.body;
    const carriersV = await CarriersVehicle.create({
        vehicleNumber: vehicleNumber,
        IMG_URLs: IMG_URLs,
        ownerID: ownerID,
        category: category,
        name: name,
        description: description,
        location: location
    });
   if(!carriersV) return res.status(404).json({msg:'no data found'});
    res.status(201).json({ msg:'user created id= ', carriersV});
}catch(err){
    if(err.code==11000) return res.status(409).json({msg:'vehicle number  already exist pleas enter other vehicle number'});
    return res.status('500').json({err:err.message});
}
};

const deleteCarriers = async (req, res) => {
  try{
    const { carrierid } = req.params;
    if (!carrierid) return res.json({ msg: 'id not found' });
    const msg = await CarriersVehicle.deleteOne({ _id: carrierid });
    if(deleteCount == 0) return res.status(404).json({msg:'no match in data'});
    return res.status(200).json({ msg: 'deleted',msg });
  }catch(err){
    return res.status(500).json({err:err.message});
  }
}

const updateCarriers = async (req, res) => {
    try {
        const  {carrierid}  = req.params;
        if (!carrierid) return res.status(400).json({ msg: 'id not provided' });
        const newupdated  = req.body;
        
        console.log(newupdated);
        const msg = await CarriersVehicle.updateOne({ _id: carrierid }, { $set: { ...newupdated } })
        if (msg.acknowledged == false) return res.status(404).json({ msg: 'error during upadte' });
        if (msg.matchedCount == 0) return res.status(404).json({ msg: 'no id match found' ,msg});
        return res.status(200).json({ msg: 'user updated',msg});
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const getMyCarriersVehicels=async(req, res)=>{
    try{
    const userid= req.user.id;
    if(!userid) return res.status(400).json({msg:'userid not provided'})
    console.log(userid);
    if(!userid) return res.json({msg:'id not provided'}); 
    const data= await CarriersVehicle.find({ownerID:userid});
    if(!data) return res.json({msg:'carriers not found'});
    console.log(data);
    return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({err:err.message});
    }

}

const getAllCarriersBydistance=async(req, res)=>{
    try{
 const data= await getByDistance(CarriersVehicle,req.user.coordinates[0], req.user.coordinates[1] , 
    // model, longitude, latitude, minDistance=0, maxDistance=200000000, page=1, options=null)=>{
    //const longitudeF=parseFloat(longitude);
    );
    if(!data) return res.status(404).json({msg:'no data found'})
        
    return res.status(200).json(data);
}catch(err){
    return res.status(500).json({err:err.message});
}
}

module.exports = { AddCarriers, deleteCarriers, updateCarriers , getMyCarriersVehicels,getAllCarriersBydistance,getMyCarriersVehicels}
