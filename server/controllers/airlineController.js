const Airline = require('./../models/airlineModel');
const Employee = require('./../models/employeeModel');
const catchAsync = require('./../utils/catchAsync');

exports.addAirline = catchAsync(async (req, res, next) => {
    const newAirline = await Airline.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            airline: newAirline,
        },
    });
});

exports.removeAirline = catchAsync(async (req, res, next) => {
    const deletedAirline = await Airline.findByIdAndRemove(req.params.id);
    const deletedEmployees = await Employee.deleteMany({
        airline: deletedAirline.name,
    });

    res.status(200).json({
        status: 'success',
        data: { airline: deletedAirline, employees: deletedEmployees },
    });
});

exports.getAllAirlines = catchAsync(async (req, res, next) => {
    const airlines = await Airline.find();

    res.status(200).json({
        status: 'success',
        data: {
            airlines,
        },
    });
});
