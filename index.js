const express = require('express');
const cookieParser = require('cookie-parser');
const { User } = require('./schema/user');
const cors = require('cors');

require('dotenv').config();

const app = express();
const FarmProductRoute = require('./Route/api/products/farmproduct.route');
const NurseryandAgriMartRoute = require('./Route/api/products/AgriMartANDnursery.route');
const userRoute = require("./Route/api/users/users.routes");
const carriersRoute= require('./Route/api/carriers/carriers.routes');
const bookingRoute= require('./Route/api/booking/booking.routes');
const equipmentRoute= require('./Route/api/equipments/equipments.routes');
const logger= require('./midlewares/logging');
const errorlogger = require('./midlewares/erroerLogger');
const pushNotifictionRoute= require('./notifiction/Route/pushNotifiction.routes');
const checkUserAutho= require('./midlewares/checkUserAutho');
const PORT = process.env.PORT;
app.use(cors( {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST','PATCH'],
  credentials:true,
}))
app.use(cookieParser());
app.use(express.json());

app.use(logger);
//app.use(errorlogger);
app.use(express.urlencoded({ extended: false }));





// Routes
app.use('/User',userRoute);
app.use('/Farm-Product', FarmProductRoute);
app.use('/AgriAndNurseryProduct', NurseryandAgriMartRoute);
app.use('/carriers',carriersRoute);
app.use('/equipment',equipmentRoute);
app.use('/booking', checkUserAutho,bookingRoute);
app.use('/pushNotifiction', pushNotifictionRoute);
app.delete('/', async (req, res) => {
  const response = await User.deleteMany({});
  res.send("im user from FARMSTOMARKET" + response);
});

// Connect to MongoDB
const conectDB = require('./DBconfig/connectDB');
conectDB(process.env.MONGDB_Conection_String);



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});




