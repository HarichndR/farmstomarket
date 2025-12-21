/*const createConsumer = require('../createConsumer');
const Booking = require('../../../schema/booking.schema');

await createConsumer('booking-save-DB', 'Booking-req-save-DB', async (topic, partition, message) => {
    try {
        const data = JSON.stringify(message.value.toString());
        const saveBook= await Booking.create(data);
        return `Booking saved ${saveBook}`;
    }catch(err){
        throw new Error(err.message);
      }
    })
*/
