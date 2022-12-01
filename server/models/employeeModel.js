const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Airline = require('./airlineModel');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide employee email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    airline: {
        type: String,
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
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ['airportEmployee', 'admin', 'airlineEmployee'],
        default: 'airportEmployee',
    },
});

employeeSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

employeeSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
