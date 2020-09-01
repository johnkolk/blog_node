const errorHandler = require('../utils/errorHandler');
const Category = require('../models/Category');

module.exports.getAll = async function (req, res) {
    try {
        res.status(200).json({ login: 'from controller' });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = function (req, res) {
    res.status(200).json({ login: 'from controller' });
};

module.exports.remove = function (req, res) {
    res.status(200).json({ login: 'from controller' });
};

module.exports.create = function (req, res) {
    res.status(200).json({ login: 'from controller' });
};

module.exports.update = function (req, res) {
    res.status(200).json({ login: 'from controller' });
};
