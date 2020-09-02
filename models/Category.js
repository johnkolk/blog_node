const { Schema, model } = require('mongoose');
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: '',
    },
});

module.exports = model('categories', categorySchema);
