const isAvailable = require('./isAvailable');
const sendNotifiction = require('../notification/services/sendNotification');
const { createEventBookRequest } = require('../kafka/producer/BookingProducers/produceBookEventRequest');
async function BookingRequist(model, data) {
    try {
        console.log('message', data);
        const eqpdata = await model.find({ _id: data.carrierOrEQPID }).select('_t bookedTime',);
        if (eqpdata.bookedTime) {
            if (!isAvailable(eqpdata.bookedTime)) return { msg: 'this already booked for this time ' };
        }
        const msg = await createEventBookRequest(data);
        return `request send ${msg}`;

    }
    catch (err) {

        console.log(err.message);
        throw new Error(err.message);
    }
}


module.exports = BookingRequist;