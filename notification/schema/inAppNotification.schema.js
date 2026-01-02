const mongoose = require('mongoose');
// userid, type, message, read, timestamps, 
const inAppNotifictionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: mongoose.Schema.Types.Mixed,
        requred: true,
    },
    link: {
        type: String,
    },
    type: {
        type: String,
        enum: ['alert', 'message', 'upadte'],
        default: 'message'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestapms: true });


const inAppNotifiction = mongoose.model('inAppNotification', inAppNotifictionSchema);
module.exports = inAppNotifiction;
