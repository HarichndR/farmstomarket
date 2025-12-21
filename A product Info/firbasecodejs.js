const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('path/to/your/serviceAccountKey.json'),
});

// Function to send a notification
async function sendNotification(token, link) {
  const message = {
    notification: {
      title: 'Your Notification Title',
      body: 'Your Notification Body',
    },
    data: {
      // Optional data for custom actions
    },
    token: token,
    // Redirect to the specified link on click
    click_action: link,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Example usage:
const userToken = 'YOUR_USER_TOKEN';
const redirectLink = 'https://www.yourwebsite.com';

sendNotification(userToken, redirectLink);
