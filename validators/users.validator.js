const valid = require('validator');


const { verify } = require("jsonwebtoken");

const registration_input_validation = async (req, res, next) => {

    console.time('valid');
    const { first_name, email, User_Role, address,
        password, confirmPassword } = req.body;

    if (!first_name) return res.status(400).json({ err: "First name is required" });

    if (!password || password.length < 8) return res.status(400).json({ err: "Password must be at least 8 characters" });
    if (!confirmPassword || password !== confirmPassword) return res.status(400).json({ err: "Confirm password does not match" });
    if (!email) return res.status(400).json({ err: "Email is required" });

    if (!address) return res.status(400).json({ err: "Address is required" });
    if (!valid.isEmail(email)) return res.status(400).json({ err: "Invalid email format" });
    if (!User_Role) return res.status(400).json({ msg: 'user is required' });
    console.timeEnd('valid');
    next();

}



const Login_input_validition = (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email) return res.status(401).json({ err: "Email is required" });
        if (!valid.isEmail(email)) return res.status(401).json({ err: "Invalid email format" });
        if (!password || password.length < 8) return res.status(401).json({ err: "Password must be at least 8 characters" });

    } catch (err) {
        res.status(400).json({ msg: 'Login error: ' + err });
    }
    next();
}



module.exports = { registration_input_validation, Login_input_validition }