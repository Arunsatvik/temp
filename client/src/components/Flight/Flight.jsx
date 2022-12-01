import React from 'react';
import moment from 'moment';
import './flight.css';

const Flight = ({ props, clickFn, assign, user, editFn }) => {
    return props.flightType === 'Departure' ? (
        <div className="flight">
            <div className="flight-data-depart">{props.flightNumber}</div>
            <div className="flight-data-depart">
                {moment(moment(props.time).utc()).format('MMM Do, h:mm a')}
            </div>
            <div className="flight-data-depart">{props.destination}</div>
            <div className="flight-data-depart">{props.allocatedGate}</div>
            {user.role == 'airlineEmployee' ? (
                <div className="icons-div">
                    <div className="del-icon" onClick={() => clickFn()}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                    <div className="del-icon pen-icon" onClick={() => editFn()}>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                </div>
            ) : null}
        </div>
    ) : (
        <div className="flight">
            <div className="flight-data-arrival">{props.flightNumber}</div>
            <div className="flight-data-depart">
                {moment(moment(props.time).utc()).format('MMM Do, h:mm a')}
            </div>
            <div className="flight-data-depart">{props.destination}</div>
            <div className="flight-data-depart">{props.allocatedGate}</div>
            <div className="flight-data-arrival">
                {props.allocatedCarousel || '-'}
            </div>
            {user.role == 'airlineEmployee' ? (
                <div className="icons-div">
                    <div className="del-icon" onClick={() => clickFn()}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                    <div className="del-icon pen-icon" onClick={() => editFn()}>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                </div>
            ) : null}
            {user.role == 'airportEmployee' ? (
                <div className="assign-carousel" onClick={() => assign()}>
                    Assign Carousel
                </div>
            ) : null}
        </div>
    );
};

export default Flight;
