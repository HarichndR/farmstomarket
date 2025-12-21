function isAvailable(bookedTime, new_start_time,new_end_time){
for(const time_slot of bookedTime){
let booked_start_time = time_slot.start_time;
let booked_end_time =time_slot.start_time;
if(new_start_time<booked_end_time && new_end_time>booked_start_time){
    return false;
}
}
return true;
}


module.exports= isAvailable;