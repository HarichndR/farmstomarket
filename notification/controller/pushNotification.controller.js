const { User } = require('../../schema/user');
const pushNotifiction = require('../schema/pushNotification.schema');

const getDataByFilter = require('../../services/getDataBYfilter');
const { sendNotifiction } = require('../services/sendNotification');

const setFCMinDB = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(400).json({ msg: 'no user id found' });
        const { device, token } = req.body;
        if (!device) return res.status(400).json({ msg: 'no device specifed' });
        if (!token) return res.status(400).json({ msg: 'No FCM token found' });
        const msg = await User.updateOne({ _id: userId }, { $addToSet: { FCMtoken: { device: device, token: token } } });
        if (msg.modifiedCount == 0) return res.status(404).json({ msg: 'no FCM token upadted' });
        return res.status(201).json({ msg: 'FCM token was set' });
    } catch (err) {
        return res.status(500).json({ err: 'error on setFCM token' + err.message });
    }
};







const resetFCMbyDevice = async (req, res) => {
    try {
        const userId = req.user.id;
        const { device, token } = req.body;
        if (!userId) return res.status(400).json({ msg: 'no user id found' });
        if (!device) return res.status(400).json({ msg: 'no device specifed' });
        if (!token) return res.status(400).json({ msg: 'No FCM token found' });
        const msg = await User.updateOne({ _id: userId, 'FCMtoken.device': device }, { $set: { 'FCMtoken.$device': { token: token } } });

        if (msg.modifiedCount == 0) return res.status(404).json({ msg: 'no FCM token upadted' });
    } catch (err) {
        return res.status(500).json({ err: 'error on reset fcm token' + err.message });
    }
}






const deleteFCMbyDevice = async (req, res) => {
    try {
        const userId = req.user.id;
        const { device, token } = req.body;
        if (!userId) return res.status(400).json({ msg: 'no user id found' });
        if (!device) return res.status(400).json({ msg: 'no device specifed' });
        if (!token) return res.status(400).json({ msg: 'No FCM token found' });

        const msg = await User.updateOne({ _id: userId, 'FCMtoken.device': device }, { $pull: { FCMtoken: { device: device } } });
        if (msg.deletedCount == 0) return res.status(404).json({ msg: 'no id match to delete fcm' });
        return res.status(200).json({ msg: 'fcm deleted' });
    } catch (err) {
        return res.status(500).json({ err: 'error when delete fcm' })
    }
}


const getPushNotifictions = async (req, res) => {
    try {
        const { type, sent } = req.query;
        const filter = {
            type: type,
            sent: sent
        }
        const data = await getDataByFilter(pushNotifiction, filter);
        if (!data) return res.status(404).json({ msg: 'no data fund with filters' });

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};


const retryFailedNotifiction = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids) return res.status(400).json({ msg: 'can`t get id' });
        const data = await pushNotifiction.find({ id: { $in: ids } });
        if (!data) return res.status(404).json({ msg: 'no data found' });
        for (let i; i < data.length; i++) {
            const msg = sendNotifiction(data[i].FCMtoken.token, data[i].title, data[i].message);
        }
        return res.status(200).json({ msg: msg });
    }
    catch (err) {
        return res.status(500).json({ err: 'error when retry meassage ' + err.message })
    }
};

const sendPushNotifiction = async (req, res) => {
    try {
        const { token, title, message, type, priority } = req.body;
        const userid = await User.findOne({ 'FCMtoken.token': token }).select('_id');
        //sendNotification(devicetoken, title, body,type,priority)
        const msg = sendNotifiction(token, title, message, type, priority);

        const createpush = await pushNotifiction.create({
            userId: userid,
            FCMtoken: token,
            type: type,
            title: title,

        });

        return res.status(200).json(createpush, msg);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


// exporting tokens
module.exports = { deleteFCMbyDevice, setFCMinDB, resetFCMbyDevice, getPushNotifictions, retryFailedNotifiction, sendPushNotifiction }