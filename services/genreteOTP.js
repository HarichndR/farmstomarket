function generateOTP() {
    // Generate a 6-digit random number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();  // Convert to string if needed
}
module.exports= generateOTP;