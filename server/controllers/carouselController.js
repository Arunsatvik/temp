const Carousel = require('./../models/carouselModel');
const Flight = require('./../models/flightModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addCarousel = catchAsync(async (req, res, next) => {
    const carousel = await Carousel.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            carousel,
        },
    });
});

exports.assignCarousel = catchAsync(async (req, res, next) => {
    const flight = await Flight.findById(req.params.id);

    if (flight.flightType == 'Departure') {
        return next(
            new AppError(
                'Baggage carousel cannot be assigned to departing flight',
                400
            )
        );
    }
    const carouselNumber = req.body.carouselNumber;
    const time = new Date(flight.time);
    const carousel = await Carousel.find({ name: carouselNumber });
    let flag = true;
    for (let i = 0; i < carousel[0].bookedSlots.length; i++) {
        let temp1 = carousel[0].bookedSlots[i];
        temp1 = new Date(temp1);
        let temp2 = new Date(temp1.valueOf());
        temp2 = temp2.setHours(carousel[0].bookedSlots[i].getHours() + 1);
        temp2 = new Date(temp2);
        let time2 = new Date(time.valueOf());
        time2 = time2.setHours(time.getHours() + 1);
        time2 = new Date(time2);
        if (
            temp1.getTime() >= time.getTime() &&
            temp1.getTime() <= time2.getTime()
        ) {
            flag = false;
            break;
        }
        if (
            temp2.getTime() >= time.getTime() &&
            temp2.getTime() <= time2.getTime()
        ) {
            flag = false;
            break;
        }
    }
    if (flag == false) {
        return next(new AppError('This carousel is booked for this slot', 400));
    } else {
        carousel[0].bookedSlots.push(time);
        const updatedCarousel = await Carousel.findByIdAndUpdate(
            carousel[0]._id,
            carousel[0],
            { new: true }
        );
        flight.allocatedCarousel = carousel[0].name;
        const updatedFlight = await Flight.findByIdAndUpdate(
            flight._id,
            flight,
            { new: true }
        );

        res.status(201).json({
            status: 'success',
            data: {
                updatedCarousel,
                updatedFlight,
            },
        });
    }
});
