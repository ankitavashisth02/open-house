const generateOTP = () => {
    const OTP_LENGTH = 6;
    const OTP_CHARS = '0123456789';
    let otp = '';
    for (let i = 0; i < OTP_LENGTH; i++) {
      otp += OTP_CHARS[Math.floor(Math.random() * OTP_CHARS.length)];
    }
    return otp;
  };
  
  module.exports = { generateOTP };
  