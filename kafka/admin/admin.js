const kafka = require('../config/kafka.config');

const admin = kafka.admin();
async function init(){
await admin.connect();
console.log('admin conected');

const topicsToCreate = [
   {
     topic: 'req_order',
     numPartitions: 3,          // Example partition count; adjust as needed
     replicationFactor: 1,      // Example replication factor; adjust as needed
     replicaAssignment: [],     // Optionally define partition assignments
     configEntries: []          // Optionally define topic-level configurations
   },
   {
     topic: 'confirm_order',
     numPartitions: 3,
     replicationFactor: 1,
     replicaAssignment: [],
     configEntries: []
   },
   {
     topic: 'req_booking',
     numPartitions: 3,
     replicationFactor: 1,
     replicaAssignment: [],
     configEntries: []
   },
   {
     topic: 'confirm_booking',
     numPartitions: 3,
     replicationFactor: 1,
     replicaAssignment: [],
     configEntries: []
   },
   {
     topic: 'sendPushNotification',
     numPartitions: 3,
     replicationFactor: 1,
     replicaAssignment: [],
     configEntries: []
   },
 ];


 console.log(await admin.listTopics());

/*await admin.createTopics({
   topics:topicsToCreate,
   timeout:10000,
   
})*/
console.log(` new topic Created :`)
}

init();
