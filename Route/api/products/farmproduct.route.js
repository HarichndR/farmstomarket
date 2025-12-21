const express = require('express');
const router = express.Router();
const valid_create_product= require('../../../validatars/product.validater');
const {createProduct, getFarmProductsByDistance, deleteProductById}= require('../../../controller/farmproduct.controller');
const checkUserAutho= require('../../../midlewares/checkUserAutho');
const isUserRolePermited= require('../../../midlewares/checkUserRole');
const User = require('../../../schema/user') ;


router.post('/add-farm-product',checkUserAutho,isUserRolePermited('Farmer') ,valid_create_product, createProduct);

router.get('/getfarmsProducts',getFarmProductsByDistance);

router.delete('/delete/:productId', checkUserAutho,deleteProductById)

module.exports= router;
