const kafka= require('../config/kafka.config');

const producer= kafka.producer();

const createProducer= async (topic, task)=> {
    await producer.connect();
    console.log('producer connected');
    await producer.send({
        topic,
        messages:[{key:task.uuid,value:task}],
    });
    await producer.disconnect();
    console.log('producer disconnected');
    };

    module.exports=createProducer;
