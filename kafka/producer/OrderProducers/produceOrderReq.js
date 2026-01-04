const kafka = require('../../config/kafka.config');
const { KafkaData } = require('../../kafkaData');

const producer = kafka.producer();

async function produceOrderReq(payload) {
    await producer.connect();
    const value = JSON.stringify(payload);
    await producer.send({
        topic: KafkaData.OrderReq.topic,
        messages: [{ key: payload.orderuuid || String(payload.orderId), value }],
    });
    await producer.disconnect();
}

module.exports = produceOrderReq;
