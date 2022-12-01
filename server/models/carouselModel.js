const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Baggage Carousel name is required!'],
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

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
