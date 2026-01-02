const redis = require("redis");
console.log('hi from redis' + process.env.REDISURL);
const RedisClient = redis.createClient({
    url: process.env.REDISURL,

});

(async () => {
    try {
        await RedisClient.connect();
        console.log('redis connected');

    } catch (err) {
        console.log("redis connect error-->", err);
    }
})();
(async () => {
    const data = await RedisClient.set('hello', 'hello from redis');
    console.log('data', data);
})()


module.exports = RedisClient;
