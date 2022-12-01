const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const airlineRouter = require('./routes/airlineRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const flightRoutes = require('./routes/flightRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const gateRoutes = require('./routes/gateRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

app.use('/api/v1/airlines', airlineRouter);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/flight', flightRoutes);
app.use('/api/v1/carousel', carouselRoutes);
app.use('/api/v1/gate', gateRoutes);

module.exports = app;
