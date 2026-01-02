const validate_addCarrier = (req, res, next) => {
    const user = req.user;
    const { ownerID } = req.query;
    console.log(req.user);
    const cord = req.user.coordinates;

    const { IMG_URLs, name, category, vehicleNumber, } = req.body;
    console.log(req.body);
    if (!cord) return res.status(400).json({ msg: 'can`t get coordinates' });

    if (!ownerID) return res.status(400).json({ msg: 'ownerID not pr ovide' });
    if (!IMG_URLs) return res.status(400).json({ msg: 'IMG_URLs not provide' });
    if (!vehicleNumber) return res.status(400).json({ msg: 'vehicleNumber not provided' });
    if (!name || !category) return res.status(400).json({ msg: 'some filds are miss' })
    next()
}



module.exports = { validate_addCarrier }
