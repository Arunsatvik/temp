import React, { useState } from 'react';
import EmployeeDetails from '../../components/EmployeeDetails/EmployeeDetails';
import AirlineDetails from '../../components/AirlineDetails/AirlineDetails';
import Button from './../../components/Button/Button';
import Gates from './../../components/Gates/Gates';
import './adminPanel.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const AdminPanel = () => {
    const [active, setActive] = useState('employees');
    const [employeeList, setEmployeeList] = useState([]);
    const [empForm, setEmpForm] = useState(false);
    const [empName, setEmpName] = useState('');
    const [empEmail, setEmpEmail] = useState('');
    const [empAirline, setEmpAirline] = useState('');
    const [empPassword, setEmpPassword] = useState('');
    const [empRole, setEmpRole] = useState('airlineEmployee');
    const navigate = useNavigate();

    const [airlineList, setAirlineList] = useState([]);
    const [airlineForm, setAirlineForm] = useState(false);
    const [airlineName, setAirlineName] = useState('');

    const handleClick = (e, val) => {
        setActive(val);
    };

    const getAllEmployees = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/employees',
        });

        const employees = await API.get('/getAllEmployees');
        setEmployeeList(employees.data.data.employees);
        console.log(employeeList);
    };

    const handleLogout = async () => {
        navigate('/')
        toast.success('Logged out successfully!');
    };

    const getAllAirlines = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/airlines',
        });

        const employees = await API.get('/getAllAirlines');
        setAirlineList(employees.data.data.airlines);
    };

    useEffect(() => {
        getAllEmployees();
        getAllAirlines();
    }, []);

    const addNewEmp = () => {
        setEmpForm(true);
    };

    const createNewEmp = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/employees',
        });

        let newEmp;

        if (empAirline) {
            newEmp = await API.post('/addEmployee', {
                name: empName,
                email: empEmail,
                airline: empAirline,
                password: empPassword,
                role: empRole,
            })
                .then(() => {
                    toast.success('Employee added successfully!');
                    getAllEmployees();
                    setEmpForm(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Validation failed');
                });
        } else {
            newEmp = await API.post('/addEmployee', {
                name: empName,
                email: empEmail,
                password: empPassword,
                role: empRole,
            })
                .then(() => {
                    toast.success('Employee added successfully!');
                    getAllEmployees();
                    setEmpForm(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Validation failed');
                });
        }
    };

    const createNewAirline = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/airlines',
        });

        console.log(airlineName);

        const newAirline = await API.post('/addAirline', {
            name: airlineName,
        })
            .then(() => {
                toast.success('Airline added successfully!');
                getAllAirlines();
                setAirlineForm(false);
            })
            .catch((err) => {
                toast.error('Validation failed');
            });
    };

    const deleteEmployee = async (id) => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/employees',
        });

        const deletedEmployee = await API.delete(`/deleteEmployee/${id}`)
            .then(() => {
                toast.success('Deleted successfully!');
                getAllEmployees();
                setAirlineForm(false);
            })
            .catch((err) => {
                toast.error('Some error occured!');
            });
    };

    const deleteAirline = async (id) => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/airlines',
        });

        const deletedAirline = await API.delete(`/removeAirline/${id}`)
            .then(() => {
                toast.success('Deleted successfully!');
                getAllAirlines();
                setAirlineForm(false);
            })
            .catch((err) => {
                toast.error('Some error occured!');
            });
    };

    return (
        <div className="admin-panel-bg">
            <div className="admin-panel-sidebar">
                <div className="admin-panel-heading">ADMIN PANEL</div>
                <div className="admin-panel-sidebar-nav">
                    <div
                        className={
                            active == 'employees'
                                ? 'nav-links active'
                                : 'nav-links'
                        }
                        data-value="employees"
                        onClick={(e) => handleClick(e, 'employees')}
                    >
                        <div className="nav-item">EMPLOYEES</div>
                        <div className="nav-item-line"></div>
                    </div>
                    <div
                        className={
                            active == 'airlines'
                                ? 'nav-links active'
                                : 'nav-links'
                        }
                        data-value="airlines"
                        onClick={(e) => handleClick(e, 'airlines')}
                    >
                        <div className="nav-item">AIRLINES</div>
                        <div className="nav-item-line"></div>
                    </div>
                    <div
                        className={
                            active == 'gates' ? 'nav-links active' : 'nav-links'
                        }
                        data-value="gates"
                        onClick={(e) => handleClick(e, 'gates')}
                    >
                        <div className="nav-item">GATES</div>
                        <div className="nav-item-line"></div>
                    </div>
                    <div className='nav-links'
                        onClick={() => handleLogout()}
                        >
                        <div className="nav-item">LOGOUT</div>
                        <div className="nav-item-line"></div>
                    </div>
                </div>
            </div>
            <div className="admin-panel-main-bar">
                {active === 'employees' ? (
                    <div className="employees-list-cont">
                        <Button
                            text="Add new employee"
                            clickFn={() => addNewEmp()}
                        ></Button>
                        {employeeList.map((employee) => {
                            return (
                                <EmployeeDetails
                                    key={employee._id}
                                    props={employee}
                                    clickFn={() => deleteEmployee(employee._id)}
                                />
                            );
                        })}
                        {empForm ? (
                            <div className="form-bg">
                                <div className="form-div">
                                    <div className="form-div-header">
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={() => {
                                                setEmpForm(false);
                                            }}
                                        ></i>
                                    </div>
                                    <div className="form-div-inp">
                                        <input
                                            type="text"
                                            placeholder="Enter employee name"
                                            onInput={(e) => {
                                                setEmpName(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter employee email"
                                            onInput={(e) => {
                                                setEmpEmail(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter employee airline(if airline employee)"
                                            onInput={(e) => {
                                                setEmpAirline(e.target.value);
                                            }}
                                        />
                                        <select
                                            name="role"
                                            id="role"
                                            onChange={(e) => {
                                                setEmpRole(e.target.value);
                                            }}
                                        >
                                            <option value="airlineEmployee">
                                                airlineEmployee
                                            </option>
                                            <option value="airportEmployee">
                                                airportEmployee
                                            </option>
                                        </select>
                                        <input
                                            type="password"
                                            placeholder="Enter employee password"
                                            onInput={(e) => {
                                                setEmpPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="form-div-btn"
                                        onClick={() => createNewEmp()}
                                    >
                                        Create new employee
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                {active === 'airlines' ? (
                    <div className="employees-list-cont">
                        <Button
                            text="Add new airline"
                            clickFn={() => setAirlineForm(true)}
                        ></Button>
                        {airlineList.map((airline) => {
                            return (
                                <AirlineDetails
                                    key={airline._id}
                                    props={airline}
                                    clickFn={() => deleteAirline(airline._id)}
                                />
                            );
                        })}
                        {airlineForm ? (
                            <div className="form-bg">
                                <div className="form-div">
                                    <div className="form-div-header">
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={() => {
                                                setAirlineForm(false);
                                            }}
                                        ></i>
                                    </div>
                                    <div className="form-div-inp">
                                        <input
                                            type="text"
                                            placeholder="Enter airline name"
                                            onInput={(e) => {
                                                setAirlineName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="form-div-btn"
                                        onClick={() => createNewAirline()}
                                    >
                                        Create new airline
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                {active === 'gates' ? <Gates /> : null}
            </div>
        </div>
    );
};

export default AdminPanel;
