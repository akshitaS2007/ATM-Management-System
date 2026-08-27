const { findUserByCardNumber } = require("../services/userService");

function login(req, res)
{
    const {cardNumber, pin}=req.body;

    if(!cardNumber || !pin)
    {
        return res.status(400).json({success: false, message: 'Both Card Number and Pin required'});
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        return res.status(400).json({ success: false, message: 'Card number must be exactly 16 digits.' });
    }

    if (!/^\d{4}$/.test(pin)) {
        return res.status(400).json({ success: false, message: 'PIN must be exactly 4 digits.' });
    }

    const user = findUserByCardNumber(cardNumber);
    if (!user || user.pin !== pin) {
        return res.status(401).json({ success: false, message: 'Invalid Card Number or PIN' });
    }

    res.json({ success: true, customerName: user.customer_name, userId: user.user_id });
}

module.exports = { login };