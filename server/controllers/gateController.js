const Gate = require('./../models/gateModel');
const catchAsync = require('./../utils/catchAsync');

exports.addTerminal = catchAsync(async (req, res, next) => {
    const terminal = req.body.terminal;
    const gates = [];
    for (let i = 1; i < 33; i++) {
        const name = terminal + i;
        console.log(name);
        gates.push(await Gate.create({ name }));
    }

    res.status(201).json({
        status: 'success',
        data: {
            gates,
        },
    });
});

exports.toggleEnable = catchAsync(async (req, res, next) => {
    const gate = await Gate.findById(req.params.id);
    gate.active = !gate.active;
    const updatedGate = await Gate.findByIdAndUpdate(req.params.id, gate, {
        new: true,
    });

    res.status(201).json({
        status: 'success',
        data: {
            updatedGate,
        },
    });
});

exports.getAllGates = catchAsync(async (req, res, next) => {
    const gates = await Gate.find({});

    res.status(201).json({
        status: 'success',
        data: {
            gates,
        },
    });
});
