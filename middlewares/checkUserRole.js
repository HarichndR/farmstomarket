

const isUserRolePermited=(valid_user_role)=>(req, res, next)=>{
const user= req.user;
console.log(user.User_Role, valid_user_role);
if(!user) return res.status(401).json({msg:'user not provided'});
console.log(user)
if(user.User_Role!=valid_user_role) return res.status(401).json({msg:'user don`t have access of this service'});

next();
}

module.exports= isUserRolePermited;