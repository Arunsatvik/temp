const mongoose = require('mongoose');
const Airline = require('./airlineModel');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, 'Flight Number is required!'],
        unique: true,
    },
    airline: {
        type: String,
        required: [true, 'Airline is required!'],
        validate: {
            validator: async function (el) {
                const airlines = await Airline.find({});
                const result = airlines.filter((a) => a.name == el);
                if (result.length > 0) return true;
                else return false;
            },
            message:
                'This airline does not exist in our database! Please add this airline first.',
        },
    },
    flightType: {
        type: String,
        enum: ['Arrival', 'Departure'],
        required: [true, 'Arrival/Departure ?'],
    },
    destination: {
        type: String,
        required: [true, 'Destination is required'],
    },
    time: {
        type: Date,
        required: [true, 'Flight time is required'],
    },
    allocatedGate: {
        type: String,
    },
    allocatedCarousel: {
        type: String,
    },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
