const express = require('express');
const router = express.Router();
const { AddProductNerandAgriMart, getAgriMartANDnuresery, UpdateAgriMartANDnursery, deleteAgriMartANDnrsery, deleteAgriMartANDnrseryQauntityAndPrice, getAgriMartProductByUserId, getNuresryProductByUserId } = require('../../../controller/AgriMartANDnursery.controller');
const { validate_AgriMart_AND_Nursery_input } = require('../../../validators/AgriMartANDnuresery.validator')
const checkUserAutho = require('../../../middlewares/checkUserAutho');


router.post('/aad-agriMart-And-nurseryProducts', validate_AgriMart_AND_Nursery_input, checkUserAutho, AddProductNerandAgriMart);

router.get('/agriMart-and-nurseryProducts/:category', checkUserAutho, getAgriMartANDnuresery);

router.get('/MyAgrimartProduct', checkUserAutho, getAgriMartProductByUserId);

router.get('/MyNurseryProducts', checkUserAutho, getNuresryProductByUserId);

router.patch('/upadte/:productId', checkUserAutho, UpdateAgriMartANDnursery)

router.delete('/deleteAgriNursery/:productId', checkUserAutho, deleteAgriMartANDnrsery);

router.delete('/deleteAgriNursery/quantityAndPrice/:productId', checkUserAutho, deleteAgriMartANDnrseryQauntityAndPrice);

module.exports = router;