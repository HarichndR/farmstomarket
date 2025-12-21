const createConsumer = require('../createConsumer');
const { getFCMinRedis } = require('../../../Redis/services/FCMinCache');
const sendNotifiction = require('../../../notifiction/services/sendNotifiction');

const { produceSaveBookReqInDBEvent } = require('../../producer/BookingProducers/produceSaveBookRequestInDBEvent');
//grouid, topic name, message




    await createConsumer('sendPushNotifiction-service', 'Booking-Requiest',
        async (topic, partition, message) => {
            const data = message.value.JSON.parse(message.value.toString());
            console.log(data);
            const FCMtoken = await getFCMinRedis(data.ownerID);
            for (token of FCMtoken) {
                const msg = await sendNotifiction(FCMtoken.token, 'New Booking Requist', `time: ${data.start_time} to ${data.end_time}`,//get link for redirect
                );
                const dbsavemsg = await produceSaveBookReqInDBEvent('Booking-request-saveDB', data);
                console.log('its', msg);
                return `requist sended ${msg}`
            }

        })



module.exports = consumeBookingRequest;
