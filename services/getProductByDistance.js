const getByDistance=async(model, longitude, latitude, 
  options,minDistance=0, maxDistance=200000000, page=1, )=>{
  const longitudeF=parseFloat(longitude);
  const latitudeF = parseFloat(latitude);
  console.log(longitudeF, latitude, );

   const filters={};
    if(options){
      Object.keys(options).forEach((key)=>{
        if(options[key]){
        filters[key]=options[key];
        }
      })
    }

      const pipeline=[
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitudeF, latitudeF],
            },
            distanceField: "distance",   
            spherical: true,
            maxDistance: maxDistance ,  
            minDistance:minDistance,
          }
        }
    ]

    if(Object.keys(filters).length > 0){
      pipeline.push({
        $match:filters
      });
    }
    const data = await model.aggregate(pipeline)
    .then(results => {
      return results;
    })
    .catch(error => {
    console.error("Error finding nearby products:", error);
    });
  return data;
  }

module.exports= getByDistance;