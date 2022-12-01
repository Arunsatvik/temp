const Flight = require('./../models/flightModel');
const Gate = require('./../models/gateModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const randomGateAllocation = async (time) => {
    time = new Date(time);
    const gates = await Gate.find({ active: true });

    for (let i = 0; i < gates.length; i++) {
        const gate = gates[i];
        let flag = true;
        for (let j = 0; j < gate.bookedSlots.length; j++) {
            let temp1 = gate.bookedSlots[j];
            temp1 = new Date(temp1);
            let temp2 = new Date(temp1.valueOf());
            temp2 = temp2.setHours(temp2.getHours() + 1);
            temp2 = new Date(temp2);
            let time2 = new Date(time.valueOf());
            time2 = time2.setHours(time2.getHours() + 1);
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
        if (flag == true) {
            return gate.name;
        }
    }
    return next(new AppError('No gates are free in this slot!', 404));
};

exports.addFlight = catchAsync(async (req, res, next) => {
    let gate;
    if (req.body.flightType == 'Arrival')
        gate = await randomGateAllocation(req.body.time);
    else {
        let t2 = new Date(req.body.time.valueOf());
        t2 = t2.setHours(t2.getHours() - 1);
        gate = await randomGateAllocation(t2);
    }
    const flight = await Flight.create({
        flightNumber: req.body.flightNumber,
        airline: req.user.airline,
        flightType: req.body.flightType,
        destination: req.body.destination,
        time: req.body.time,
        allocatedGate: gate,
    });
    let updatedGate;
    if (req.body.flightType == 'Arrival') {
        let findGate = await Gate.find({ name: gate });
        findGate[0].bookedSlots.push(req.body.time);
        findGate = findGate[0];
        updatedGate = await Gate.findByIdAndUpdate(findGate._id, findGate, {
            new: true,
        });
    } else {
        let t2 = new Date(req.body.time.valueOf());
        t2 = t2.setHours(t2.getHours() - 1);
        let findGate = await Gate.find({ name: gate });
        findGate[0].bookedSlots.push(t2);
        findGate = findGate[0];
        updatedGate = await Gate.findByIdAndUpdate(findGate._id, findGate, {
            new: true,
        });
    }

    res.status(201).json({
        status: 'success',
        data: {
            flight,
            updatedGate,
        },
    });
});

exports.deleteFlight = catchAsync(async (req, res, next) => {
    const flight = await Flight.findById(req.params.id);
    let deletedFlight;
    if (flight.airline === req.user.airline) {
        let slot;
        if (flight.flightType == 'Arrival')
            slot = new Date(flight.time.valueOf());
        else {
            let t2 = new Date(flight.time.valueOf());
            t2 = t2.setHours(t2.getHours() - 1);
            slot = t2.valueOf();
        }
        let gate = await Gate.find({ name: flight.allocatedGate });
        gate = gate[0];
        let temp = [];
        for (let i = 0; i < gate.bookedSlots.length; i++) {
            if (
                new Date(gate.bookedSlots[i]).toString() !=
                new Date(slot).toString()
            )
                temp.push(gate.bookedSlots[i]);
        }
        gate.bookedSlots = temp;
        let updatedGate = await Gate.findByIdAndUpdate(gate._id, gate);
        deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    } else {
        return next(
            new AppError(
                'You do not have permission to remove this flight',
                400
            )
        );
    }

    res.status(201).json({
        status: 'success',
        data: {
            deletedFlight,
        },
    });
});

exports.getAllFlights = catchAsync(async (req, res, next) => {
    const flights = await Flight.find({});

    res.status(201).json({
        status: 'success',
        data: {
            flights,
        },
    });
});

exports.getOneFlight = catchAsync(async (req, res, next) => {
    const flight = await Flight.find({ flightNumber: req.params.id });

    res.status(201).json({
        status: 'success',
        data: {
            flight,
        },
    });
});

exports.updateFlight = catchAsync(async (req, res, next) => {
    let updatedFlight;
    const flight = await Flight.findById(req.params.id);
    if (req.user.airline !== flight.airline) {
        return next(
            new AppError('You do not have permission to do this!', 404)
        );
    }
    if (req.body.time) {
        let gate;
        if (flight.flightType == 'Arrival') {
            gate = await randomGateAllocation(req.body.time);
        } else {
            let t2 = new Date(req.body.time.valueOf());
            t2 = t2.setHours(t2.getHours() - 1);
            gate = await randomGateAllocation(t2);
        }
        //
        let updatedGate;
        if (flight.flightType == 'Arrival') {
            let findGate = await Gate.find({ name: gate });
            findGate = findGate[0];
            let temp = [];
            for (let i = 0; i < findGate.bookedSlots.length; i++) {
                if (
                    new Date(findGate.bookedSlots[i]).toString() !=
                    new Date(flight.time).toString()
                )
                    temp.push(findGate.bookedSlots[i]);
            }
            temp.push(req.body.time);
            findGate.bookedSlots = temp;
            updatedGate = await Gate.findByIdAndUpdate(findGate._id, findGate, {
                new: true,
            });
        } else {
            let t2 = new Date(req.body.time.valueOf());
            t2 = t2.setHours(t2.getHours() - 1);
            let t3 = new Date(flight.time.valueOf());
            t3 = t3.setHours(t3.getHours() - 1);
            let findGate = await Gate.find({ name: gate });
            findGate = findGate[0];
            let temp = [];
            for (let i = 0; i < findGate.bookedSlots.length; i++) {
                if (
                    new Date(findGate.bookedSlots[i]).toString() !=
                    new Date(t3).toString()
                )
                    temp.push(findGate.bookedSlots[i]);
            }
            temp.push(t2);
            findGate.bookedSlots = temp;
            updatedGate = await Gate.findByIdAndUpdate(findGate._id, findGate, {
                new: true,
            });
        }
        //

        updatedFlight = await Flight.findByIdAndUpdate(
            req.params.id,
            { ...req.body, allocatedGate: gate, allocatedCarousel: '' },
            {
                new: true,
                runValidators: true,
            }
        );
    } else {
        updatedFlight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    res.status(201).json({
        status: 'success',
        data: {
            updatedFlight,
        },
    });
});
