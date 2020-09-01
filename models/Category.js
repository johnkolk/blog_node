const { Schema, model } = require('mongoose');
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

module.exports = model('categories', categorySchema);
