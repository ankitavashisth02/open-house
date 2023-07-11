const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID || "ACe44c70952eafa33f456fc08e6d3df46b"; 

const authToken = process.env.TWILIO_AUTH_TOKEN || "063fc6d5cfdba4c77187de0e555ec25e";
const twilioClient = twilio(accountSid, authToken);

exports.sendSMS=async (phoneNumber, message)=> {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER || "+13613042105",
      to: phoneNumber
    });
    console.log(`SMS sent to ${result.to}`);
  } catch (err) {
    console.error(`Error sending SMS to ${phoneNumber}: ${err.message}`);
  }
};
