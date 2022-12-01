const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Gate name is required!'],
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    bookedSlots: [
        {
            type: Date,
        },
    ],
});

const Gate = mongoose.model('Gate', gateSchema);

module.exports = Gate;
