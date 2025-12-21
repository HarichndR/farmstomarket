const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const RedisClient = require('../Redis/config/redis.config');
const {createJWTtoken} = require('../services/JWTtoken');
const {User} = require('../schema/user');
//send otp to mobile 
async function OTPsend(email,Mobile_NO, otp) {
   try{
    console.log(otp, Mobile_NO);
  const message = await client.messages.create({
    body: `OTP ${{...otp}} for verify FARMSTOMARKET Mobile Number`,
    from: '+14697216744',
    to: Mobile_NO,
  });
  const msg=await RedisClient.set(email, JSON.stringify({Mobile_NO, otp}) );
  await RedisClient.expire(email , 500);
    console.log(message);
  return message;
   }
   catch(err){
    console.log(err.message);
  throw new err.message}
};






async function OTPverified(email, UserProvidedOTP){
  console.log('otp verify func', email, UserProvidedOTP);
 let isOTPverified= false; 
 const data=await RedisClient.get(email);
 if(!data) return {msg:'otp expire or not found'};
 const {Mobile_NO, otp}= JSON.parse(data);
 if( UserProvidedOTP == otp){
 isOTPverified= true;
const user= await User.findOne({email});
const token= await createJWTtoken(user);
console.log(token);
if(!token) return new Error('can`t create a token');

return { 
    isOTPverified,
    Mobile_NO,
    token
}
 }
 else {return isOTPverified;}
}

module.exports= {OTPsend, OTPverified};
