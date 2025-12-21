const jwt = require('jsonwebtoken');
require('dotenv').config();
function decodeJWT(token){
const user = jwt.verify(token, process.env.JWT_Secret);
if(!user) return {error:"token nat validate"};
return user;
}


function createJWTtoken(user){
   try{
      
 const payload={
    id:user._id,
    email:user.email,
    User_Role:user.__t, 
    coordinates:user.location.coordinates,
 };
 console.log(user.location,'check for location');
 const token =jwt.sign(payload, process.env.JWT_Secret );
 return token;
 
}
catch(err){
   console.log(err)
}
}
module.exports= {createJWTtoken, decodeJWT};