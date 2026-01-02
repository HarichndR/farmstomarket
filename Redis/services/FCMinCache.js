const RedisClient = require('../config/redis.config');
const { User } = require('../../schema/user');
const setFCMinRedis = async (userId, FCM) => {
    try {
        const msg = await RedisClient.set(userId, JSON.stringify(FCM));
        return msg;
    } catch (err) {
        throw new Error('error on set FCM in redis', err.message);
    }
}

const getFCMinRedis = async (userId) => {
    try {
        const FCMtoken = RedisClient.get(userId);
        if (!FCMtoken) {
            const FCMtoken = await User.findOne({ _id: userId }).select('FCMtoken');
            const msg = await setFCMinRedis(userId, FCMtoken);
            return FCMtoken;
        }
        return FCMtoken;
    } catch (err) {
        throw new Error('error when get FCM from Redis', err.message);
    }
}


module.exports = { setFCMinRedis, getFCMinRedis }