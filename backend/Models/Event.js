const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        Eventimage: {
            type: String,
            required: true,
            trim: true,
        },
        Title: {
            type: String,
            required: true,
            trim: true,
        },
        Description: {
            type: String,
            required: true,
            trim: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);