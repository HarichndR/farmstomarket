const {decodeJWT}= require('../services/JWTtoken');

const checkUserAutho=(req, res, next)=>{
const token= req.cookies.token;
//console.log(token);
if(!token) return res.status(401).json({msg:'token not get from cookie'});

const user= decodeJWT(token);

if(!user)return res.status(401).json({msg:'token is expired'});
req.user=user;

console.timeEnd('autho');
next();

}

module.exports= checkUserAutho;