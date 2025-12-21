
const CarriersVehicle = require('../schema/carriers/carriersSchema');
const { FarmingEquipment } = require('../schema/equipments/equipmentsBaseSchema');
const { v4: uuidv4 } = require('uuid');
const BookingRequist = require('../services/BookingRequest');
//const sendNotifiction= require('../notifiction/services/sendNotifiction');
/*1.Create a booking/carriers,equipments
2.Get all bookings //carriers,equipments
3.Get booking details by ID // carriers,equipments
4.Update booking details //carriers,equipments
5.Delete a booking // carriers,equipments

6.Check availability for a specific time range //carriers,equipments

7. payment 
 */

const req_bookFarmingEquipment = async (req, res) => {
    try {
        
        const { eqpID, ownerID } = req.query;
        const bookerID = req.user.id;
        console.log(eqpID);
        const { start_time, end_time, work_Location } = req.body;
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
        console.log('this me', msg);
        if (msg != 'requist sended') return res.status(400).json({ msg: 'somethings error while send booking requist' });

        return res.status(200).json({ msg: 'requist sended', orderId });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
};


const FarmingEquipmentBookingconfirmation = async (req, res) => {
    const { confirmation } = req.query;
    if (confirmation != 'accepted') {
        //sendNotifiction({body}, bookerID);
        return res.status(401).json({ msg: 'booking rijected' });
    }
    // pass object in body with all data 
    const msg = await confirmBooking(model, req.body.data);
    if (!msg == 'order confirmed') return res.status(400).json({ msg: msg });
    return res.status(201).json({ msg: 'booking confiremed' });
};

const req_bookCarrier = async (req, res) => {
    try {
        const { carrierID, ownerID } = req.query;
        const { bookerID } = req.user.id;
        const { start_time, end_time, work_Location } = req.body;
        const data = {
            carrierOrEQPID: carrierID,
            bookerID: bookerID,
            start_time: start_time,
            end_time: end_time,
            work_Location: work_Location,
            ownerID: ownerID,

        }

        const msg = await BookingRequist(CarriersVehicle, data);
        if (msg != 'requist sended') return res.status(400).json({ msg: 'somethings error while send booking requist' });
        return res.status(201).json({ msg: 'booking requist sended' + msg });

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

        const msg = await confirmBooking(CarriersVehicle, req.body.data);

        if (msg != 'requist sended') return res.status(400).json({ msg: 'somethings error while send booking requist' });

        return res.status(201).json({ msg: 'booking confirmed' + msg });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}









module.exports = { req_bookFarmingEquipment, FarmingEquipmentBookingconfirmation, req_bookCarrier, CarrierBookingConfirmation }