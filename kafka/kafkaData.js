const KafkaData = {
    OrderReq: { topic: 'req_order', Group: 'sendPushNotification-service', partition: '' },
    OrderConfirm: { topic: 'confirm_order', Group: 'order-save-db-service', partition: '' },
    BookingReq: { topic: 'req_booking', Group: 'sendPushNotification-service', partition: '' },
    BookingConfirm: { topic: 'confirm_booking', Group: 'Booking-save-db-service', partition: '' },
    PushNotification: { topic: 'sendPushNotification', Group: 'Notification-service', partition: '' }
};

module.exports = {KafkaData};