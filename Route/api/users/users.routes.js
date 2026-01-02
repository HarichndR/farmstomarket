const express = require('express');
const router = express.Router();
const { RegisterUser, userlogin, userlogout, sendOTP, verifyOTP, getUserProfile, updateUserInformationById, forgetPassword, resetPassword } = require('../../../controller/users.controller');
const { registration_input_validation, Login_input_validition } = require('../../../validators/users.validator');

const checkUserAutho = require('../../../middlewares/checkUserAutho');
// const isUserRolePermited= require('../../../midlewares/checkUserRole');


router.get('/token', userlogin);
router.get('/profile', checkUserAutho, getUserProfile);//checkForJWTtokenAuth,



router.post('/Register', registration_input_validation, RegisterUser);

router.post('/login', Login_input_validition, userlogin);

router.post('/logout', checkUserAutho, userlogout);

router.patch('/update', checkUserAutho, updateUserInformationById);

router.post('/sendOTP', sendOTP);

router.post('/verifyOTP', verifyOTP);

router.post('/forgetPassword', forgetPassword);

router.post('/resetPassword', resetPassword);

router.post('/test', (req, res) => {

    const { data, name } = req.body;
    console.log(req.body)
    console.log(typeof data, typeof name);
    res.send(data);
})
module.exports = router;
