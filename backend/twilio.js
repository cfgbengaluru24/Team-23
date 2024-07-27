const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

const sendSMS = (to, body) => {
    console.log('Sending SMS:', { to, body }); // Log the details of the SMS being sent

    return client.messages.create({
        body: body,
        to: to,  // Text this number
        from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then(message => console.log('SMS sent successfully:', message.sid))
    .catch(error => {
        console.error('Failed to send SMS:', error);
        throw error; // Ensure the error is propagated back to the caller
    });
};

module.exports = sendSMS;
