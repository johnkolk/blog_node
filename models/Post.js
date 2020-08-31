const { Schema, model } = require('mongoose');
const schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('Post', schema);
