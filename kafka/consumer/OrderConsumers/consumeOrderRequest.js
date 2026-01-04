const kafka = require('../../config/kafka.config');
const { KafkaData } = require('../../kafkaData');
const ProductFarm = require('../../../schema/product/farmproduct.schema');
const ProductNer = require('../../../schema/product/nursaryANDAgriMart_Products.schema');

async function startConsumer() {
    const consumer = kafka.consumer({ groupId: 'order-inventory-service' });
    await consumer.connect();
    await consumer.subscribe({ topic: KafkaData.OrderReq.topic, fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const raw = message.value.toString();
                const payload = JSON.parse(raw);
                const { product_ID, category, quantity = 1, variantIndex } = payload;

                if (!product_ID) {
                    console.warn('order-inventory: missing product_ID in payload', payload);
                    return;
                }

                if (category === 'Farmproduct') {
                    // Decrement 'quintity' (string) by quantity
                    const prod = await ProductFarm.findById(product_ID);
                    if (!prod) return console.warn('Farmproduct not found', product_ID);
                    const current = Number(prod.quintity) || 0;
                    const updated = Math.max(0, current - Number(quantity));
                    prod.quintity = String(updated);
                    await prod.save();
                    console.log(`Updated Farmproduct ${product_ID} quantity ${current} -> ${updated}`);
                } else if (category === 'Nursery_and_Agri_Mart') {
                    const prod = await ProductNer.findById(product_ID);
                    if (!prod) return console.warn('Nursery product not found', product_ID);
                    // Requires variantIndex to know which variant to decrement
                    if (typeof variantIndex === 'number' && Array.isArray(prod.quantityAndPrice) && prod.quantityAndPrice[variantIndex]) {
                        const current = Number(prod.quantityAndPrice[variantIndex].quantity) || 0;
                        const updated = Math.max(0, current - Number(quantity));
                        prod.quantityAndPrice[variantIndex].quantity = updated;
                        await prod.save();
                        console.log(`Updated Nursery product ${product_ID} variant ${variantIndex} ${current} -> ${updated}`);
                    } else {
                        console.warn('Nursery product update skipped: variantIndex missing or invalid', { product_ID, variantIndex });
                    }
                } else {
                    console.warn('Unknown category for inventory update', category);
                }
            } catch (err) {
                console.warn('order-inventory consumer error', err && err.message);
            }
        },
    });
}

startConsumer().catch((e) => console.error('Order inventory consumer failed', e && e.message));
