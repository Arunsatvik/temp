import React from 'react';
import './employeeDetails.css';

const EmployeeDetails = ({ props, clickFn }) => {
    return (
        <div className="emp-details">
            <div className="emp-details-data">{props.name}</div>
            <div className="emp-details-data">{props.airline || '-'}</div>
            <div className="emp-details-data">{props.email}</div>
            <div className="del-icon" onClick={() => clickFn()}>
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
};

export default EmployeeDetails;
