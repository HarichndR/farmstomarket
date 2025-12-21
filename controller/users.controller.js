const sendNotifiction = require('../notifiction/services/sendNotifiction');

const { Farmer, Consultant, AgriMart, buyer, nursery, User, carriers, farming_Equipments } = require('../schema/user');
const getCoordinatesFromAddress = require('../services/getCord');
const emailvalidation = require('../services/validateEmail');
const { OTPsend, OTPverified } = require('../services/Mobile_otp_verifiction');
const generateOTP = require('../services/genreteOTP');
const hashedPassword = require('../services/hashedpasword');

const RegisterUser = async (req, res) => {

    const { first_name, last_name, email, User_Role, address, password, GSTIN, nursery_name, shop_name, consultant_qualify, farm_size } = req.body;
    if (!User_Role) return res.status(400).json({ msg: 'User role is required' });


    if (!emailvalidation(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
    }

    let coordinates;
    try {
        console.time('beforcordinate');
        coordinates = await getCoordinatesFromAddress(address);
        if (!coordinates) return res.status(400).json({ msg: 'Could not get coordinates from address' });
    } catch (error) {
        return res.status(500).json({ msg: 'Error fetching coordinates', error });
    }
     console.timeEnd('beforcordinate');
    const location = {
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude],
        address,
    }
    try {
        const commonFields = {
            first_name,
            last_name,
            email,
            address,
            password,
            location,
            termsAccepted: false,
        };

        const userRolesMap = {
            farmer: { model: Farmer, extraFields: { farm_size } },
            buyer: { model: buyer, extraFields: { shop_name, GSTIN, } },
            nursery: { model: nursery, extraFields: { nursery_name, GSTIN, } },
            agrimart: { model: AgriMart, extraFields: { GSTIN, } },
            consultant: { model: Consultant, extraFields: { consultant_qualify, GSTIN, } },
            carriers: {
                model: carriers, extraFields: {

                }
            },

            farming_Equipments: {
                model: farming_Equipments, extraFields: {

                }
            }
        };

        const role = userRolesMap[User_Role];
        if (!role) return res.status(400).json({ msg: 'Invalid user role' });


        const newUser = await role.model.create({ ...commonFields, ...role.extraFields });
        console.log(newUser, 'this console');

         res.status(201).json({ msg: 'User created successfully', user: newUser });
        res.on('finish' ,()=>{
           sendMessage 
        })
      
    } catch (err) {
        if (err.code == 11000) return res.status(409).json({ msg: 'email address already exist pleas enter other email' })
        console.error(err);
        return res.status(500).json({ msg: `Error creating user for role: ${User_Role}`, error: err.message });
    }
};


const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.match_pass_and_gen_token(email, password);

        if (!token) {
            return res.status(401).json({ msg: 'token not get Authentication failed' });
        }
        // Set token in HTTP cookie
        res.cookie('token', token, { httpOnly: true, secure: false, path: '/', maxAge: 168 * 60 * 60 * 1000 ,sameSite: 'Lax'}); // Set expiration to 1 day
        return res.status(201).json({ msg: "Cookie set with token" });
    } catch (err) {
        console.error(err.messages);
        return res.status(400).json({ msg: 'Login error: ' + err.message }); // Return the specific error message
    }
};



const userlogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ msg: "user deleted" });
    } catch (err) { return res.status(500).json({ msg: err.message }) }
}



const sendOTP = async (req, res) => {
    const { email } = req.query;
    let { Mobile_NO } = req.body;

    Mobile_NO = '+91' + Mobile_NO;

    const otp = generateOTP();
    const messages = await OTPsend(email, Mobile_NO, otp);
    res.status(201).json({ msg: 'otp send ', messages });


}

const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    const { email } = req.query;
    const { isOTPverified, Mobile_NO, token } = await OTPverified(email, otp);
    if (!token) return res.status(401).json({ msg: 'token not found' });
    if (!isOTPverified) return res.status(401).json({ msg: "pleas enter valid OTP" });
    const msg = await User.findOneAndUpdate({ email }, {
        Mobile_NO: Mobile_NO,
        Mobile_NO_verified_stutus: 'verified',

    });
    res.cookie(token, token);
    res.status(201).json({ msg: "mobile number verified" });
};


const updateUserInformationById = async (req, res) => {
    try {
        const id = req.user.id;
        const { updates } = req.body;
        console.log(updates);
        if (!id) return res.status(400).json({ msg: 'id not provided' });
        if (!updates) return res.status(400).json({ msg: 'update data not provided' });
        if (updates.email) return res.status(400).json({ msg: 'email not upadtedble' });
        //if(updates.Mobile_NO) return res.status(400).json({msg:'Mobile number can`t verify from her'});
        console.log(updates);
        const userUpdatesStatus = await User.updateOne({ _id: id }, { $set: updates }, { new: true });
        if (userUpdatesStatus.matchedCount == 0) return res.status(404).json({ msg: 'user id not match any data' });
        return res.status(200).json({ msg: 'user upadte sucessfuly' });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        if (!id) return res.status(400).json({ msg: 'id not provided' });
        const user = await User.findById(id, '-password -salt');
        if (!user) return res.status(404).json({ msg: 'user not found' });
        res.status(200).json(user);
    }
    catch (err) { return res.status(500).json({ msg: err.message }) }
}









//forget password
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ msg: "email not provided " });
        const user = await User.findOne({ email }).select('Mobile_NO');
        if (!user.Mobile_NO) return res.status(404).json({ msg: 'no moblie found respect to email' });

        //email,Mobile_NO, otp
        const otp = generateOTP()
        if (!otp) return res.status(400).json({ msg: "otp not found" })
        const msg = await OTPsend(email, user.Mobile_NO, otp);
        return res.status(200).json({ msg: msg })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}










//reset otp
const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;
        const { email } = req.query;
        if (!email) return res.status(400).json({ msg: 'email is requred' });
        if (!otp) return res.json({ msg: 'otp is required' });
        if (!newPassword) return res.status(400).json({ msg: 'new password is requred ' });
        const user = await User.findOne({ email: email }).select('Mobile_NO');
        console.log(user.Mobile_NO);
        const { isOTPverified } = await OTPverified(email, otp);
        if (!isOTPverified) return res.status(401).json({ msg: 'invalid otp' });
        const newhashedpass = hashedPassword(newPassword);
        const passresetStutus = await User.updateOne({ email: email }, { $set: { password: newhashedpass } },
            { new: true });
        if (passresetStutus.modifiedCount == 0) return res.status(404).json({ msg: 'password can`be update' });
        return res.status(200).json({ msg: 'user updated' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

}


module.exports = { RegisterUser, userlogin, userlogout, sendOTP, verifyOTP, getUserProfile, updateUserInformationById, forgetPassword, resetPassword };
