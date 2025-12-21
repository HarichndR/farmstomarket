const { randomBytes, createHmac } = require('crypto');
 function hashedPassword(password){   
  const salt = randomBytes(16).toString('hex');
    const hashedpassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');
        return{
      salt,
      hashedpassword
    }

}

module.exports=hashedPassword;