import axios from 'axios';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './viewAllFlights.css';

import FlightDetails from './../../components/FlightDetails/FlightDetails';

axios.defaults.withCredentials = true;

const ViewAllFlights = () => {
    const [flights, setFlights] = useState([]);
    const [selectedType, setSelectedType] = useState('Departure');
    const [selectedTime, setSelectedTime] = useState(1);

    const getAllFlights = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });

        const getflights = await API.get('/getAllFlights');
        setFlights(getflights.data.data.flights);
    };

    useEffect(() => {
        getAllFlights();
    }, []);

    return (
        <div className="landing-page-bg flights-cont">
            <div className="filters">
                <select
                    className="custom-select"
                    name="type"
                    id="type"
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                    }}
                >
                    <option value="Departure">Departure</option>
                    <option value="Arrival">Arrival</option>
                </select>
                <select
                    className="custom-select"
                    name="time"
                    id="time"
                    onChange={(e) => {
                        setSelectedTime(parseInt(e.target.value[5]));
                        console.log(selectedTime);
                    }}
                >
                    <option value="Next 1 hour">Next 1 hour</option>
                    <option value="Next 2 hours">Next 2 hours</option>
                    <option value="Next 4 hours">Next 4 hours</option>
                </select>
            </div>
            <div className="flight-details-cont">
                {flights.map((flight) => {
                    return flight.flightType == selectedType &&
                        moment(flight.time.slice(0, -1)).diff(
                            moment(),
                            'hours',
                            true
                        ) >= 0 &&
                        moment(flight.time.slice(0, -1)).diff(
                            moment(),
                            'hours',
                            true
                        ) <= selectedTime ? (
                        <FlightDetails
                            key={flight._id}
                            props={flight}
                        ></FlightDetails>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default ViewAllFlights;
