function checkforBookedTimeOverAndRemove(Model){
    console.log('func');
    const currentTime=Date.now();
    const BookedTime=Model.find({}.select('BookedTime'));
}