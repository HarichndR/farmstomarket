const express = require('express');
const router= express.Router();

const {AddEquipment,
    deleteEquipments,
    updateEquipments,
    getMyEquipments,
    getAllEquipmentsByDistance}=require('../../../controller/equipment.controller');
const{valid_AddEquipments_inputs}=require('../../../validatars/equpments.validater');
const checkUserAutho=require('../../../midlewares/checkUserAutho');


router.post('/add-equipments', checkUserAutho,valid_AddEquipments_inputs,AddEquipment);

router.patch('/update/:eqp_id', checkUserAutho, updateEquipments);

router.delete('/delete/:eqp_id', checkUserAutho, deleteEquipments);

router.get('/getMyEquipment',checkUserAutho, getMyEquipments);

router.get('/getAllEquipments', checkUserAutho, getAllEquipmentsByDistance);


module.exports= router;