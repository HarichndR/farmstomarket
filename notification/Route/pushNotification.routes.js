const { deleteFCMbyDevice, setFCMinDB, resetFCMbyDevice, retryFailedNotifiction, sendPushNotifiction, getPushNotifictions } = require('../controller/pushNotification.controller');
const checkUserAutho = require('../../middlewares/checkUserAutho')


const express = require('express');

const router = express.Router();

router.patch('/setFCMtoken', checkUserAutho, setFCMinDB);

router.post('/sendPushNotifiction', checkUserAutho, sendPushNotifiction);

router.post('/retryNotifiction', checkUserAutho, retryFailedNotifiction);

router.patch('/resetFCMbyDevice', checkUserAutho, resetFCMbyDevice);

router.patch('/deleteFCMbyDevice', checkUserAutho, deleteFCMbyDevice);

router.get('/getPushNotifiction', checkUserAutho, getPushNotifictions);


module.exports = router;