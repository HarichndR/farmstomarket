const axios = require('axios');

// Function to convert address into coordinates using LocationIQ
async function getCoordinatesFromAddress(address) {
    const apiKey = process.env.LOCATIONIQ_API_KEY; // Replace with your LocationIQ API key
    const url = `https://us1.locationiq.com/v1/search.php`;

    try {
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                q: address,
                format: 'json' // The response format
            }
        });
        
        // If the response is successful and results are found
        if (response.data.length > 0) {
            const locationData = response.data[0]; // The first result

            ;
            const coordinates = {
                latitude: locationData.lat,
                longitude: locationData.lon
            };
            if(!coordinates) throw new Error('can get coordinates');
            console.log(coordinates);
            return coordinates;
        } else {
            throw new Error('No results found for the given address');
        }

    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}/*
const Geocodio = require('geocodio-library-node');
const geocoder = new Geocodio('YOUR_API_KEY');

const addresses = [
  '1109 N Highland St, Arlington VA',
  '525 University Ave, Toronto, ON, Canada',
  '4410 S Highway 17 92, Casselberry FL',
  '15000 NE 24th Street, Redmond WA',
  '17015 Walnut Grove Drive, Morgan Hill CA'
];

const data =await geocoder.geocode(address)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.error(err);
  }
);}*/
module.exports= getCoordinatesFromAddress;