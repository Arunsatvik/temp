import React, { useState } from 'react';
import Flight from '../../components/Flight/Flight';
import Button from './../../components/Button/Button';
import Gates from './../../components/Gates/Gates';
import './employeePanel.css';

import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const EmployeePanel = () => {
    const [active, setActive] = useState('flights');
    const [selectedVal, setSelectedVal] = useState('Departure');
    const [flights, setFlights] = useState([]);

    const [addFlightForm, setAddFlightForm] = useState(false);
    const [carouselForm, setCarouselForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [carouselNumber, setCarouselNumber] = useState('');
    const [openedFlightId, setOpenedFlightId] = useState('');

    const [flightNo, setFlightNo] = useState('');
    const [flightTime, setFlightTime] = useState('');
    const [flightDest, setFlightDest] = useState('');
    const [flightType, setFlightType] = useState('Arrival');
    const navigate = useNavigate();

    const [newFlightNo, setNewFlightNo] = useState('');
    const [newDest, setNewDest] = useState('');
    const [newTime, setNewTime] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    const handleClick = (e, val) => {
        setActive(val);
    };

    const handleLogout = async () => {
        navigate('/')
        toast.success('Logged out successfully!');
    };

    const handleFormClick = () => {
        setAddFlightForm(true);
    };

    const getAllFlights = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });

        let flightsRes = await API.get('/getAllFlights');
        flightsRes = flightsRes.data.data.flights;
        if (user.role == 'airlineEmployee') {
            flightsRes = flightsRes.filter(
                (flight) =>
                    flight.airline ==
                    JSON.parse(localStorage.getItem('user')).airline
            );
        }
        setFlights(flightsRes);
    };

    const addNewFlight = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });
        let newFlight = await API.post('/addFlight', {
            flightNumber: flightNo,
            destination: flightDest,
            time: moment(flightTime).format().slice(0, -6) + '.232Z',
            flightType: flightType,
        })
            .then(() => {
                toast.success('Flight added successfully!');
                setAddFlightForm(false);
                getAllFlights();
            })
            .catch(() => {
                toast.error('Some error occured');
            });
    };

    const deleteFlight = async (id) => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });

        const deletedFlight = await API.delete(`/deleteFlight/${id}`)
            .then(() => {
                toast.success('Deleted successfully!');
                getAllFlights();
            })
            .catch((err) => {
                toast.error('Some error occured!');
            });
    };

    const openEditForm = () => {
        setEditForm(true);
    };

    const updateFlight = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });

        const updatedFlight = await API.patch(
            `/updateFlight/${openedFlightId}`,
            {
                time: moment(newTime).format().slice(0, -6) + '.232Z',
                destination: newDest,
                flightNumber: newFlightNo,
            }
        )
            .then(() => {
                toast.success('Updated successfully!');
                getAllFlights();
                setEditForm(false);
            })
            .catch((err) => {
                toast.error('Some error occured!');
            });
    };

    const assignCarousel = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/carousel',
        });

        const deletedFlight = await API.post(
            `/assignCarousel/${openedFlightId}`,
            { carouselNumber }
        )
            .then(() => {
                toast.success('Assigned successfully!');
                getAllFlights();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Carousel is not free for this slot!');
            });
    };

    useEffect(() => {
        getAllFlights();
    }, []);

    return (
        <div className="admin-panel-bg">
            <div className="admin-panel-sidebar">
                <div className="admin-panel-heading">EMPLOYEE PANEL</div>
                <div className="admin-panel-sidebar-nav">
                    <div
                        className={
                            active == 'flights'
                                ? 'nav-links active'
                                : 'nav-links'
                        }
                        data-value="flights"
                        onClick={(e) => handleClick(e, 'flights')}
                    >
                        <div className="nav-item">FLIGHTS</div>
                        <div className="nav-item-line"></div>
                    </div>

                    
                    {user.role == 'airportEmployee' ? (
                        <div
                            className={
                                active == 'gates'
                                    ? 'nav-links active'
                                    : 'nav-links'
                            }
                            data-value="gates"
                            onClick={(e) => handleClick(e, 'gates')}
                        >
                            <div className="nav-item">GATES</div>
                            <div className="nav-item-line"></div>
                        </div>
                    ) : null}

<div
                        className={'nav-links'}
                        onClick={() => handleLogout()}
                    >
                        <div className="nav-item">LOGOUT</div>
                        <div className="nav-item-line"></div>
                    </div>
                </div>
            </div>
            <div className="admin-panel-main-bar">
                {active == 'flights' ? (
                    <div>
                        <div className="main-bar-heading">
                            {JSON.parse(localStorage.getItem('user')).airline ||
                                'All'}{' '}
                            Flights
                        </div>
                        <div className="employees-list-cont">
                            <div className="flights-cont-heading">
                                {user.role == 'airlineEmployee' ? (
                                    <Button
                                        text="Add new flight"
                                        clickFn={handleFormClick}
                                    ></Button>
                                ) : null}
                                <select
                                    className="custom-select"
                                    name="type"
                                    id="type"
                                    onChange={(e) => {
                                        setSelectedVal(e.target.value);
                                    }}
                                >
                                    <option value="Departure">Departure</option>
                                    <option value="Arrival">Arrival</option>
                                </select>
                            </div>
                            {selectedVal == 'Departure' ? (
                                <div className="flights-header flight">
                                    <div
                                        className="flight-data-depart"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Flight No
                                    </div>
                                    <div
                                        className="flight-data-depart"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Time
                                    </div>
                                    <div
                                        className="flight-data-depart"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Destination
                                    </div>
                                    <div
                                        className="flight-data-depart"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Gate No
                                    </div>
                                </div>
                            ) : (
                                <div className="flights-header flight">
                                    <div
                                        className="flight-data-arrival"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Flight No
                                    </div>
                                    <div
                                        className="flight-data-arrival"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Time
                                    </div>
                                    <div
                                        className="flight-data-arrival"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Destination
                                    </div>
                                    <div
                                        className="flight-data-arrival"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Gate No
                                    </div>
                                    <div
                                        className="flight-data-arrival"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Carousel No
                                    </div>
                                </div>
                            )}
                            <div className="flight-det-cont">
                                {flights.map((flight) => {
                                    return flight.flightType == selectedVal ? (
                                        <Flight
                                            key={flight._id}
                                            props={flight}
                                            clickFn={() =>
                                                deleteFlight(flight._id)
                                            }
                                            assign={() => {
                                                setCarouselForm(true);
                                                setOpenedFlightId(flight._id);
                                            }}
                                            user={user}
                                            editFn={() => {
                                                setOpenedFlightId(flight._id);
                                                openEditForm();
                                                setNewFlightNo(
                                                    flight.flightNumber
                                                );
                                                setNewTime(
                                                    moment(
                                                        moment(
                                                            flight.time
                                                        ).utc()
                                                    ).format('yyyy-MM-DDThh:mm')
                                                );
                                                console.log(newTime);
                                                setNewDest(flight.destination);
                                            }}
                                        />
                                    ) : null;
                                })}
                            </div>
                        </div>
                        {addFlightForm ? (
                            <div className="form-bg">
                                <div className="form-div">
                                    <div className="form-div-header">
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={() => {
                                                setAddFlightForm(false);
                                            }}
                                        ></i>
                                    </div>
                                    <div className="form-div-inp">
                                        <input
                                            type="text"
                                            placeholder="Enter flight number"
                                            onChange={(e) => {
                                                setFlightNo(e.target.value);
                                            }}
                                        />
                                        <select
                                            name="type"
                                            id="type"
                                            onChange={(e) => {
                                                setFlightType(e.target.value);
                                            }}
                                        >
                                            <option value="Arrival">
                                                Arrival
                                            </option>
                                            <option value="Departure">
                                                Departure
                                            </option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Enter flight destination/arriving from"
                                            onChange={(e) => {
                                                setFlightDest(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="datetime-local"
                                            id="time"
                                            name="time"
                                            onChange={(e) => {
                                                setFlightTime(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="form-div-btn"
                                        onClick={() => addNewFlight()}
                                    >
                                        Add new flight
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {carouselForm ? (
                            <div className="form-bg">
                                <div className="form-div">
                                    <div className="form-div-header">
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={() => {
                                                setCarouselForm(false);
                                            }}
                                        ></i>
                                    </div>
                                    <div className="form-div-inp">
                                        <input
                                            type="text"
                                            placeholder="Enter carousel number"
                                            onChange={(e) => {
                                                setCarouselNumber(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="form-div-btn"
                                        onClick={() => assignCarousel()}
                                    >
                                        Assign carousel
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {editForm ? (
                            <div className="form-bg">
                                <div className="form-div">
                                    <div className="form-div-header">
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={() => {
                                                setEditForm(false);
                                            }}
                                        ></i>
                                    </div>
                                    <div className="form-div-inp">
                                        <input
                                            type="text"
                                            placeholder="Enter flight number"
                                            defaultValue={newFlightNo}
                                            onChange={(e) => {
                                                setNewFlightNo(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter flight destination/arriving from"
                                            defaultValue={newDest}
                                            onChange={(e) => {
                                                setNewDest(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="datetime-local"
                                            id="time"
                                            name="time"
                                            defaultValue={newTime}
                                            onChange={(e) => {
                                                setNewTime(e.target.value);
                                                console.log(newTime);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="form-div-btn"
                                        onClick={() => updateFlight()}
                                    >
                                        Update flight
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                {active == 'gates' && user.role == 'airportEmployee' ? (
                    <Gates />
                ) : null}
            </div>
        </div>
    );
};

export default EmployeePanel;
