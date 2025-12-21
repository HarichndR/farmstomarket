const axios = require("axios");
require('dotenv').config();
 async function emailvalidation(Email) {
    try{const response = await axios.get('https://api.zerobounce.net/v2/validate' ,
        {
            params: {
                api_key:process.env.zeroBounceAPI,
                email:Email,
            }
        }
    )
   const data= response.data
   if (data.status === "valid")return true;
   else{return false}
}
    

    catch(err){
        return err;
    }
}
module.exports= emailvalidation;