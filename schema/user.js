const  mongoose  = require("mongoose");
const { randomBytes, createHmac } = require('crypto');
const hashedPassword = require('../services/hashedpasword');
const { createJWTtoken } = require("../services/JWTtoken");
const farmerSchema= require('./user/farmerSchema');
const buyerSchema= require('./user/BuyerSchema');
const consultantSchema= require('./user/consultantSchema');
const AgriMartSchema= require('./user/AgriMartSchema');
const nurserySchema= require('./user/nurserySchema');
const permisionsSchema= require('./permissionsSchema');
const carrierOwnerSchema= require('./user/carriersOwnerSchema');
const equipmentOwnerSchema= require('./user/equipmentOwnerSchema');


const baseOption = {
    discriminatorKey: 'User_Role',
    collection: 'users',
}
const userShcema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,

        },
        // address:
        // {
        //     type: String,
            
        // },
        email: {
            type: String,
            srequired: true,
            unique: true,


        },
        emailVerifictionStutus: {
            type: String,
            enum: ["verified", "Notverified"],
            default: "Notverified"
        },
        Mobile_NO: {
            type: String,

        },
        Mobile_NO_verified_stutus: {
            type: String,
            enum: ["verified", "unverified"],
            default: "verified"
        },
        ProfilImg: {
            type: String,
            default:'url'
        },
        User_Role:
        {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        settings:{

        language:{type:String, enum:['English', 'Hindi', 'Marathi'],default:'English' },

        theams:{type:String, enum:['Dark', 'Light'], default:'Light'}
        },

        permisions:{ 
            type:[permisionsSchema],
            
        },
        termsAccepted:{type:Boolean, default:[false]}
        ,
        FCMtoken:{type:[{
            device:{type:String},
            token:{type:String}
        }],
       unique:true,  
    },
    },{ timestamps: true }, baseOption
);
// Role some Extra fildes





userShcema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const{salt ,hashedpassword}=  hashedPassword(this.password);
    this.salt = salt;
    this.password = hashedpassword;
    next();
});


userShcema.static("match_pass_and_gen_token", async function (email, password) {
    const user = await this.findOne({ email });
    
    if (!user) throw new Error('User not found, please enter a valid email.');

    // Generate the hash of the input password with the stored salt
    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');
     
    if (hashedPassword !== user.password) throw new Error('Password does not match.');

    if (user.Mobile_NO_verified_stutus === 'unverified') {
        throw new Error('Mobile number not verified. Please verify.');
    }

    // Generate JWT token if user is authenticated
    const token = createJWTtoken(user);
    if (!token) throw new Error("Token creation failed.");

    console.log('JWT token generated: ', token);
    return token;
});


const User =  mongoose.model('user', userShcema);

const Farmer= User.discriminator('Farmer', farmerSchema);
const Consultant= User.discriminator('Consultant',consultantSchema);
const  AgriMart =  User.discriminator('AgriMart', AgriMartSchema);
const buyer= User.discriminator('buyer', buyerSchema);
const nursery = User.discriminator('Nursery', nurserySchema);
const carriers= User.discriminator("Carriers",carrierOwnerSchema);
const farming_Equipments=User.discriminator('Farming_equipments',equipmentOwnerSchema);


module.exports = {Farmer, Consultant, AgriMart, buyer, nursery,User, carriers, farming_Equipments};