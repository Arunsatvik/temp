import React from 'react';
import './airlineDetails.css';

const AirlineDetails = ({ props, clickFn }) => {
    return (
        <div className="emp-details airline-details">
            <div className="emp-details-data airlines-data">{props.name}</div>
            <div className="del-icon" onClick={() => clickFn()}>
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
};

export default AirlineDetails;
