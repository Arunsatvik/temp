import React from 'react';
import moment from 'moment';
import './flightDetails.css';

const FlightDetails = ({ props }) => {
    return (
        <div className="flight-details">
            {props.flightType == 'Departure' ? (
                <React.Fragment>
                    <div className="flight-details-section">
                        <div className="flight-details-section-heading">
                            Airline
                        </div>
                        <div className="flight-details-section-value">
                            {props.airline}
                        </div>
                    </div>
                    <div className="flight-details-section">
                        <div className="flight-details-section-heading">
                            Flight No
                        </div>
                        <div className="flight-details-section-value">
                            {props.flightNumber}
                        </div>
                    </div>
                    <div className="flight-details-section">
                        <div className="flight-details-section-heading">
                            Time
                        </div>
                        <div className="flight-details-section-value">
                            {moment(moment(props.time).utc()).format(
                                'MMM Do, h:mm a'
                            )}
                        </div>
                    </div>
                    <div className="flight-details-section">
                        <div className="flight-details-section-heading">
                            Gate No
                        </div>
                        <div className="flight-details-section-value">
                            {props.allocatedGate}
                        </div>
                    </div>
                    <div className="flight-details-section">
                        <div className="flight-details-section-heading">
                            Destination
                        </div>
                        <div className="flight-details-section-value">
                            {props.destination}
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Airline
                        </div>
                        <div className="flight-details-section-value">
                            {props.airline}
                        </div>
                    </div>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Flight No
                        </div>
                        <div className="flight-details-section-value">
                            {props.flightNumber}
                        </div>
                    </div>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Arriving from
                        </div>
                        <div className="flight-details-section-value">
                            {props.destination}
                        </div>
                    </div>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Time
                        </div>
                        <div className="flight-details-section-value">
                            {moment(moment(props.time).utc()).format(
                                'MMM Do, h:mm a'
                            )}
                        </div>
                    </div>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Gate No
                        </div>
                        <div className="flight-details-section-value">
                            {props.allocatedGate}
                        </div>
                    </div>
                    <div className="flight-details-section flight-details-section2">
                        <div className="flight-details-section-heading">
                            Baggage Carousel
                        </div>
                        <div className="flight-details-section-value">
                            {props.allocatedCarousel || '-'}
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default FlightDetails;
