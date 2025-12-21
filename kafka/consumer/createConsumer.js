const kafka= require('../config/kafka.config');


const createConsumer = async(groupid, topic, callback)=>{
    await kafka.consumer({groupid});
    await consumer.connect();
    await consumer.subscribe({
        topic,
        fromBeginning:true,
    });
    await consumer.run({
        eachMessage: async (topic, partition, message)=>{
            callback(topic, partition, message);
        }
    })
}


module.exports=createConsumer;