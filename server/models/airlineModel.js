const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Airline name is required!'],
        unique: true,
    },
});

const Airline = mongoose.model('Airline', airlineSchema);

module.exports = Airline;
