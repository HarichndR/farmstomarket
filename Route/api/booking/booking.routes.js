const{req_bookFarmingEquipment, FarmingEquipmentBookingconfirmation, req_bookCarrier,CarrierBookingConfirmation}= require('../../../controller/booking.controller');

const express= require('express');
const router= express.Router();

router.post('/requistBooking/FarmingEquipment', req_bookFarmingEquipment);

router.post('/bookingConfirmation/FarmingEquipment', FarmingEquipmentBookingconfirmation);

router.post('/requistBooking/Carriers',req_bookCarrier);

router.post('/bookingConfirmation/Carriers', CarrierBookingConfirmation);


module.exports= router;

