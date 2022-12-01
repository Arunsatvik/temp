import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './landingPage.css';
import FlightDetails from './../../components/FlightDetails/FlightDetails';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
    const [form, setForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/employees',
        });

        const user = await API.post('/login', { email, password })
            .then((e) => {
                toast.success('Logged in successfully!');
                localStorage.setItem('user', JSON.stringify(e.data.data.user));
                if (e.data.data.user.role == 'admin') navigate('/adminPanel');
                else navigate('/employeePanel');
            })
            .catch((err) => {
                toast.error('Incorrect email or password!');
            });
    };

    const handleSearch = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/flight',
        });

        const getflight = await API.get(`/getFlight/${search.toUpperCase()}`);
        setSearchResult(getflight.data.data.flight[0]);
    };

    return (
        <div className="landing-page-bg">
            <div className="navbar">
                <Link to="/allFlights" target="_blank">
                    <div className="btn1">View all flights</div>
                </Link>
                <div
                    className="btn1"
                    onClick={() => {
                        setForm(true);
                    }}
                >
                    Employee Login
                    <i className="fa-solid fa-arrow-right-long"></i>
                </div>
            </div>
            <div className="landing-page-heading">
                <p className="normal-text">Welcome to</p>
                <p className="normal-text">
                    <span className="highlighted-text">San Fransisco</span> Airport
                </p>
            </div>
            <div className="searchbar-div">
                <input
                    type="text"
                    className="searchbar"
                    placeholder="Enter your flight number to get details"
                    onInput={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <div className="search-btn" onClick={() => handleSearch()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className="search-results">
                {searchResult ? (
                    <FlightDetails props={searchResult}></FlightDetails>
                ) : null}
            </div>
            {form ? (
                <div className="form-bg">
                    <div className="form-div">
                        <div className="form-div-header">
                            <i
                                className="fa-solid fa-xmark"
                                onClick={() => {
                                    setForm(false);
                                }}
                            ></i>
                        </div>
                        <div className="form-div-inp">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                onInput={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                onInput={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className="form-div-btn"
                            onClick={() => handleLogin()}
                        >
                            LOGIN
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default LandingPage;
