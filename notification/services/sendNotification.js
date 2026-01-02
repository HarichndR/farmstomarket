const admin = require('../config/firebase.config');
async function sendNotification(devicetoken, title, body,type=null,priority) {
    console.log('-->>-->>',body);
    if (!devicetoken)return  {msg:'device token not provided'};
    if (!title && !body) return { msg: 'no title or body found' };
    const message = {
        token: devicetoken,
        notification: {
            title,
            body,

        },
        
    }

    console.log(message);
    try {
        const msg = await admin.messaging().send(message);
        return msg
    } catch (err) {
        console.log('####'+err.message);
        throw new err.message;
    }
};


module.exports = sendNotification;

