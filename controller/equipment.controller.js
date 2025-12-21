
const { seeder, thresher, tractor, manual_Equipment, FarmingEquipment } = require('../schema/equipments/equipmentsBaseSchema');
const getByDistance = require('../services/getProductByDistance');

const AddEquipment = async (req, res) => {
    try {
        const  ownerID  = req.user.id;
        console.log(ownerID);
        console.log(req.body);
        const { name, description, IMG_URLs, crop, price_per_acer, price_per_QNTL, current_attached_acceseris,//manual EQPMNT
            usage, price_per_day , category} = req.body;
        const location = {
            type: "Point",
            coordinates: req.user.coordinates,
        }
        const commanfields = {
            name,
            description,
            IMG_URLs,
            ownerID,
            location,

        };
        const EquipmentCategorisMap = {

            tractor: { model: tractor, extraFields: { current_attached_acceseris, price_per_acer } },

            thresher: {
                model: thresher, extraFields: {
                    crop, price_per_QNTL
                }
            },

            seeder: {model: seeder, extraFields: {
                    crop, price_per_acer
                }
            },

            manual_Equipment: {
                model: manual_Equipment, extraFields: { usage, price_per_day }
            }
        }

        const Category = EquipmentCategorisMap[category];
        if (!Category) return res.status(400).json({ msg: 'invalid user role' });
        console.log(Category.extraFields);
        const msg = await Category.model.create({
            ...commanfields, ...Category.extraFields
        });
        return res.status(201).json({ msg: "created", msg });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};



//remove, update, getbyid, getall

const deleteEquipments = async (req, res) => {
    try {
        const {eqp_id} = req.params;
        if (!eqp_id) return res.status(400).json({ msg: "can`t get EQPID" });
        const msg = await FarmingEquipment.deleteOne({ _id: eqp_id });
        if (msg.deletedCount == 0) return res.status(404).json({ msg: 'no match found' });
        return res.json({msg:'deleted',msg});

    } catch (err) { return res.status(500).json({ msg: err.message }) };

}



const updateEquipments = async (req, res) => {
    try {
        const {eqp_id}= req.params;
        if (!eqp_id) return res.status(400).json({ msg: 'can`t get EQPID' });
        const updatedData=req.body;
        const msg = await FarmingEquipment.updateOne({ _id: eqp_id }, { $set: { ...updatedData } });
        if (msg.acknowledged == false) return res.status(404).json({ msg: 'error during upadte' });
        if (msg.matchedCount == 0) return res.status(404).json({ msg: 'no id match found' ,msg});
        return res.status(200).json({ msg: 'user updated',msg});
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
}



const getMyEquipments = async (req, res) => {
    try {
        const userID = req.user.id;
        if (!userID) return res.status(404).json({ msg: 'can`t get userid' });
        const data = await FarmingEquipment.find({ ownerID: userID });
        if (!data) return res.status(204).json({ msg: "Equipments not find " });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}



const getAllEquipmentsByDistance = async (req, res) => {
    try {
        const data = await getByDistance(FarmingEquipment, req.user.coordinates[0], req.user.coordinates[1]);
        if (!data) return res.status(200).json({ msg: 'can`t get equipments' });
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
}




module.exports = {
    AddEquipment,
    deleteEquipments,
    updateEquipments,
    getMyEquipments,
    getAllEquipmentsByDistance
}
