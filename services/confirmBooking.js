const booking = require('../schema/booking.schema');

async function confirmBooking(model, data ){
    try{
    const eqpdata = await model.find({ id: data.carrierOrEQPID }).select('_t');
    const msg = await booking.create({
        start_time: data.start_time,
        end_time: data.end_time,
        eqpORcarrierID: data.carrierOrEQPID,
        ownerID: data.ownerID,
        bookerID: data.bookerID,
        category: eqpdata._t
    });
    const updatemsg= await model.updateOne({ _id: data.carrierOrEQPID }, {
        $push: {
            bookedTime: {
                start_time: start_time,
                end_time: end_time
            }
        }
    });
    if (msg.matchedCount == 0)   throw new Error('no match for in data');
    // sendNotifiction({your vehicle is booked + time : data.start time + 'to' + data.end_time}, data.bookerId );

    return 'order confirmed';
    }catch(err){
        throw new Error(err.message);
    }
}

module.exports=confirmBooking;