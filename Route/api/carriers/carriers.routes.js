const {AddCarriers, deleteCarriers, updateCarriers, getMyCarriersVehicels, getAllCarriersBydistance}= require('../../../controller/carriers.controller');
const express= require('express');
const router= express.Router();
const checkUserAutho= require('../../../midlewares/checkUserAutho');
const {validate_addCarrier}=require('../../../validatars/carriers.validater');

router.get('/myCarriers', checkUserAutho, getMyCarriersVehicels)

router.get('/getAllCarriers', checkUserAutho, getAllCarriersBydistance);

router.post('/AddCarriers',checkUserAutho,validate_addCarrier,AddCarriers);

router.delete('/delete/:carrierid', checkUserAutho,deleteCarriers);

router.patch('/update/:carrierid',checkUserAutho,updateCarriers);

module.exports= router;

