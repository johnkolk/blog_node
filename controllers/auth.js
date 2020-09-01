const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        const passwordResult = bcrypt.compareSync(
            req.body.password,
            candidate.password,
        );
        if (passwordResult) {
            // Generate token
            const token = jwt.sign(
                {
                    email: candidate.email,
                    userId: candidate._id,
                },
                config.JWT_SECRET_KEY,
                { expiresIn: 60 * 60 },
            );
            res.status(200).json({ token: `Bearer ${token}` });
        } else {
            res.status(401).json({
                message: 'Email or password incorrect. Try again.',
            });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        res.status(409).json({ message: 'User is already exists' });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            // error handler
            errorHandler(res, e);
        }
    }
};
