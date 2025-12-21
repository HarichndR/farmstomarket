async function getDataByFilters(model, filters){
try{
if(!filters || Object.keys(filters).length == 0){
    return await model.find();
    
}
const query={};
Object.keys(filters).forEach((key)=>{
    if(filters[key]){
        query[key]=filters[key];
    }
})

return model.find(query);
}
catch(err){
    throw new Error(err.message);
}
}


module.exports=getDataByFilters;