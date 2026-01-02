
const CarriersVehicle = require('../schema/carriers/carriersSchema');
const { FarmingEquipment } = require('../schema/equipments/equipmentsBaseSchema');
const { v4: uuidv4 } = require('uuid');
const BookingRequist = require('../services/BookingRequest');
//const sendNotifiction= require('../notification/services/sendNotifiction');
/* Booking flow (high level)
    1. Client sends booking request with: booker ID (from auth), equipment/carrier ID, owner ID and desired time range.
    2. Controller extracts IDs and requested time range and validates inputs.
    3. Controller calls `BookingRequist` (services/BookingRequest) which:
         - checks availability for the requested time range
         - if available, produces a Kafka event to notify the owner (owner receives a Firebase/FCM push)
         - if not available, returns an explanatory message
    4. Owner receives the request (via app/FCM) and confirms or rejects the booking using the confirmation endpoint.
    5. On confirmation the controller calls `confirmBooking` (services/confirmBooking) which persists the booking, updates the equipment/carrier `bookedTime`, and produces notifications (e.g., Kafka -> notify booker).
    6. Controller returns appropriate HTTP responses at each step.

    Note: detailed availability and notification logic lives in the services layer to keep controllers thin.
*/

const req_bookFarmingEquipment = async (req, res) => {
    try {
        // extract ids and times
        const { eqpID, ownerID } = req.query;
        const bookerID = req.user && req.user.id ? req.user.id : null;
        const { start_time, end_time, work_Location } = req.body;
        console.log('booking request for eqpID:', eqpID);

        // basic validation
        if (!eqpID || !ownerID || !bookerID || !start_time || !end_time) {
            return res.status(400).json({ msg: 'missing required booking fields' });
        }
        const data = {
            uuid: uuidv4(),
            carrierOrEQPID: eqpID,
            bookerID: bookerID,
            message: `location: ${work_Location} from ${start_time} to ${end_time}`,
            start_time: start_time,
            end_time: end_time,
            work_Location: work_Location,
            ownerID: ownerID,
        }
        console.log(Buffer.byteLength(JSON.stringify(data)));
        const msg = await BookingRequist(FarmingEquipment, data);
        console.log('BookingRequist result:', msg);
        // BookingRequist may return an object with a `msg` on failure (e.g. already booked)
        if (msg && msg.msg) return res.status(400).json({ msg: msg.msg });

        return res.status(200).json({ msg: 'request sent', detail: msg });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
};


const FarmingEquipmentBookingconfirmation = async (req, res) => {
    try {
        const { confirmation } = req.query;
        if (confirmation != 'accepted') {
            return res.status(401).json({ msg: 'booking rejected' });
        }
        // Expecting `data` object in body with booking details produced earlier
        const msg = await require('../services/confirmBooking')(FarmingEquipment, req.body.data);
        if (msg !== 'order confirmed') return res.status(400).json({ msg: msg });
        return res.status(201).json({ msg: 'booking confirmed' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
};

const req_bookCarrier = async (req, res) => {
    try {
        const { carrierID, ownerID } = req.query;
        const bookerID = req.user && req.user.id ? req.user.id : null;
        const { start_time, end_time, work_Location } = req.body;
        if (!carrierID || !ownerID || !bookerID || !start_time || !end_time) {
            return res.status(400).json({ msg: 'missing required booking fields' });
        }
        const data = {
            carrierOrEQPID: carrierID,
            bookerID: bookerID,
            start_time: start_time,
            end_time: end_time,
            work_Location: work_Location,
            ownerID: ownerID,

        }

        const msg = await BookingRequist(CarriersVehicle, data);
        if (msg && msg.msg) return res.status(400).json({ msg: msg.msg });
        return res.status(201).json({ msg: 'request sent', detail: msg });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


const CarrierBookingConfirmation = async (req, res) => {
    try {
        const { confirmation } = req.query;
        if (confirmation != 'accepted') {//sendNotifiction({body}, bookerID);
            return res.status(401).json({ msg: 'booking rijected' });
        }

        const msg = await require('../services/confirmBooking')(CarriersVehicle, req.body.data);
        if (msg !== 'order confirmed') return res.status(400).json({ msg: msg });
        return res.status(201).json({ msg: 'booking confirmed' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}









module.exports = { req_bookFarmingEquipment, FarmingEquipmentBookingconfirmation, req_bookCarrier, CarrierBookingConfirmation }