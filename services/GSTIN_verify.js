const axios = require('axios');
async function verifyGSTIN(){
const options = {
  method: 'POST',
  url: 'https://gstin-number-validator.p.rapidapi.com/api',
  params: {
    gstin: '27AAPFU0939F1ZV'
  },
  headers: {
    'x-rapidapi-key':'458380f4bfmsha4a8c130b330efep1b39f6jsn095d48bb350c',//process.env.x_rapid_api_kay,
    'x-rapidapi-host': 'gstin-number-validator.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    key1: 'value',
    key2: 'value'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
    if(response.gstin) return true;
    else return false;
} catch (error) {
	console.error(error);
}


};
module.exports= verifyGSTIN;